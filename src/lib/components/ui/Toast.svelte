<!-- ✦ ══════════════  ⚡ Toast Component  ══════════════ ✦ -->
<script>
    /**
     * Toast — পুরো অ্যাপের notification বাক্স।
     *
     * ═══ SETUP (একবারই, root layout এ) ═══
     * src/routes/+layout.svelte এ বসান। পেজে পেজে বসাবেন না,
     * নইলে একই toast একাধিকবার দেখাবে।
     *
     *     import Toast from '#lib/components/ui/Toast.svelte';
     *     <Toast position="top-right" />
     *
     * ═══ USAGE (যেকোনো পেজ বা কম্পোনেন্ট থেকে) ═══
     * <Toast /> কে সরাসরি ডাকবেন না। store এর `toast` ফাংশন ডাকুন:
     *
     *     import { toast } from '#lib/stores/toast.svelte.js';
     *
     *     toast.success('Task যোগ হয়েছে');
     *     toast.error('ডিলিট হয়েছে');
     *     toast.warning('ফর্ম অসম্পূর্ণ');
     *     toast.info('সেভ হচ্ছে...');
     *
     *     toast.success('Saved', { title: 'সফল' });       // শিরোনাম সহ
     *     toast.error('সমস্যা', { duration: 8000 });       // ৮ সেকেন্ড থাকবে
     *     toast.info('লোড...', { duration: 0 });           // নিজে সরবে না
     *
     *     const id = toast.info('Uploading...', { duration: 0 });
     *     toast.dismiss(id);                               // নির্দিষ্টটা সরানো
     *     toast.clear();                                   // সব সরানো
     *
     * ═══ PROPS ═══
     * @prop {string} [position='top-right']
     *   top-right | top-left | top-center | bottom-right | bottom-left | bottom-center
     *
     * ═══ NOTES ═══
     * - toast এর আসল তালিকা store ফাইলে থাকে (global state), এই ফাইল শুধু আঁকে।
     * - পেজ বদলাতে `goto()` ব্যবহার করুন। `window.location` দিলে সব toast হারায়।
     * - server কোডে (+page.server.js, load) toast ডাকবেন না, শুধু ব্রাউজারে।
     */

    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { toasts, toast } from '#lib/stores/toast.svelte.js';

    let { position = 'top-right' } = $props();

    const icons = {
        success: '✓',
        error: '✕',
        warning: '!',
        info: 'i'
    };

    // কোন দিক থেকে ঢুকবে
    const flyParams = $derived(
        position.includes('center')
            ? {
                  y: position.startsWith('top') ? -40 : 40,
                  duration: 400
              }
            : {
                  x: position.includes('right') ? 320 : -320,
                  duration: 400
              }
    );
</script>

<div class="toaster {position}">
    {#each toasts as t (t.id)}
        <div
            class="toast {t.type}"
            role={t.type === 'error' ? 'alert' : 'status'}
            animate:flip={{ duration: 200 }}
            transition:fly={flyParams}
        >
            <span class="icon" aria-hidden="true">
                {icons[t.type]}
            </span>

            <div class="body">
                {#if t.title}<strong class="title">
                        {t.title}
                    </strong>{/if}
                <p class="message">{t.message}</p>
            </div>

            <button
                type="button"
                class="close"
                aria-label="Close"
                onclick={() => toast.dismiss(t.id)}
            >
                ✕
            </button>
        </div>
    {/each}
</div>

<style>
    .toaster {
        position: fixed;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: min(360px, calc(100vw - 32px));
        pointer-events: none;
    }

    /* Position */
    .top-right {
        top: 16px;
        right: 16px;
    }
    .top-left {
        top: 16px;
        left: 16px;
    }
    .top-center {
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
    }
    .bottom-right {
        bottom: 16px;
        right: 16px;
    }
    .bottom-left {
        bottom: 16px;
        left: 16px;
    }
    .bottom-center {
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
    }

    .toast {
        --accent: #2563eb;

        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 14px;
        border: 1px solid #404040;
        border-left: 4px solid var(--accent);
        border-radius: 8px;
        background: #262626;
        color: #f5f5f5;
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.35);
        pointer-events: auto;
    }

    /* Types */
    .success {
        --accent: #16a34a;
    }
    .error {
        --accent: #dc2626;
    }
    .warning {
        --accent: #f59e0b;
    }
    .info {
        --accent: #2563eb;
    }

    .icon {
        flex-shrink: 0;
        display: grid;
        place-items: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--accent);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
    }

    .body {
        flex: 1;
        min-width: 0;
    }
    .title {
        display: block;
        font-size: 14px;
        margin-bottom: 2px;
    }
    .message {
        margin: 0;
        font-size: 13px;
        color: #d4d4d4;
        line-height: 1.4;
    }

    .close {
        flex-shrink: 0;
        border: none;
        background: transparent;
        color: #a3a3a3;
        font-size: 12px;
        cursor: pointer;
        padding: 2px;
    }
    .close:hover {
        color: #fff;
    }
</style>
