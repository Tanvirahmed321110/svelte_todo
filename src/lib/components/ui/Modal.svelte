<!-- src/lib/components/ui/Modal.svelte -->
<!-- ✦ ══════════════ 🪟 Modal Component ══════════════ ✦ -->
<script>
    /**
     * Modal — Accessible, reusable dialog component.
     *
     * Features:
     * - Backdrop click to close (configurable)
     * - ESC key to close
     * - Focus trap (keyboard stays inside)
     * - Body scroll lock
     * - 4 sizes: sm | md | lg | full
     * - Custom header/footer snippets
     * - Portal-free (renders in place, but fixed position)
     *
     * @example
     * ```svelte
     * <Modal bind:open title="Edit Profile">
     *     <p>Content here</p>
     *     {#snippet footer()}
     *         <Button onclick={save}>Save</Button>
     *     {/snippet}
     * </Modal>
     * ```
     *
     * @prop {boolean}  [open=false]       - Two-way bindable open state
     * @prop {string}   [title='']         - Modal heading
     * @prop {string}   [size='md']        - sm | md | lg | full
     * @prop {boolean}  [closeOnBackdrop=true] - Click outside to close
     * @prop {boolean}  [closeOnEsc=true]  - ESC key to close
     * @prop {boolean}  [showClose=true]   - Show X button
     * @prop {string}   [className='']     - Extra CSS classes
     * @prop {Snippet}  [header]           - Custom header (overrides title)
     * @prop {Snippet}  [footer]           - Footer content
     * @prop {Snippet}  [children]         - Main content
     */

    let {
        open = $bindable(false),
        title = '',
        size = 'md',
        closeOnBackdrop = true,
        closeOnEsc = true,
        showClose = true,
        class: className = '',
        header,
        footer,
        children,
        onclose
    } = $props();

    let dialogEl = $state(null);
    let previousActive = $state(null);

    // ✦ Close helper
    function close() {
        open = false;
        onclose?.();
    }

    // ✦ Backdrop click
    function handleBackdrop(e) {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            close();
        }
    }

    // ✦ ESC key handler
    function handleKeydown(e) {
        if (closeOnEsc && e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
        }

        // Focus trap — Tab key
        if (e.key === 'Tab' && dialogEl) {
            const focusables = dialogEl.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    // ✦ Focus + scroll lock when open
    $effect(() => {
        if (open) {
            previousActive = document.activeElement;
            document.body.style.overflow = 'hidden';

            // Focus the dialog
            queueMicrotask(() => {
                if (dialogEl) {
                    const firstFocusable = dialogEl.querySelector(
                        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                    );
                    firstFocusable?.focus() || dialogEl.focus();
                }
            });
        } else {
            document.body.style.overflow = '';
            if (previousActive instanceof HTMLElement) {
                previousActive.focus();
            }
        }

        return () => {
            document.body.style.overflow = '';
        };
    });
</script>

<!-- ✦ ══════════════ 🪟 Modal Markup ══════════════ ✦ -->
{#if open}
    <div
        class="modal-backdrop"
        role="presentation"
        onclick={handleBackdrop}
        onkeydown={handleKeydown}
    >
        <div
            bind:this={dialogEl}
            class="modal {size} {className}"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabindex="-1"
        >
            <!-- Header -->
            {#if header}
                <div class="modal-header">
                    {@render header()}
                    {#if showClose}
                        <button
                            class="modal-close"
                            type="button"
                            aria-label="বন্ধ করুন"
                            onclick={close}
                        >
                            ✕
                        </button>
                    {/if}
                </div>
            {:else if title || showClose}
                <div class="modal-header">
                    {#if title}
                        <h2 id="modal-title" class="modal-title">{title}</h2>
                    {/if}
                    {#if showClose}
                        <button
                            class="modal-close"
                            type="button"
                            aria-label="বন্ধ করুন"
                            onclick={close}
                        >
                            ✕
                        </button>
                    {/if}
                </div>
            {/if}

            <!-- Body -->
            <div class="modal-body">
                {@render children?.()}
            </div>

            <!-- Footer -->
            {#if footer}
                <div class="modal-footer">
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}

<!-- ✦ ══════════════ 🎨 Styles ══════════════ ✦ -->
<style>
    /* Backdrop */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Modal box */
    .modal {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: calc(100vh - 2rem);
        background: var(--color-surface, #ffffff);
        border-radius: 12px;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        animation: slideUp 0.2s ease;
        overflow: hidden;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .modal:focus {
        outline: none;
    }

    /* Sizes */
    .sm {
        max-width: 400px;
    }
    .md {
        max-width: 560px;
    }
    .lg {
        max-width: 800px;
    }
    .full {
        max-width: 100%;
        height: calc(100vh - 2rem);
        border-radius: 0;
    }

    /* Header */
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        flex-shrink: 0;
    }

    .modal-title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }

    .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: #6b7280;
        font-size: 1rem;
        cursor: pointer;
        transition:
            background 0.15s,
            color 0.15s;
    }

    .modal-close:hover {
        background: #f3f4f6;
        color: #111827;
    }

    .modal-close:focus-visible {
        outline: 2px solid var(--color-primary, #461901);
        outline-offset: 2px;
    }

    /* Body */
    .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
    }

    /* Footer */
    .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid #e5e7eb;
        background: #f9fafb;
        flex-shrink: 0;
    }
</style>
