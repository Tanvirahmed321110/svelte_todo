<script>
    import CountryCart from '#lib/components/common/CountryCart.svelte';
    import CountryBanner from './sections/CountryBanner.svelte';

    let { data } = $props();
    let countries = $derived(data.countries);
    console.log(countries);
</script>

<div>
    <CountryBanner></CountryBanner>
    <section class="section-gap">
        <div class="container">
            {#if !countries || countries.length === 0}
                <div>Loading...</div>
            {:else}
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {#each countries.slice(2, 24) as country}
                        <CountryCart {country}></CountryCart>
                    {/each}
                </div>
            {/if}
        </div>
    </section>
</div>
