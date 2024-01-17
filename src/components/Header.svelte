<script>
	import { base } from '$app/paths';
	import DarkModeToggle from './DarkModeToggle.svelte';
</script>

<header class="bg-violet-50 dark:bg-neutral-800  border-t-[0.5rem] border-violet-600">
	<nav class="px-4 lg:px-6 py-4 mx-auto">
		<div class="flex flex-wrap justify-between items-center mx-auto">
			<a href={base}>
				<span class="self-center text-1xl font-semibold whitespace-nowrap dark:text-gray-100"
					>Topic Searcher</span>
			</a>
			<DarkModeToggle />
		</div>
	</nav>
</header>
