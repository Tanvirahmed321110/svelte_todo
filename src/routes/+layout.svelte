<script lang="ts">
    import './layout.css';
    import favicon from '#lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';
    import Footer from '#lib/components/layout/Footer.svelte';
    import Header from '#lib/components/layout/Header.svelte';

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
    <Header></Header>

    <main class="flex-1">
        {@render children()}
    </main>

    <!-- Footer Here -->
    <Footer />
</div>
