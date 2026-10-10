<!-- ✦ ══════════════  ⚡ Button Component  ══════════════ ✦ -->
<script>
    /**
     * Button — Flexible polymorphic button/link component.
     *
     * Renders as `<button>` by default, or `<a>` when `href` is provided.
     * Supports variants, sizes, icons, loading state, and theming.
     *
     * @example
     * ```svelte
     * <Button>Save</Button>
     * <Button variant="outline" size="lg">Large</Button>
     * <Button href="/about">About</Button>
     * <Button loading>Processing...</Button>
     * <Button iconLeft={saveIcon} variant="primary">Save</Button>
     * ```
     *
     * @prop {string}  [variant='primary']   - primary | secondary | danger | success | outline | ghost
     * @prop {string}  [size='md']           - sm | md | lg
     * @prop {string}  [type='button']       - button | submit | reset
     * @prop {boolean} [fullWidth=false]     - Take full width of container
     * @prop {boolean} [disabled=false]      - Disable the button
     * @prop {boolean} [loading=false]       - Show spinner and hide content
     * @prop {string}  [rounded]             - none | sm | md | lg | full
     * @prop {string}  [href]                - If set, renders as `<a>`
     * @prop {Snippet} [iconLeft]            - Snippet rendered before children
     * @prop {Snippet} [iconRight]           - Snippet rendered after children
     * @prop {string}  [className='']        - Additional CSS classes
     * @prop {Snippet} [children]            - Main button content
     */
    let {
        variant = 'primary',
        size = 'md',
        type = 'button',
        fullWidth = false,
        disabled = false,
        loading = false,
        rounded,
        href,
        iconLeft,
        iconRight,
        class: className = '',
        children,
        ...rest
    } = $props();

    const isDisabled = $derived(disabled || loading);
    const isLink = $derived(!!href);
</script>

<!-- ✦ ══════════════ ⚡ Element Here  ══════════════ ✦ -->
<svelte:element
    this={isLink ? 'a' : 'button'}
    type={isLink ? undefined : type}
    href={isLink && !isDisabled ? href : undefined}
    disabled={isLink ? undefined : isDisabled}
    aria-disabled={isDisabled || undefined}
    aria-busy={loading || undefined}
    class="btn {variant} {size} {rounded
        ? `r-${rounded}`
        : ''} {className}"
    class:full={fullWidth}
    class:is-loading={loading}
    class:is-disabled={isDisabled}
    {...rest}
>
    {#if loading}
        <span class="spinner" aria-hidden="true"></span>
    {/if}

    <span class="content">
        {#if iconLeft}
            <span class="icon">{@render iconLeft()}</span>
        {/if}
        {@render children?.()}
        {#if iconRight}
            <span class="icon">{@render iconRight()}</span>
        {/if}
    </span>
</svelte:element>

<!-- ✦ ══════════════ 🎨 Styles Here  ══════════════ ✦ -->
<style>
    .btn {
        /* Default primary theme */
        --bg: var(--color-primary, #461901);
        --bg-hover: var(--color-primary-hover, #5c2102);
        --bg-active: var(--color-primary-active, #331200);
        --fg: var(--color-primary-foreground, #ffffff);
        --border: transparent;

        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        box-sizing: border-box;
        border: 1px solid var(--border);
        border-radius: var(--radius, 6px);
        background: var(--bg);
        color: var(--fg);
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        transition:
            background 0.15s,
            border-color 0.15s,
            transform 0.05s;
    }

    .btn:hover:not(:disabled) {
        background: var(--bg-hover);
    }
    .btn:active:not(:disabled) {
        background: var(--bg-active);
        transform: translateY(1px);
    }
    .btn:focus-visible {
        outline: 2px solid var(--color-primary, #461901);
        outline-offset: 2px;
    }

    .content {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    .icon {
        display: inline-flex;
    }

    /* Width */
    .full {
        width: 100%;
    }

    /* Sizes */
    .sm {
        --radius: 4px;
        padding: 4px 10px;
        font-size: 13px;
    }
    .md {
        --radius: 6px;
        padding: 9px 16px;
        font-size: 14px;
    }
    .lg {
        --radius: 10px;
        padding: 12px 24px;
        font-size: 16px;
    }

    /* Variants — সব primary theme এ based */
    .secondary {
        --bg: #e5e7eb;
        --bg-hover: #d1d5db;
        --bg-active: #9ca3af;
        --fg: #111827;
    }
    .danger {
        --bg: #dc2626;
        --bg-hover: #b91c1c;
        --bg-active: #991b1b;
        --fg: #ffffff;
    }
    .success {
        --bg: #16a34a;
        --bg-hover: #15803d;
        --bg-active: #166534;
        --fg: #ffffff;
    }
    .outline {
        --bg: transparent;
        --bg-hover: var(--color-primary-tint, #fdf3ed);
        --bg-active: #f8e0d0;
        --fg: var(--color-primary, #461901);
        --border: var(--color-primary, #461901);
    }
    .ghost {
        --bg: transparent;
        --bg-hover: var(--color-primary-tint, #fdf3ed);
        --bg-active: #f8e0d0;
        --fg: var(--color-primary, #461901);
    }

    /* Rounded overrides */
    .r-none {
        --radius: 0;
    }
    .r-sm {
        --radius: 4px;
    }
    .r-md {
        --radius: 6px;
    }
    .r-lg {
        --radius: 12px;
    }
    .r-full {
        --radius: 9999px;
    }

    /* Disabled / loading */
    .is-disabled {
        opacity: 0.55;
        cursor: not-allowed;
        pointer-events: none;
    }
    .is-loading .content {
        visibility: hidden;
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
</style>
