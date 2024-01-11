<script lang="ts">
	import GitHubCard from '../components/GitHubCard.svelte';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';
	import Pagination from '../components/Pagination.svelte';
	import SearchBar from '../components/SearchBar.svelte';
	import {
		type GitHubRepoResponse,
		searchAND,
		searchOR,
		searchNOT
	} from '../services/githubSearch';

	let results: GitHubRepoResponse[] = [];
	let firstSearchInput: string = '';
	let secondSearchInput: string = '';
	let selectedOption: string = 'Default';
	let isLoading: boolean = false;

	let pageSize: number = 15;
	let currentPage: number = 1;

	// For future learning, $: refers to reactive statements, which is fantastic for elements that may
	// need to respond to user input i.e. pagination.

	$: totalNumOfEntries = results.length;
	$: totalPages = Math.ceil(totalNumOfEntries / pageSize);

	// Gets the starting index, and ending index via the current page & pageSize.
	$: displayedEntries = results.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	async function returnGitHubAND() {
		isLoading = true;
		results = [];
		results = await searchAND([firstSearchInput, secondSearchInput]);
		isLoading = false;
	}

	async function returnGitHubOR() {
		isLoading = true;
		results = [];
		results = await searchOR([firstSearchInput, secondSearchInput]);
		isLoading = false;
	}

	async function returnGitHubNOT() {
		isLoading = true;
		results = [];
		results = await searchNOT(firstSearchInput, secondSearchInput);
		isLoading = false;
	}

	function handleSubmit() {
		if (selectedOption === 'OR' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubOR();
		} else if (selectedOption === 'AND' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubAND();
		} else if (selectedOption === 'NOT' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubNOT();
		} else {
			selectedOption = '';
		}
	}
</script>

<svelte:head>
	<title>Home - GitHub Topic Searcher</title>
	<meta
		name="description"
		content="A GitHub Topic searcher that slightly expands the topic searcher's capabilities to allow an individual to use AND, NOT, OR search operators with their queries."
	/>
</svelte:head>

<section class="container mx-auto px-6">
	<h1 class="text-3xl font-extrabold py-16 text-center dark:text-gray-100">
		GitHub Topic Searcher
	</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<label class="block font-bold text-sm dark:text-gray-100 px-3 py-1.5" for="firstSearch"
			>Enter your first query:</label
		>
		<SearchBar
			searchID="firstSearch"
			searchPlaceholder="Enter first search query"
			bind:searchInput={firstSearchInput}
		/>

		<label class="block font-bold text-sm dark:text-gray-100 px-3 py-1.5" for="searchOptions"
			>Select search operator:</label
		>
		<select
			name="Search Options"
			id="searchOptions"
			bind:value={selectedOption}
			class="px-3 py-1.5 text-base font-normal text-gray-700 dark:text-gray-100 bg-white
				 dark:bg-neutral-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300
				 dark:border-neutral-600 rounded transition ease-in-out m-0 mb-2 ml-6 focus:text-gray-700
				 dark:focus:text-gray-100 focus:bg-white dark:focus:bg-neutral-700 focus:shadow-md
				 focus:border-blue-600 focus:outline-none w-full max-w-screen-sm"
			required
		>
			<option selected disabled value="Default">Please select an operator</option>
			<option value="OR">OR</option>
			<option value="AND">AND</option>
			<option value="NOT">NOT</option>
		</select>

		<label class="block font-bold text-sm dark:text-gray-100 px-3 py-1.5" for="secondSearch"
			>Enter your second query:</label
		>
		<SearchBar
			searchID="secondSearch"
			searchPlaceholder="Enter second search query"
			bind:searchInput={secondSearchInput}
		/>

		<button
			class="bg-blue-600 hover:bg-blue-800 text-white dark:text-neutral-100 font-bold
				     py-2 px-4 rounded ml-5 mb-5 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
			type="submit"
			disabled={isLoading}>Submit</button
		>
	</form>

	{#if results.length > 0 && isLoading == false}
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3 space-y-3 md:space-x-6 md:space-y-6 py-16 place-content-center"
		>
			{#each displayedEntries as repo}
				<GitHubCard
					cardID={repo.id}
					cardHTML={repo.html_url}
					cardUserAvatar={repo.owner.avatar_url}
					cardTitle={repo.name}
					cardCreatorName={repo.owner.login}
					cardDescription={repo.description}
					starCount={repo.stargazers_count}
					forkCount={repo.forks_count}
				/>
			{/each}
		</div>

		<Pagination bind:currentPage bind:totalPages />
	{:else if isLoading == true}
		<LoadingSpinner spinnerID="spinID" />
	{/if}
</section>

<style>
</style>
