<script>
	import { base } from "$app/paths";
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>Something went wrong</title>
	<meta name="description" content="Error page for when something goes wrong" />
</svelte:head>

<main class="grid min-h-full place-items-center">
    <section class="text-center">
        <h1 class="mt-4 text-3xl sm:text-5xl font-bold">Uh oh, a {$page.status} error occurred!</h1>
        <p class="mt-5">Something went wrong. You're probably lost, so here's a button to get back home!</p>

        <div class="mt-10 flex items-center justify-center">
            <a href="{base}/" class="rounded-md shadow-sm px-3.5 py-2.5 bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Head home</a>
        </div>
    </section>

</main>