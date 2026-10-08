<script>
    let {type='submit', fullWidth = false,children} = $props()
</script>

<button {type} class="{fullWidth ? 'w-full': ''}">{@render children?.()}</button>

<style>
    button {
        padding: 8px 12px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        outline: none;
        background-color: #373737;
        border: 1px solid #232222;
        cursor: pointer;
        font-weight: 600;
        transition: 0.2s;
    }
    button:hover {
        transform: translateY(-2px);
    }
</style>
