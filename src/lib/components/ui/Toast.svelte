<!-- ✦ ══════════════  ⚡ Toast Component  ══════════════ ✦ -->
<script>
    /**
     * Toast — পুরো অ্যাপে একবার বসান (layout এ)।
     *
     * @prop {string} [position='top-right']
     *   top-right | top-left | top-center | bottom-right | bottom-left | bottom-center
     */
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { toasts, toast } from '$lib/stores/toast.svelte.js';

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
                  duration: 250
              }
            : {
                  x: position.includes('right') ? 320 : -320,
                  duration: 250
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
