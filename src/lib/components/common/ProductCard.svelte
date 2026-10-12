<script>
    import Button from '../ui/Button.svelte';

    let { product, onaddtocart, onquickview } = $props();

    const outOfStock = $derived(product.stock <= 0);
    const lowStock = $derived(product.stock > 0 && product.stock <= 5);
</script>

<div
    class="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
>
    <div class="relative bg-gray-50 p-4">
        <a href="/products/{product.id}">
            <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                class="h-48 w-full object-contain transition group-hover:scale-105"
            />
        </a>

        {#if outOfStock}
            <span
                class="absolute top-3 left-3 rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white"
            >
                স্টক শেষ
            </span>
        {:else if lowStock}
            <span
                class="absolute top-3 left-3 rounded bg-amber-500 px-2 py-0.5 text-xs font-medium text-white"
            >
                মাত্র {product.stock}টি বাকি
            </span>
        {/if}
    </div>

    <div class="flex flex-1 flex-col gap-2 p-4">
        <h3 class="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-800">
            {product.name}
        </h3>

        <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">
                ৳{product.price.toLocaleString('bn-BD')}
            </span>
            <span class="text-xs {outOfStock ? 'text-red-600' : 'text-green-600'}">
                {outOfStock ? 'স্টকে নেই' : `স্টক: ${product.stock}`}
            </span>
        </div>

        <div class="mt-auto flex gap-2 pt-2">
            <Button class="flex-1" onclick={() => onaddtocart?.(product)} disabled={outOfStock}>
                Add to Cart
            </Button>

            <Button onclick={() => onquickview?.(product)} aria-label="Quick view" class="outline">
                Quick View
            </Button>
        </div>
    </div>
</div>
