export interface GitHubResponse {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubRepoResponse[];
}

export interface GitHubRepoResponse {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
	language: string;
	topics: string[];
}

let githubAPI: string = 'https://api.github.com/search/repositories?q=topic:';

/**
 * Performs GitHub API requests that will return a list of both queries' repository results as
 * if they were searched separately.
 *
 * @param queries A list (likely of 2 strings) that represent a user's topic search parameters.
 * @returns A list of GitHubRepoResponse type that combined the two results.
 */
export async function searchOR(queries: string[]): Promise<GitHubRepoResponse[]> {
	const apiResponses: GitHubRepoResponse[] = [];
	let uniqueGitHubResults = new Set<GitHubRepoResponse>();

	if (queries != null && queries.length > 0) {
		for (let page = 1; page <= 5; page++) {
			const apiRequests = queries.map((query) => `${githubAPI}${query}`);

			try {
				const requestResponses = await Promise.all(apiRequests.map((request) => fetch(request)));
				const responseData = await Promise.all(requestResponses.map((response) => response.json()));

				if (requestResponses.length === 0) {
					break;
				}

				responseData.forEach((data: GitHubResponse) => {
					apiResponses.push(...data.items);
				});
				
			} catch (error) {}
		}
	}

	return apiResponses;
}

/**
 * Performs an API request that will return a list of repositories that contain both queries within
 * their topics.
 *
 * @param queries A list (likely of 2 strings) that represent a user's topic search parameters.
 * @returns A list of GitHubRepoResponse that contains results that contain both queries together.
 */
export async function searchAND(queries: string[]): Promise<GitHubRepoResponse[]> {
	const apiResponses: GitHubRepoResponse[] = [];
	let uniqueGitHubResults = new Set<GitHubRepoResponse>();

	if (queries != null && queries.length > 0) {
		// I need to figure out how to add a + into the string, but otherwise this works!

		for (let page = 1; page <= 5; page++) {
			const fullAPIRequest = `${githubAPI}${queries[0].toString()}+${'+'}topic:${queries[1].toString()}+${'&page='}+${page}`;

			try {
				// I need to account for empty responses in some graceful way.
				const requestResponse = await fetch(fullAPIRequest).then((response) => {
					return response.json() as Promise<GitHubResponse>;
				});

				if (requestResponse.items.length === 0) {
					break;
				}

				requestResponse.items.forEach((item) => {
					uniqueGitHubResults.add(item);
				});

				apiResponses.push(...Array.from(uniqueGitHubResults));
			} catch (error) {}
		}
	}

	return apiResponses;
}

/**
 * Performs an API request that will return a list of repositories that contain the first query's
 * results that have been filtered by the latter query.
 *
 * @param firstQuery The first string that represents a user's desired query.
 * @param secondQuery The second string that represents the filter query.
 * @returns A list of GitHubRepoResponse that contains results for the first query that have filtered out
 * the latter query results.
 */
export async function searchNOT(
	firstQuery: string,
	secondQuery: string
): Promise<GitHubRepoResponse[]> {
	const apiResponses: GitHubRepoResponse[] = [];

	if (firstQuery != null && secondQuery != null) {
		for (let page = 1; page <= 5; page++) {
			const firstQueryRequest = `${githubAPI}${firstQuery}+${'&page='}+${page}`.trim();

			try {
				const requestResponse: GitHubResponse = await fetch(firstQueryRequest).then((response) => {
					return response.json() as Promise<GitHubResponse>;
				});

				if (requestResponse.items.length === 0) {
					break;
				}

				const filteredResponse: GitHubResponse = {
					...requestResponse,
					items: requestResponse.items.filter(
						(item) => !item.topics.some((topic) => topic === secondQuery)
					)
				};

				apiResponses.push(...filteredResponse.items);
			} catch (error) {}
		}
	}

	return apiResponses;
}
