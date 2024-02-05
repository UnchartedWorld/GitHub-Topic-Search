<script lang="ts">
	// The overall design for this was inspired by: https://tailwindcomponents.com/component/tooltip-on-hover
	let showTooltip = false;
	export let tooltipText: string;
	export let tooltipContentID: string;

	// This can be toggled via hovering/focus. That's kinda cool.
	function toggleTooltipStatus() {
		showTooltip = !showTooltip;
	}

	function hideTooltip() {
		showTooltip = false;
	}

	function handleKeyInput(event: KeyboardEvent)
	{
		if (event.key === 'Enter' || event.key === ' ')
		{
			showTooltip = !showTooltip;
			event.preventDefault();
		} 
		else if (event.key === 'Escape')
		{
			showTooltip = false;
		}
	}
</script>

<button
	class="group inline-block relative cursor-help"
	on:mouseenter={toggleTooltipStatus}
	on:focus={hideTooltip}
	on:mouseleave={hideTooltip}
	on:mousedown={toggleTooltipStatus}
	on:blur={hideTooltip}
	on:keydown={handleKeyInput}
	aria-hidden={showTooltip}
	aria-haspopup="true"
	aria-expanded={showTooltip ? 'true' : 'false'}
	aria-describedby={tooltipContentID}
	type="button"
	>

	<img
		class="mx-4 my-5 w-5 h-5 dark:filter dark:invert"
		src="infoIcon.svg"
		alt="Info icon signifying important information"
		aria-describedby={tooltipContentID} />

	{#if showTooltip}
		<p id={tooltipContentID}
		   class="absolute bg-white dark:bg-neutral-700 rounded-md p-2 shadow-md
		   group-hover:border group-hover:border-violet-600 hover:outline-none text-gray-700
		   group-focus:border group-focus:border-violet-600 focus:outline-none
		 dark:text-gray-100 z-40 break-words max-w-xs w-32 sm:w-48 left-1/2 transform -translate-x-1/2"
		>
			{tooltipText}
		</p>
	{/if}
</button>
