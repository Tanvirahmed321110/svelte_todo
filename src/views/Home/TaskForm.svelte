<script>
    import Input from '#lib/components/ui/Input.svelte';
    import SubmitButton from '#lib/components/ui/SubmitButton.svelte';
    import TaskTable from '../../lib/components/common/TaskTable.svelte';
</script>

<section class="section-gap">
    <div class="flex gap-12 justify-between">
        <div>
            <form
                class="border p-3 w-fit rounded-xl border-neutral-600"
            >
                <h3 class="font-bold">Add Task</h3>
                <div class="mt-4  flex flex-col gap-4">
                    <div>
                        <Input placeholder="Enter Task Name..." />
                    </div>
                    <div>
                        <select
                                class="w-full cursor-pointer appearance-none rounded-lg border
                                 border-neutral-700 bg-neutral-800 px-3 py-2 pr-10 text-sm text-neutral-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                style="color-scheme: dark;"
                            >
                                    <option value="pending">⏳ Pending</option>
                                <option value="done">✓ Done</option>
                                <option value="cancel">✕ Cancel</option>
                            </select>
                    </div>
                    <div>
                        <SubmitButton fullWidth><p>Add Now </p></SubmitButton>
                    </div>
                </div>
            </form>
        </div>

        <TaskTable />
    </div>
</section>
