<script lang="ts">
	import { searchAND, type GitHubRepoResponse } from "../services/githubSearch";

	let results: GitHubRepoResponse[] = [];

	async function returnGitHubAND() {
		results = await searchAND(["avalonia", "mvvm"]);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<button class="bg-blue-500" on:click={returnGitHubAND}>Activates GitHubAND</button>

	{#if results.length > 0}
    <ul>
      {#each results as repo (repo.id)}
        <li>{repo.name}</li>
      {/each}
    </ul>
  {/if}

</section>

<style>
</style>
