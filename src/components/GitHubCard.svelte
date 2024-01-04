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
           bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition duration-300 p-5"
	>
		<div class="p-4 md:p-5 flex flex-col h-full">
			<h3 class="text-xl font-bold break-words">{cardTitle}</h3>
			<p class="text-neutral-700 md:line-clamp-2">{cardDescription}</p>
			<div class="flex flex-row">
				<img class="w-5 h-5 mr-1" src={cardUserAvatar} alt="GitHub account avatar" />
				<p>Creator: {cardCreatorName}</p>
			</div>
			
			<div class="flex flex-grow justify-between items-end">
				<div class="flex flex-row">
					<img class="w-5 h-5 mr-1" src="/star.svg" alt="GitHub stars" />
					<p>{starCount}</p>
				</div>
				<p>Fork: {forkCount}</p>
			</div>
		</div>
	</section>
</a>
