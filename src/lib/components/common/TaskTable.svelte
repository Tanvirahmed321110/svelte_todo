<script>
    import Button from '../ui/Button.svelte';
    import { tasks, deleteTask, editingTask } from '#lib/stores/taskStore.js';
    import { toast } from '#lib/stores/toast.svelte.js';

    function handleDelete(task) {
        deleteTask(task.id);
        toast.success(`"${task.name}"`, {
            title: 'Delete',
            duration: 4000
        });
    }

    // handle edit
    function handleEdit(task) {
        editingTask.set(task);
    }
</script>

<div class="w-full max-w-3xl">
    <h2 class="mb-4 text-2xl font-bold text-neutral-300">Task List</h2>

    <div class="overflow-hidden rounded-xl border border-neutral-700">
        <table class="w-full text-left text-sm">
            <!-- Header -->
            <thead class="bg-neutral-800 text-neutral-300">
                <tr>
                    <th class="px-4 py-3 font-semibold">#</th>
                    <th class="px-4 py-3 font-semibold">Task</th>
                    <th class="px-4 py-3 font-semibold">Desc</th>
                    <th class="px-4 py-3 font-semibold">Status</th>
                    <th class="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
            </thead>

            <!-- Body -->
            <tbody class="divide-y divide-neutral-700">
                {#each $tasks as task, i (task.id)}
                    <tr class="bg-neutral-900 transition hover:bg-neutral-800">
                        <!-- sl num -->
                        <td class="px-4 py-3 text-neutral-400">
                            {i + 1}
                        </td>

                        <!-- Name -->
                        <td class="px-4 py-3 text-neutral-100">
                            {task.name}
                        </td>

                        <!-- Desc -->
                        <td class="px-4 py-3 text-neutral-100">
                            {task.desc}
                        </td>

                        <!-- Status here -->
                        <td class="px-4 py-3">
                            {#if task.status === 'pending'}
                                <span
                                    class="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400"
                                >
                                    ⏳ Pending
                                </span>
                            {:else if task.status === 'done'}
                                <span
                                    class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400"
                                >
                                    ✓ Done
                                </span>
                            {:else if task.status === 'cancel'}
                                <span
                                    class="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400"
                                >
                                    ✕ Cancel
                                </span>
                            {/if}
                        </td>
                        <td class="px-4 py-3 text-center">
                            <!-- Edit -->
                            <Button
                                class="btn"
                                size="sm"
                                variant="info"
                                onclick={() => handleEdit(task)}
                            >
                                ✏️ Edit
                            </Button>

                            <!-- Button  -->
                            <Button
                                class=" btn"
                                size="sm"
                                variant="danger"
                                onclick={() => handleDelete(task)}
                            >
                                🗑️Delete
                            </Button>
                        </td>
                    </tr>
                {:else}
                    <tr class="bg-neutral-900">
                        <td colspan="5" class="px-4 py-10 text-center">
                            <div class="flex flex-col items-center gap-2">
                                <span class="text-4xl opacity-60">📋</span>
                                <p class="font-medium text-neutral-400">কোনো Task নেই</p>
                                <p class="text-xs text-neutral-500">
                                    বাঁ পাশের ফর্ম থেকে নতুন Task যোগ করুন
                                </p>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
