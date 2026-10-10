<!-- ✦ ══════════════  ⚡ Input Component  ══════════════ ✦ -->
<script>
    /**
     * Input — Flexible text input component.
     *
     * Handles text, email, password, number, search, tel, url, date etc.
     * via the `type` prop. Supports label, hint, error, icons and sizes.
     *
     * @example
     * ```svelte
     * <Input label="Name" bind:value={name} />
     * <Input label="Email" type="email" bind:value={email} error={emailError} />
     * <Input label="Search" size="sm" rounded="full" placeholder="Search..." />
     * <Input label="Password" type="password" hint="Min 8 characters" required />
     * ```
     *
     * @prop {string}  [value='']          - Use with bind:value
     * @prop {string}  [type='text']       - text | email | password | number | search | tel | url | date ...
     * @prop {string}  [label='']          - Label shown above the input
     * @prop {string}  [placeholder='']    - Placeholder text
     * @prop {string}  [hint='']           - Small help text below the input
     * @prop {string}  [error='']          - Error message (turns the input red)
     * @prop {string}  [size='md']         - sm | md | lg
     * @prop {string}  [rounded]           - none | sm | md | lg | full
     * @prop {boolean} [fullWidth=true]    - Take full width of container
     * @prop {boolean} [disabled=false]    - Disable the input
     * @prop {boolean} [readonly=false]    - Read-only input
     * @prop {boolean} [required=false]    - Required field (shows *)
     * @prop {string}  [id]                - Auto generated if not given
     * @prop {Snippet} [iconLeft]          - Snippet rendered inside, left side
     * @prop {Snippet} [iconRight]         - Snippet rendered inside, right side
     * @prop {string}  [class='']          - Additional CSS classes (on wrapper)
     */
    let {
        value = $bindable(''),
        type = 'text',
        label = '',
        placeholder = '',
        hint = '',
        error = '',
        size = 'md',
        rounded,
        fullWidth = true,
        disabled = false,
        readonly = false,
        required = false,
        id,
        iconLeft,
        iconRight,
        class: className = '',
        ...rest
    } = $props();

    const uid = $props.id();
    const inputId = $derived(id ?? `input-${uid}`);
    const messageId = $derived(`${inputId}-msg`);

    const hasError = $derived(!!error);
</script>

<!-- ✦ ══════════════ ⚡ Element Here  ══════════════ ✦ -->
<div
    class="field {size} {rounded ? `r-${rounded}` : ''} {className}"
    class:full={fullWidth}
    class:has-error={hasError}
    class:is-disabled={disabled}
>
    {#if label}
        <label class="label" for={inputId}>
            {label}
            {#if required}<span class="req" aria-hidden="true">
                    *
                </span>{/if}
        </label>
    {/if}

    <div class="box">
        {#if iconLeft}
            <span class="icon left">{@render iconLeft()}</span>
        {/if}

        <input
            id={inputId}
            {type}
            {placeholder}
            {disabled}
            {readonly}
            {required}
            bind:value
            class="input"
            class:pad-left={!!iconLeft}
            class:pad-right={!!iconRight}
            aria-invalid={hasError || undefined}
            aria-describedby={error || hint ? messageId : undefined}
            {...rest}
        />

        {#if iconRight}
            <span class="icon right">{@render iconRight()}</span>
        {/if}
    </div>

    {#if error}
        <small class="message error" id={messageId} role="alert">
            {error}
        </small>
    {:else if hint}
        <small class="message hint" id={messageId}>{hint}</small>
    {/if}
</div>

<!-- ✦ ══════════════ 🎨 Styles Here  ══════════════ ✦ -->
<style>
    .field {
        --border: #d1d5db;
        --border-hover: #9ca3af;
        --focus: var(--color-primary, #461901);
        --bg: #ffffff;
        --fg: #111827;

        display: inline-flex;
        flex-direction: column;
        gap: 6px;
        font-family: inherit;
    }

    /* Width */
    .full {
        display: flex;
        width: 100%;
    }

    /* Label */
    .label {
        font-size: 13px;
        font-weight: 500;
        color: #ccc;
    }
    .req {
        color: #dc2626;
        margin-left: 2px;
    }

    /* Box (input + icons এর বাইরের অংশ) */
    .box {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--border);
        border-radius: var(--radius, 6px);
        background: var(--bg);
        color: var(--fg);
        font-family: inherit;
        line-height: 1.2;
        transition:
            border-color 0.15s,
            box-shadow 0.15s;
    }
    .input::placeholder {
        color: #9ca3af;
    }
    .input:hover:not(:disabled) {
        border-color: var(--border-hover);
    }
    .input:focus {
        outline: none;
        border-color: var(--focus);
        box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--focus) 20%, transparent);
    }

    /* Icons */
    .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-flex;
        color: #6b7280;
        pointer-events: none;
    }
    .icon.left {
        left: 12px;
    }
    .icon.right {
        right: 12px;
    }
    .pad-left {
        padding-left: 36px !important;
    }
    .pad-right {
        padding-right: 36px !important;
    }

    /* Sizes (Button এর সাথে একই radius) */
    .sm {
        --radius: 4px;
    }
    .sm .input {
        padding: 4px 10px;
        font-size: 13px;
    }
    .md {
        --radius: 6px;
    }
    .md .input {
        padding: 9px 12px;
        font-size: 14px;
    }
    .lg {
        --radius: 10px;
    }
    .lg .input {
        padding: 12px 16px;
        font-size: 16px;
    }

    /* Rounded overrides (size ক্লাসের পরে থাকতে হবে) */
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

    /* Messages */
    .message {
        font-size: 12px;
    }
    .hint {
        color: #6b7280;
    }
    .error {
        color: #dc2626;
    }

    /* Error state */
    .has-error {
        --border: #dc2626;
        --border-hover: #dc2626;
        --focus: #dc2626;
    }

    /* Disabled */
    .is-disabled {
        opacity: 0.55;
    }
    .is-disabled .input {
        background: #f3f4f6;
        cursor: not-allowed;
    }
</style>
