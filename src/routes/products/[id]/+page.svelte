<script>
    import Button from '#lib/components/ui/Button.svelte';

    let { data } = $props();
    const product = $derived(data.product);

    const outOfStock = $derived(product.stock <= 0);
    const lowStock = $derived(product.stock > 0 && product.stock <= 5);
</script>

<svelte:head>
    <title>{product.name}</title>
</svelte:head>

<section class="py-8">
    <div class="container mx-auto px-4">
        <!-- Breadcrumb -->
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <a href="/" class="hover:text-white">Home</a>
            <span>/</span>
            <a href="/products" class="hover:text-white">Products</a>
            <span>/</span>
            <span class="text-gray-200">{product.name}</span>
        </nav>

        <div class="grid gap-8 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
            <!-- ছবি -->
            <div class="relative flex items-center justify-center rounded-xl bg-gray-50 p-6">
                <img
                    src={product.image}
                    alt={product.name}
                    class="h-80 w-full object-contain md:h-96"
                />

                {#if outOfStock}
                    <span
                        class="absolute top-4 left-4 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white"
                    >
                        স্টক শেষ
                    </span>
                {:else if lowStock}
                    <span
                        class="absolute top-4 left-4 rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white"
                    >
                        মাত্র {product.stock}টি বাকি
                    </span>
                {/if}
            </div>

            <!-- তথ্য -->
            <div class="flex flex-col gap-4">
                <h1 class="text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>

                <p class="text-sm text-gray-500">প্রোডাক্ট আইডি: #{product.id}</p>

                <p class="text-3xl font-bold text-blue-600">
                    ৳{product.price.toLocaleString('bn-BD')}
                </p>

                <p class="leading-relaxed text-gray-600">{product.desc}</p>

                <div class="flex items-center gap-2 text-sm">
                    <span class="text-gray-500">স্টক:</span>
                    {#if outOfStock}
                        <span class="font-semibold text-red-600">স্টকে নেই</span>
                    {:else}
                        <span class="font-semibold text-green-600">{product.stock}টি আছে</span>
                    {/if}
                </div>

                {#if !outOfStock}
                    <div class="flex items-center gap-4">
                        <span class="text-sm text-gray-500">পরিমাণ:</span>
                        <div class="flex items-center gap-3">
                            <Button variant="outline" size="sm" aria-label="কমান">−</Button>
                            <span class="w-8 text-center font-semibold text-gray-900">
                                {product.qty ?? 1}
                            </span>
                            <Button variant="outline" size="sm" aria-label="বাড়ান">+</Button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                        <span class="text-gray-500">মোট:</span>
                        <span class="text-xl font-bold text-gray-900">
                            ৳{(product.price * (product.qty ?? 1)).toLocaleString('bn-BD')}
                        </span>
                    </div>
                {/if}

                <div class="mt-2 flex gap-3">
                    <Button size="lg" class="flex-1" disabled={outOfStock}>
                        {outOfStock ? 'স্টক শেষ' : 'Add to Cart'}
                    </Button>
                    <Button size="lg" variant="outline" href="/products">← ফিরে যান</Button>
                </div>
            </div>
        </div>
    </div>
</section>
