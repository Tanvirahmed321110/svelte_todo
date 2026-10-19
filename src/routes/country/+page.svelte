<script>
    import CountryCart from '#lib/components/common/CountryCart.svelte';
    import CountryBanner from './sections/CountryBanner.svelte';

    let { data } = $props();
</script>

<div>
    <CountryBanner />

    <section class="section-gap">
        <div class="container">
            {#await data.countriesPromise}
                <!-- 👇 Skeleton (loading) -->
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {#each Array(8) as _}
                        <div class="skeleton-card"></div>
                    {/each}
                </div>
            {:then countries}
                <!-- 👇 আসল card -->
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {#each (countries || []).slice(2, 24) as country}
                        <CountryCart {country} />
                    {/each}
                </div>
            {:catch error}
                <p>দেশ লোড করা যায়নি।</p>
            {/await}
        </div>
    </section>
</div>

<style>
    .skeleton-card {
        height: 180px;
        border-radius: 12px;
        background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
