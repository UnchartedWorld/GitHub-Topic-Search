<script lang="ts">
	export let cardID: number;
	export let cardUserAvatar: string;
	export let cardHTML: string;
	export let cardTitle: string;
	export let cardCreatorName: string;
	export let cardDescription: string;
	export let starCount: number;
	export let forkCount: number;
</script>

<a href={cardHTML}>
	<section
		id={cardID.toString()}
		class="border h-full rounded-md max-w-md
           bg-white dark:bg-neutral-700 shadow-md hover:shadow-lg transition duration-300 p-5"
	>
		<div class="p-4 md:p-5 flex flex-col h-full dark:text-gray-100">
			<div class="flex flex-row justify-between items-center">
				<h2 class="text-xl font-bold break-words">{cardTitle}</h2>
				<img class="w-10 h-10 mr-1" src={cardUserAvatar} alt="GitHub account avatar" />
			</div>

			<p class="text-gray-600 dark:text-gray-300 md:line-clamp-2">{cardDescription}</p>
			<p>Creator: {cardCreatorName}</p>

			<div class="flex flex-grow justify-between items-end">
				<div class="flex flex-row">
					<img class="w-5 h-5 mr-1 dark:filter dark:invert" src="star.svg" alt="GitHub stars" />
					<p>{starCount}</p>
				</div>
				<div class="flex flex-row">
					<img
						class="w-5 h-5 mr-1 dark:filter dark:invert"
						src="git-branch.svg"
						alt="Git Branch icon"
					/>
					<p>{forkCount}</p>
				</div>
			</div>
		</div>
	</section>
</a>
