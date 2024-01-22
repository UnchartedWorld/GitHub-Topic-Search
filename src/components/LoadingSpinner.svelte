<script lang="ts">
	import { afterUpdate } from 'svelte';

	export let spinnerID: string;
	export let loading: boolean;

	afterUpdate(() => {
		scrollDown();
	});

	function scrollDown() {
		if (loading) {
			const spinnerElement = document.getElementById(spinnerID);

			if (spinnerElement) {
				spinnerElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}
	}
</script>

<div id={spinnerID} class="flex items-center justify-center py-20">
	<div
		class="flex h-20 w-20 animate-spin rounded-full items-center justify-center
           bg-gradient-to-tr from-violet-400 to-violet-700 dark:from-violet-700 dark:to-violet-400"
	>
		<div class="h-14 w-14 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
	</div>
</div>
