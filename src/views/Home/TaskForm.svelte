<script>
    import Input from '#lib/components/ui/Input.svelte';
    import { Button } from '../../lib';
    import TaskTable from '../../lib/components/common/TaskTable.svelte';
    import { toast } from '#lib/stores/toast.svelte.js';

    // store import
    import { tasks, addTask } from '#lib/stores/taskStore.js';

    // form state
    let taskName = $state('');
    let taskDesc = $state('');
    let taskStatus = $state('pending');

    let nameError = $state('');
    let descError = $state('');

    // form submit handler
    function handleSubmit(e) {
        e.preventDefault();

        // check name
        const name = taskName.trim();
        if (!name) {
            nameError = 'Task Name দিতে হবে';
            return;
        }
        nameError = '';

        // check desc
        const desc = taskDesc.trim();
        if (!desc) {
            descError = 'Task Desc দিতে হবে';
            return;
        }

        descError = '';

        // add task to store
        addTask({
            name: taskName,
            desc: taskDesc,
            status: taskStatus
        });

        // toast show
        toast.success(`"${name}" Successfully Added`, {
            title: 'Added',
            duration: 5000
        });

        // Data check
        console.log('Task Name:', taskName);
        console.log('Desc:', taskDesc);
        console.log('Status:', taskStatus);

        // Form clear
        taskName = '';
        taskStatus = 'pending';
        taskDesc = '';
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
                            <option value="pending">
                                ⏳ Pending
                            </option>
                            <option value="done">✓ Done</option>
                            <option value="cancel">✕ Cancel</option>
                        </select>
                    </div>

                    <!--========== Submit Button Here =========-->
                    <div>
                        <Button
                            fullWidth="1"
                            type="submit"
                            title="click here"
                        >
                            Add Task
                        </Button>
                    </div>
                </div>
            </form>
        </div>

        <!--||=========  Table Here  =========|| -->
        <TaskTable />
    </div>
</section>

<style>
    form {
        width: 320px;
    }
</style>
