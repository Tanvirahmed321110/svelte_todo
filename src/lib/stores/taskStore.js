import { writable } from 'svelte/store';

export const tasks = writable([]);
export const editingTask = writable(null);

// For Add Task Function
export function addTask(task) {
    tasks.update((old) => [...old, { ...task, id: Date.now() }]);
}

// Update Task Function
export function updateTask(id, data) {
    tasks.update((old) =>
        old.map((task) =>
            task.id === id ? { ...task, ...data } : task
        )
    );
}

// For Delete Task Function
export function deleteTask(id) {
    tasks.update((old) => old.filter((t) => t.id !== id));
}
