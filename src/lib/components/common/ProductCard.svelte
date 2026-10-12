<script>
    let { product } = $props();
</script>

<div class=" rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-neutral-100">
    <img
        src={product.image}
        alt={product.name}
        class="h-48 w-full rounded-lg bg-white object-contain"
    />

    <h3 class="mt-3 line-clamp-2 text-sm font-semibold">{product.name}</h3>

    <p class="mt-1 line-clamp-2 text-xs text-neutral-400">{product.desc}</p>

    <div class="mt-3 flex items-center justify-between">
        <span class="font-bold text-blue-400">৳ {product.price}</span>
        <span class="text-xs text-neutral-400">Stock: {product.stock}</span>
    </div>
</div>
