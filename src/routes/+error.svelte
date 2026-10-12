<script>
    import Button from '#lib/components/ui/Button.svelte';
    import { page } from '$app/state';
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 class="text-6xl font-bold">{page.status}</h1>
    <p class="text-gray-600">
        {page.status === 404 ? 'পেজটি খুঁজে পাওয়া যায়নি' : page.error?.message}
    </p>
    <Button href="/">Back To Home</Button>
</div>
