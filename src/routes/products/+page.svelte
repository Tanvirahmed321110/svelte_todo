<script>
    import ProductCard from '#lib/components/common/ProductCard.svelte';
    import { products } from '#lib/data/products.js';
</script>

<div>
    <div class=" mx-auto py-8">
        <div class="container mx-auto grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {#each products as product (product.id)}
                <ProductCard {product} />
            {/each}
        </div>
    </div>
</div>
