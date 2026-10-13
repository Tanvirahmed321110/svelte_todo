<!-- src/lib/components/common/QuickViewModal.svelte -->
<script>
    import Modal from '#lib/components/ui/Modal.svelte';
    import Button from '#lib/components/ui/Button.svelte';

    let { open = $bindable(false), product, onaddtocart } = $props();

    const outOfStock = $derived(product?.stock <= 0);
</script>

<Modal bind:open title={product?.name ?? ''} size="lg">
    {#if product}
        <div class="grid gap-6 md:grid-cols-2">
            <div class="flex items-center justify-center rounded-xl bg-gray-50 p-6">
                <img src={product.image} alt={product.name} class="h-64 w-full object-contain" />
            </div>

            <div class="flex flex-col gap-3">
                <p class="text-2xl font-bold text-blue-600">
                    ৳{product.price.toLocaleString('bn-BD')}
                </p>
                <p class="text-gray-600">{product.desc}</p>
                <p class="text-sm text-gray-500">স্টক: {product.stock}টি</p>
                <a href="/products/{product.id}" class="text-sm text-blue-600 hover:underline">
                    বিস্তারিত দেখুন →
                </a>
            </div>
        </div>
    {/if}

    {#snippet footer()}
        <Button variant="danger" onclick={() => (open = false)}>বন্ধ</Button>
        <Button
            disabled={outOfStock}
            onclick={() => {
                onaddtocart?.(product);
                open = false;
            }}
        >
            {outOfStock ? 'স্টক শেষ' : 'কার্টে যোগ করুন'}
        </Button>
    {/snippet}
</Modal>
