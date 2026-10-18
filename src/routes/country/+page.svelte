<script>
    import CountryCart from '#lib/components/common/CountryCart.svelte';
    import CountryBanner from './sections/CountryBanner.svelte';

    let { data } = $props();
    let countries = data.countries;
    console.log(countries);
</script>

<div>
    <CountryBanner></CountryBanner>
    <section class="section-gap">
        <div class="container">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {#each countries as country}
                    <CountryCart {country}></CountryCart>
                {/each}
            </div>
        </div>
    </section>
</div>
