<script lang="ts">
	import GitHubCard from '../components/GitHubCard.svelte';
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
	let selectedOption: string = '';

	async function returnGitHubAND() {
		results = [];
		results = await searchAND([firstSearchInput, secondSearchInput]);
	}

	async function returnGitHubOR() {
		results = [];
		results = await searchOR([firstSearchInput, secondSearchInput]);
	}

	async function returnGitHubNOT() {
		results = [];
		results = await searchNOT(firstSearchInput, secondSearchInput);
	}

	function handleSubmit() {
		if (selectedOption === 'OR' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubOR();
		} else if (selectedOption === 'AND' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubAND();
		} else if (selectedOption === 'NOT' && firstSearchInput != null && secondSearchInput != null) {
			returnGitHubNOT();
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="GitHub Topic Searcher" />
</svelte:head>

<section class="container mx-auto">
	<form on:submit|preventDefault={handleSubmit}>
		<SearchBar
			searchLabel="First searchbar"
			searchPlaceholder="Enter first search query"
			bind:searchInput={firstSearchInput}
		/>

		<select
			name="Search Options"
			id="searchOptions"
			bind:value={selectedOption}
			class="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
				   border border-solid border-gray-300 rounded transition ease-in-out m-0 mb-2 ml-6 focus:text-gray-700
				 focus:bg-white focus:shadow-md focus:border-blue-600 focus:outline-none"
			required
		>
			<option selected hidden>Please select an operator</option>
			<option value="OR">OR</option>
			<option value="AND">AND</option>
			<option value="NOT">NOT</option>
		</select>

		<SearchBar
			searchLabel="Second searchbar"
			searchPlaceholder="Enter second search query"
			bind:searchInput={secondSearchInput}
		/>

		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mb-5 mt-5"
			type="submit">Submit</button
		>
	</form>

	{#if results.length > 0}
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3 space-y-3 md:space-x-6 md:space-y-6"
		>
			{#each results as repo}
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
	{/if}
</section>

<style>
</style>
