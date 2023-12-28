export interface GitHubResponse {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubRepoResponse[];
}

export interface GitHubRepoResponse {
	id: number;
	name: string;
	full_name: string;
	description: string;
	owner: {
		name: string;
	};
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
	topics: string[];
}

let githubAPI: string = 'https://api.github.com/search/repositories?q=topic:';
const gitHubCacheName = 'github-cache-v1.0';

/**
 * Performs GitHub API requests that will return a list of both queries' repository results as
 * if they were searched separately.
 *
 * @param queries A list (likely of 2 strings) that represent a user's topic search parameters.
 * @returns A list of GitHubRepoResponse type that combined the two results.
 */
export async function searchOR(queries: string[]): Promise<GitHubRepoResponse[]> {
	const apiResponses: GitHubRepoResponse[] = [];
	const cacheKey = queries.join('_');

	// This will check if the cache even exists.
	const cache = await caches.open(gitHubCacheName);
	const cachedResponse = await cache.match(cacheKey);

	if (cachedResponse != null) {
		console.log('Cached results found, using those. Yay for saving API calls!');
		return cachedResponse.json();
	}

	if (queries != null && queries.length > 0) {
		const apiRequests = queries.map((query) => `${githubAPI}${query}`);

		try {
			const requestResponses = await Promise.all(apiRequests.map((request) => fetch(request)));
			const responseData = await Promise.all(requestResponses.map((response) => response.json()));

			responseData.forEach((data: GitHubResponse) => {
				apiResponses.push(...data.items);
			});

			const cacheResponse = new Response(JSON.stringify(apiResponses), {
				headers: { 'Cache-Control': 'max-age=2600' }
			});

			cache.put(cacheKey, cacheResponse);
		} catch (error) {}
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

	const cacheKey = queries.join('_');

	// This will check if the cache even exists.
	const cache = await caches.open(gitHubCacheName);
	const cachedResponse = await cache.match(cacheKey);

	if (cachedResponse != null) {
		console.log('Cached results found, using those. Yay for saving API calls!');
		return cachedResponse.json();
	}

	if (queries != null && queries.length > 0) {
		// I need to figure out how to add a + into the string, but otherwise this works!
		const fullAPIRequest = `${githubAPI}${queries[0].toString()} + ${'+'}topic:${queries[1].toString()}`;

		try {
			// I need to account for empty responses in some graceful way.
			const requestResponse = await fetch(fullAPIRequest).then((response) => {
				return response.json() as Promise<GitHubResponse>;
			});

			apiResponses.push(...requestResponse.items);

			const cacheResponse = new Response(JSON.stringify(apiResponses), {
				headers: { 'Cache-Control': 'max-age=2600' }
			});

			cache.put(cacheKey, cacheResponse);
		} catch (error) {}
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
	const cacheKey = firstQuery + '_' + secondQuery;

	// This will check if the cache even exists.
	const cache = await caches.open(gitHubCacheName);
	const cachedResponse = await cache.match(cacheKey);

	if (cachedResponse != null) {
		console.log('Cached results found, using those. Yay for saving API calls!');
		return cachedResponse.json();
	}

	if (firstQuery != null && secondQuery != null) {
		const firstQueryRequest = `${githubAPI}${firstQuery}`;

		try {
			const requestResponse: GitHubResponse = await fetch(firstQueryRequest).then((response) => {
				return response.json() as Promise<GitHubResponse>;
			});

			const filteredResponse: GitHubResponse = {
				...requestResponse,
				items: requestResponse.items.filter(
					(item) => !item.topics.some((topic) => topic === secondQuery)
				)
			};

			apiResponses.push(...filteredResponse.items);

			const cacheResponse = new Response(JSON.stringify(apiResponses), {
				headers: { 'Cache-Control': 'max-age=2600' }
			});

			cache.put(cacheKey, cacheResponse);
		} catch (error) {}
	}

	return apiResponses;
}