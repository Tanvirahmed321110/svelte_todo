<script lang="ts">
    let { title = 'Todo App' }: { title?: string } = $props();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/tasks', label: 'Tasks' },
        { href: '/products', label: 'Products' }
    ];
</script>

<header class="border-b border-b-amber-900 bg-amber-950">
    <div class="container mx-auto flex h-16 items-center justify-between">
        <a href="/" class="text-xl font-bold text-teal-600">
            {title}
        </a>

        <nav class="flex gap-4 text-gray-600">
            {#each links as link}
                <a href={link.href} class="hover:text-teal-600">
                    {link.label}
                </a>
            {/each}
        </nav>
    </div>
</header>

<style>
    header a {
        color: #c2c0c0;
    }
</style>
