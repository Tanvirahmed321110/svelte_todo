<script>
    import Button from '#lib/components/ui/Button.svelte';
    import { page } from '$app/state';

    const defaultMessages = {
        404: 'পেজটি খুঁজে পাওয়া যায়নি',
        403: 'আপনার এই পেজ দেখার অনুমতি নেই',
        500: 'সার্ভারে সমস্যা হয়েছে, একটু পরে চেষ্টা করুন'
    };

    const message = $derived(
        page.error?.message === 'Not Found'
            ? defaultMessages[page.status]
            : (page.error?.message ?? defaultMessages[page.status])
    );
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 class="text-6xl font-bold">{page.status}</h1>
    <p class="text-gray-600">{message}</p>
    <Button href="/">Back To Home</Button>
</div>
