<script lang="ts">
	export let searchLabel: string;
	export let searchPlaceholder: string;
</script>

<div class="ml-6 max-w-md">
	<!-- Search bar -->
	<div
		class="relative mb-4 mt-2 flex w-full h-11 items-center overflow-hidden bg-white dark:bg-neutral-800 rounded-md"
	>
		<div class="grid place-items-center h-full w-11 text-gray-400">
			<svg
				class="h-7 w-7"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					clip-rule="evenodd"
					d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
					fill="#000000"
				/>
			</svg>
		</div>

		<label for="searchBox" class="sr-only">{searchLabel}</label>
		<input
			type="search"
			id="searchBox"
			class="h-full w-full rounded-md focus:shadow peer"
			aria-describedby="searchIcon"
			placeholder={searchPlaceholder}
			aria-label={searchPlaceholder}
		/>
	</div>
</div>
