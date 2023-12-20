<script lang="ts">
    export let cardTitle: string;
    export let cardDescription: string;
    export let cardFooterText: string;
</script>

<section class="border shadow-md rounded-md max-w-md bg-slate-300 dark:bg-slate-800">
    <div class="p-4 md:p-5">
        <h3>{cardTitle}</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">{cardDescription}</p>
        <p class="mt-5 text-xs text-gray-600 dark:text-gray-600">{cardFooterText}</p>
    </div>

</section>