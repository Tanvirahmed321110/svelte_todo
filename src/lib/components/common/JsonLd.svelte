<script>
    let { data } = $props();
    const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
    import JsonLd from '#lib/components/common/JsonLd.svelte';

    // সব প্রোডাক্টের তালিকা Google কে জানাও
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
</script>

<JsonLd data={listLd} />

<svelte:head>
    {@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
