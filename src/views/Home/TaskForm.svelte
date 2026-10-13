<script>
    import Input from '#lib/components/ui/Input.svelte';
    import { Button } from '../../lib';
    import TaskTable from '../../lib/components/common/TaskTable.svelte';
    import { toast } from '#lib/stores/toast.svelte.js';

    // store import
    import { addTask, editingTask, updateTask } from '#lib/stores/taskStore.js';
    import { products } from '#lib/data/products.js';
    import ProductCard from '#lib/components/common/ProductCard.svelte';
    import QuickViewModal from '../../lib/components/common/QuickViewModal.svelte';

    // form state
    let taskName = $state('');
    let taskDesc = $state('');
    let taskStatus = $state('pending');

    let nameError = $state('');
    let descError = $state('');

    // কোন task এডিট হচ্ছে
    let editId = $state(null);

    // Edit চাপলে ফর্মে ডেটা বসাও, null হলে ফর্ম রিসেট
    $effect(() => {
        const task = $editingTask;
        if (task) {
            editId = task.id;
            taskName = task.name;
            taskDesc = task.desc;
            taskStatus = task.status;
            nameError = '';
            descError = '';
        } else {
            editId = null;
            taskName = '';
            taskDesc = '';
            taskStatus = 'pending';
        }
    });

    // Form clear
    function resetForm() {
        editingTask.set(null);
        editId = null;
        taskName = '';
        taskDesc = '';
        taskStatus = 'pending';
        nameError = '';
        descError = '';
    }

    // form submit handler
    function handleSubmit(e) {
        e.preventDefault();

        const name = taskName.trim();
        if (!name) {
            nameError = 'Task Name দিতে হবে';
            return;
        }
        nameError = '';

        const desc = taskDesc.trim();
        if (!desc) {
            descError = 'Task Desc দিতে হবে';
            return;
        }
        descError = '';

        if (editId) {
            updateTask(editId, { name, desc, status: taskStatus });
            toast.success(`"${name}" Successfully Updated`, {
                title: 'Updated',
                duration: 5000
            });
        } else {
            addTask({ name, desc, status: taskStatus });
            toast.success(`"${name}" Successfully Added`, {
                title: 'Added',
                duration: 5000
            });
        }

        resetForm();
    }

    // For QuickView
    let open = $state(false);
    let selected = $state(null);

    function handleQuickView(product) {
        selected = product;
        open = true;
    }
</script>

<section class="section-gap">
    <div class="flex justify-between gap-12">
        <div>
            <form onsubmit={handleSubmit} class="w-fit rounded-xl border border-neutral-600 p-3">
                <h3 class="font-bold">{editId ? 'Edit Task' : 'Add Task'}</h3>
                <div class="mt-4 flex flex-col gap-4">
                    <div>
                        <Input
                            label={'Task Name'}
                            error={nameError}
                            bind:value={taskName}
                            placeholder="Enter Task Name..."
                        />
                    </div>

                    <div>
                        <Input
                            label={'Desc'}
                            bind:value={taskDesc}
                            placeholder="Description"
                            error={descError}
                        />
                    </div>

                    <div>
                        <select
                            bind:value={taskStatus}
                            class="w-full cursor-pointer appearance-none rounded-lg border
                                 border-neutral-700 bg-neutral-800 px-3 py-2 pr-10 text-sm text-neutral-100 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            style="color-scheme: dark;"
                        >
                            <option value="pending">⏳ Pending</option>
                            <option value="done">✓ Done</option>
                            <option value="cancel">✕ Cancel</option>
                        </select>
                    </div>

                    <!--========== Submit Button Here =========-->
                    <div class="flex flex-col gap-2">
                        <Button fullWidth="1" type="submit" title="click here">
                            {editId ? 'Update Task' : 'Add Task'}
                        </Button>

                        {#if editId}
                            <Button
                                fullWidth="1"
                                variant="danger"
                                type="button"
                                onclick={resetForm}
                            >
                                Cancel
                            </Button>
                        {/if}
                    </div>
                </div>
            </form>
        </div>

        <!--||=========  Table Here  =========|| -->
        <TaskTable />
    </div>
</section>

<!-- Products -->
<section class="section-gap mb-8">
    <div class="">
        <h2 class="mb-4 text-xl font-bold">Products</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {#each products.slice(0, 4) as product (product.id)}
                <ProductCard {product} onquickview={handleQuickView} />
            {/each}
        </div>

        <div class="mt-5"><a href="/create_product">Create New</a></div>
    </div>

    <QuickViewModal bind:open product={selected} />
</section>

<style>
    form {
        width: 320px;
    }
</style>
