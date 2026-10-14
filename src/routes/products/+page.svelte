<script>
    import ProductCard from '#lib/components/common/ProductCard.svelte';
    // import { products } from '#lib/data/products.js';
    import Seo from '#lib/components/common/Seo.svelte';
    import JsonLd from '#lib/components/common/JsonLd.svelte';
    import QuickViewModal from '../../lib/components/common/QuickViewModal.svelte';
    import { getProducts } from '#lib/stores/productStore.svelte.js';

    let products = $derived(getProducts());

    const listLd = $derived({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://todo-tanvir.surge.sh/products/${p.id}`,
            name: p.name
        }))
    });

    // For Quickview
    let open = $state(false);
    let selected = $state(null);

    function handleQuickView(product) {
        selected = product;
        open = true;
    }
</script>

<Seo
    title="সব প্রোডাক্ট"
    description="Tourgull-এর সব প্রোডাক্ট এক জায়গায় — ট্যুর, ফ্লাইট, হোটেল,
    গাড়ি, খাবার আরও অনেক কিছু"
    image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
    type="website"
/>
<!-- ✅ শুধু এটা — svelte:head নয় -->
<JsonLd data={listLd} />
<div>
    <div class=" mx-auto py-8">
        <div class="container mx-auto grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {#each products as product (product.id)}
                <ProductCard {product} onquickview={handleQuickView} />
            {/each}
        </div>
    </div>
</div>

<QuickViewModal bind:open product={selected} />
