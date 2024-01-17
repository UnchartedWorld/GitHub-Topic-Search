import type { GitHubRepoResponse } from './githubSearch';

/**
 * Sorts a list of repositories to have the most starred repositories first.
 * @param entries A list of returned entries that haven't been sorted yet.
 * @returns A descending order list of most starred repositories.
 */
export function mostStarredResults(entries: GitHubRepoResponse[]): GitHubRepoResponse[] {
	let filteredResults: GitHubRepoResponse[] = [];

	if (entries.length > 0) {
		filteredResults = [...entries].sort((a, b) => {
			if (a.stargazers_count > b.stargazers_count) {
				return -1;
			}

			if (a.stargazers_count < b.stargazers_count) {
				return 1;
			}

			return 0;
		});
	}

	return filteredResults;
}

/**
 * Sorts a list of repositories to have the most forked repositories first.
 * @param entries A list of returned entries that haven't been sorted yet.
 * @returns A descending order list of most forked repositories.
 */
export function mostForkedResults(entries: GitHubRepoResponse[]): GitHubRepoResponse[] {
	let filteredResults: GitHubRepoResponse[] = [];

	if (entries.length > 0) {
		filteredResults = [...entries].sort((a, b) => {
			if (a.forks_count > b.forks_count) {
				return -1;
			}

			if (a.forks_count < b.forks_count) {
				return 1;
			}

			return 0;
		});
	}

	return filteredResults;
}

/**
 * Sorts a list of repositories to have the least forked repositories first.
 * @param entries A list of returned entries that haven't been sorted yet.
 * @returns An ascending order list of least forked repositories.
 */
export function leastForkedResults(entries: GitHubRepoResponse[]): GitHubRepoResponse[] {
	let filteredResults: GitHubRepoResponse[] = [];

	if (entries.length > 0) {
		filteredResults = [...entries].sort((a, b) => {
			if (a.forks_count > b.forks_count) {
				return 1;
			}

			if (a.forks_count < b.forks_count) {
				return -1;
			}

			return 0;
		});
	}

	return filteredResults;
}

/**
 * Sorts a list of repositories to have the least starred repositories first.
 * @param entries A list of returned entries that haven't been sorted yet.
 * @returns An ascending order list of least starred repositories.
 */
export function leastStarredResults(entries: GitHubRepoResponse[]): GitHubRepoResponse[] {
	let filteredResults: GitHubRepoResponse[] = [];

	if (entries.length > 0) {
		filteredResults = [...entries].sort((a, b) => {
			if (a.stargazers_count > b.stargazers_count) {
				return 1;
			}

			if (a.stargazers_count < b.stargazers_count) {
				return -1;
			}

			return 0;
		});
	}

	return filteredResults;
}
