<script lang="ts">
	import { writable } from 'svelte/store';

	export const darkMode = writable(false);

	function toggleDarkMode() {
		darkMode.update((value) => !value);
		document.documentElement.classList.toggle('dark');
	}

	$: currentMode = $darkMode ? '🌜' : '☀️';
</script>

<button
	class="px-2 py-1 mr-3 shadow-md rounded-md bg-violet-50 hover:bg-violet-100 dark:bg-neutral-600
		  dark:hover:bg-neutral-700 border border-gray-300"
	on:click={toggleDarkMode}
>
	{currentMode}
</button>
