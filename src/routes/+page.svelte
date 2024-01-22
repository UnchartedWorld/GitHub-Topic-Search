<script lang="ts">
	import GitHubCard from '../components/GitHubCard.svelte';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';
	import Pagination from '../components/Pagination.svelte';
	import SearchBar from '../components/SearchBar.svelte';
	import {
		leastStarredResults,
		mostStarredResults,
		leastForkedResults,
		mostForkedResults
	} from '../services/githubSort';
	import {
		type GitHubRepoResponse,
		searchAND,
		searchOR,
		searchNOT
	} from '../services/githubSearch';

	let results: GitHubRepoResponse[] = [];
	let firstSearchInput: string = '';
	let secondSearchInput: string = '';
	let selectedOperatorOption: string = 'Default';
	let selectedSortingOption: string = 'None';
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
		if (selectedOperatorOption === 'OR' && firstSearchInput != null && secondSearchInput != null) {
			currentPage = 1;
			selectedSortingOption = 'None';
			returnGitHubOR();
		} else if (
			selectedOperatorOption === 'AND' &&
			firstSearchInput != null &&
			secondSearchInput != null
		) {
			currentPage = 1;
			selectedSortingOption = 'None';
			returnGitHubAND();
		} else if (
			selectedOperatorOption === 'NOT' &&
			firstSearchInput != null &&
			secondSearchInput != null
		) {
			currentPage = 1;
			selectedSortingOption = 'None';
			returnGitHubNOT();
		} else {
			selectedOperatorOption = '';
		}
	}

	function handleSorting() {
		if (selectedSortingOption === 'mostStars' && results.length > 0) {
			results = mostStarredResults(results);
		} else if (selectedSortingOption === 'leastStars' && results.length > 0) {
			results = leastStarredResults(results);
		} else if (selectedSortingOption === 'mostForks' && results.length > 0) {
			results = mostForkedResults(results);
		} else if (selectedSortingOption === 'leastForks' && results.length > 0) {
			results = leastForkedResults(results);
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
	<h1 class="text-4xl font-extrabold py-16 text-center dark:text-gray-100">
		GitHub Topic Searcher
	</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<label class="block font-bold text-sm dark:text-gray-100 px-3 ml-3 py-1.5" for="firstSearch"
			>Enter your first query:</label
		>
		<SearchBar
			searchID="firstSearch"
			searchPlaceholder="Enter first search query"
			bind:searchInput={firstSearchInput}
		/>

		<label class="block font-bold text-sm dark:text-gray-100 px-3 ml-3 py-1.5" for="searchOptions"
			>Select search operator:</label
		>
		<select
			name="Search Options"
			id="searchOptions"
			bind:value={selectedOperatorOption}
			class="relative px-3 py-1.5 text-base font-normal text-gray-700 dark:text-gray-100 bg-white
				 dark:bg-neutral-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300
				 dark:border-neutral-600 rounded-md transition ease-in-out m-0 mb-2 ml-6 focus:text-gray-700
				 dark:focus:text-gray-100 focus:bg-white dark:focus:bg-neutral-700 focus:shadow-md
				 focus-within:border focus-within:border-violet-600 focus:outline-none w-4/6 max-w-screen-sm"
			required
		>
			<option selected disabled value="Default">Please select an operator</option>
			<option value="OR">OR</option>
			<option value="AND">AND</option>
			<option value="NOT">NOT</option>
		</select>

		<label class="block font-bold text-sm dark:text-gray-100 px-3 ml-3 py-1.5" for="secondSearch"
			>Enter your second query:</label
		>
		<SearchBar
			searchID="secondSearch"
			searchPlaceholder="Enter second search query"
			bind:searchInput={secondSearchInput}
		/>

		<button
			class="bg-violet-600 hover:bg-violet-800 text-white dark:text-neutral-100 font-bold
				     py-2 px-4 rounded ml-5 mb-5 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
			type="submit"
			disabled={isLoading}>Submit</button
		>
	</form>

	{#if results.length > 0 && isLoading == false}
		<div class="flex justify-end">
			<div class="flex flex-col">
				<label class="font-bold text-sm dark:text-gray-100 px-1 py-1.5" for="sortingOptions"
					>Choose an (optional) sorting order:</label>
				<select
					name="Sorting Options"
					id="sortingOptions"
					class="px-3 py-1.5 text-base font-normal text-gray-700 dark:text-gray-100 bg-white
					 dark:bg-neutral-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300
					 dark:border-neutral-600 rounded-md transition ease-in-out m-0 mb-2 ml-6 focus:text-gray-700
					 dark:focus:text-gray-100 focus:bg-white dark:focus:bg-neutral-700 focus:shadow-md 
					 focus:ring-violet-600 focus:ring-1"
					bind:value={selectedSortingOption}
					on:change={handleSorting}>
					<option value="None" disabled selected>Sort results by:</option>
					<option value="mostStars">Most stars</option>
					<option value="leastStars">Least stars</option>
					<option value="mostForks">Most forks</option>
					<option value="leastForks">Least forks</option>
				</select>
			</div>
		</div>

		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-6 py-16 place-content-center"
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
		<LoadingSpinner loading={isLoading} spinnerID="spinID" />
	{/if}
</section>

<style>
</style>
