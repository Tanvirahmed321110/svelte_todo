<script>
    let { placeholder = 'Enter Text...', type = 'text' } = $props();
</script>

<input {type} {placeholder} />

<style>
    input {
        padding: 8px 12px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        outline: none;
        background-color: #373737;
        border: 1px solid #232222;
        width: 300px;
    }
</style>
