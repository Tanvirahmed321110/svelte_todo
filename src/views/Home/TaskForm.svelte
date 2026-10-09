<script>
    import Input from '#lib/components/ui/Input.svelte';
    import { Button } from '../../lib';
    import TaskTable from '../../lib/components/common/TaskTable.svelte';

    // form state
    let taskName = $state('');
    let taskStatus = $state('pending');

    // form submit handler
    function handleSubmit(e) {
        e.preventDefault();

        // Data check
        console.log('Task Name:', taskName);
        console.log('Status:', taskStatus);

        // Form clear
        taskName = '';
        taskStatus = 'pending';
    }
</script>

<section class="section-gap">
    <div class="flex justify-between gap-12">
        <div>
            <form
                onsubmit={handleSubmit}
                class="w-fit rounded-xl border border-neutral-600 p-3"
            >
                <h3 class="font-bold">Add Task</h3>
                <div class="mt-4 flex flex-col gap-4">
                    <div>
                        <Input
                            bind:value={taskName}
                            placeholder="Enter Task Name..."
                        />
                    </div>
                    <div>
                        <select
                            bind:value={taskStatus}
                            class="w-full cursor-pointer appearance-none rounded-lg border
                                 border-neutral-700 bg-neutral-800 px-3 py-2 pr-10 text-sm text-neutral-100 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            style="color-scheme: dark;"
                        >
                            <option value="pending">
                                ⏳ Pending
                            </option>
                            <option value="done">✓ Done</option>
                            <option value="cancel">✕ Cancel</option>
                        </select>
                    </div>

                    <!--========== Submit Button Here =========-->
                    <div>
                        <Button fullWidth="1">Add Task</Button>
                    </div>
                </div>
            </form>
        </div>

        <!--||=========  Table Here  =========|| -->
        <TaskTable />
    </div>
</section>
