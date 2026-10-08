<div class="w-full max-w-3xl">
    <h2 class="mb-4 text-2xl font-bold text-neutral-300">
        Task List
    </h2>

    <div class="overflow-hidden rounded-xl border border-neutral-700">
        <table class="w-full text-left text-sm">
            <!-- Header -->
            <thead class="bg-neutral-800 text-neutral-300">
                <tr>
                    <th class="px-4 py-3 font-semibold">#</th>
                    <th class="px-4 py-3 font-semibold">Task</th>
                    <th class="px-4 py-3 font-semibold">Status</th>
                    <th class="px-4 py-3 text-right font-semibold">
                        Action
                    </th>
                </tr>
            </thead>

            <!-- Body -->
            <tbody class="divide-y divide-neutral-700">
                <tr
                    class="bg-neutral-900 hover:bg-neutral-800 transition"
                >
                    <td class="px-4 py-3 text-neutral-400">1</td>
                    <td class="px-4 py-3 text-neutral-100">
                        Buy groceries
                    </td>
                    <td class="px-4 py-3">
                        <span
                            class="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400"
                        >
                            ⏳ Pending
                        </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                        <button
                            class="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/30 transition"
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>

                <tr
                    class="bg-neutral-900 hover:bg-neutral-800 transition"
                >
                    <td class="px-4 py-3 text-neutral-400">2</td>
                    <td
                        class="px-4 py-3 text-neutral-100 line-through opacity-60"
                    >
                        Complete project
                    </td>
                    <td class="px-4 py-3">
                        <span
                            class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400"
                        >
                            ✓ Done
                        </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                        <button
                            class="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/30 transition"
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>

                <tr
                    class="bg-neutral-900 hover:bg-neutral-800 transition"
                >
                    <td class="px-4 py-3 text-neutral-400">3</td>
                    <td class="px-4 py-3 text-neutral-100">
                        Read book
                    </td>
                    <td class="px-4 py-3">
                        <span
                            class="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400"
                        >
                            ⏳ Pending
                        </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                        <button
                            class="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/30 transition"
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
