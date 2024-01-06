<script lang="ts">
	export let searchID: string;
	export let searchPlaceholder: string;
	export let searchInput: string;
</script>

<div class="ml-6 max-w-md">
	<!-- Search bar -->
	<div
		class="relative mb-4 mt-2 flex w-full h-11 items-center overflow-hidde bg-white 
			   dark:bg-neutral-700 rounded-md shadow-sm hover:shadow-md transition duration-300">
		<div class="grid place-items-center h-full w-11">
			<img class="w-5 h-5 pr-1" src="searchIcon.svg" alt="Magnifying glass representing a search icon" />
		</div>

		<input
			type="search"
			id={searchID}
			class="h-full w-full p-2 rounded-md focus:ring-blue-400 transition duration-300 peer 
				   bg-white dark:bg-neutral-700 dark:text-gray-100"
			aria-describedby="searchIcon"
			placeholder={searchPlaceholder}
			bind:value={searchInput}
			required
		/>
	</div>
</div>
