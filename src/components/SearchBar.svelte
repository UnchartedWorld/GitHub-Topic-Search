<script lang="ts">
	export let searchLabel: string;
	export let searchPlaceholder: string;
	export let searchInput: string;
</script>

<div class="ml-6 max-w-md">
	<!-- Search bar -->
	<div
		class="relative mb-4 mt-2 flex w-full h-11 items-center overflow-hidden bg-white 
			   dark:bg-neutral-800 rounded-md shadow-sm hover:shadow-md transition duration-300">
		<div class="grid place-items-center h-full w-11 text-gray-400">
			<img class="w-5 h-5 pr-1" src="searchIcon.svg" alt="Magnifying glass representing a search icon" />
		</div>

		<label for="searchBox" class="sr-only">{searchLabel}</label>
		<input
			type="search"
			id="searchBox"
			class="h-full w-full p-2 rounded-md focus:ring-blue-400 transition duration-300 peer"
			aria-describedby="searchIcon"
			placeholder={searchPlaceholder}
			aria-label={searchPlaceholder}
			bind:value={searchInput}
			required
		/>
	</div>
</div>
