<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	}

	function previousPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}
</script>

<nav aria-label="Card pagination">
	<ul class="flex py-5 justify-center">
		<li>
			<button
				class="h-10 px-5 bg-blue-600 hover:bg-blue-800 text-white dark:text-neutral-100 font-bold
            py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
				on:click={previousPage}
				disabled={currentPage === 1}>« Previous</button
			>
		</li>
		<li>
			<p class="px-2 py-2 dark:text-gray-100">
				Page <b>{currentPage.toString()}</b> of <b>{totalPages.toString()}</b>
			</p>
		</li>
		<li>
			<button
				class="h-10 px-5 bg-blue-600 hover:bg-blue-800 text-white dark:text-neutral-100 font-bold
            py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
				on:click={nextPage}
				disabled={currentPage === totalPages}>Next »</button
			>
		</li>
	</ul>
</nav>
