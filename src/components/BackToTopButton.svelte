<script lang="ts">
	// Got this pretty much entirely from https://angelblanco.dev/articles/simple-svelte-back-to-top, just altered
	// to have better function names + incorporates TailwindCSS.

	export let numOfPxUntilVisible: number;
	let hiddenStatus: boolean = true;
	let hiddenClass = 'hidden';

	function scrollToTop() {
		document.body.scrollIntoView({ behavior: 'smooth' });
	}

	function getContainer() {
		return document.documentElement || document.body;
	}

	function handleScrollVisibility() {
		if (!getContainer()) {
			return;
		}

		if (getContainer().scrollTop > numOfPxUntilVisible) {
			hiddenStatus = false;
		} else {
			hiddenStatus = true;
		}
	}

	$: if (hiddenStatus) {
		hiddenClass = 'hidden';
	} else {
		hiddenClass = '';
	}
</script>

<svelte:window on:scroll={handleScrollVisibility} />

<button
	class="{hiddenClass} opacity-100 fixed right-10 bottom-10 z-50 dark:text-gray-100 bg-violet-500
		  hover:bg-violet-700 border border-gray-300 shadow-md rounded-full p-6 w-6 h-6 text-center"
	type="button"
	class:hiddenStatus
	on:click={scrollToTop}
>
	<p class="flex justify-center text-center align-top -mt-2 font-extrabold">^</p>
</button>
