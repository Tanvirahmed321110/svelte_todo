<script>
    import Input from '#lib/components/ui/Input.svelte';
    import Button from '#lib/components/ui/Button.svelte';
    import { required, minLen } from '#lib/utils/validation.js';
    import { toast } from '#lib/stores/toast.svelte.js';
    import { addProduct } from '#lib/stores/productStore.svelte.js';

    let name = $state('');
    let price = $state('');
    let desc = $state('');
    let imageUrl = $state('');

    let nameError = $state('');
    let priceError = $state('');
    let descError = $state('');
    let imageUrlError = $state('');

    function handleSubmit(e) {
        e.preventDefault();

        // Validation
        nameError = required(name, 'Name দিতে হবে') || minLen(name, 3, 'কমপক্ষে ৩ অক্ষর');
        priceError = required(price, 'Price দিতে হবে');
        descError = required(desc, 'Desc দিতে হবে');
        imageUrlError = required(imageUrl, 'Image URL দিতে হবে');

        if (nameError || priceError || descError || imageUrlError) return;
        const product = {
            name: name.trim(),
            price,
            desc: desc.trim(),
            image: imageUrl.trim()
        };

        // ✅ সব valid — এখন কাজ করুন
        console.log(product);

        const crated = addProduct(product);

        // ✅ Success Toast
        toast.success(`"${product.name}" successfully added`, {
            title: 'Added'
        });

        // Reset
        name = '';
        price = '';
        desc = '';
        imageUrl = '';
    }
</script>

<section>
    <div class="container mt-8 flex items-center justify-center">
        <form onsubmit={handleSubmit} class="flex flex-col gap-4">
            <div class="text-2xl font-bold">Create New Product</div>

            <!-- For Name -->
            <Input
                label={'Name'}
                placeholder={'Product name'}
                bind:value={name}
                error={nameError}
            />
            <!-- For Name -->
            <Input
                label={'price'}
                placeholder={'price'}
                type={'number'}
                bind:value={price}
                error={priceError}
            />
            <!-- For Name -->
            <Input
                label={'Desc'}
                placeholder={'Product Desc'}
                bind:value={desc}
                error={descError}
            />
            <!-- For Image -->
            <Input
                label={'Imasge Url'}
                placeholder={'Image Url'}
                bind:value={imageUrl}
                error={imageUrlError}
            />
            <Button type={'submit'}>POST</Button>
        </form>
    </div>
</section>

<style>
    form {
        max-width: 420px;
        width: 100%;
        padding: 16px;
        border: 1px solid #dddddd70;
        border-radius: 10px;
    }
    form :global(.input) {
        background: #ddd; /* লাল / আপনার primary color */
    }
</style>
