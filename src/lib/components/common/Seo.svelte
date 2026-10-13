<script>
    import { page } from '$app/state';
    import { SITE_URL, SITE_NAME } from '#lib/config.js';

    let { title, description = '', image = '', type = 'website', noindex = false } = $props();

    const fullTitle = $derived(`${title} | ${SITE_NAME}`);
    const url = $derived(SITE_URL + page.url.pathname);
    // ১৬০ অক্ষরের বেশি হলে Google কেটে দেয়
    const desc = $derived(description.slice(0, 160));
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={desc} />
    <link rel="canonical" href={url} />

    {#if noindex}
        <meta name="robots" content="noindex, nofollow" />
    {/if}

    <!-- Facebook, WhatsApp এ শেয়ার করলে যা দেখায় -->
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={desc} />
    <meta property="og:url" content={url} />
    <meta property="og:locale" content="bn_BD" />
    {#if image}
        <meta property="og:image" content={image} />
    {/if}

    <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={desc} />
    {#if image}
        <meta name="twitter:image" content={image} />
    {/if}
</svelte:head>
