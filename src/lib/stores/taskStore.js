import { writable } from 'svelte/store';

export const tasks = writable([]);

// For Add Task Function
export function addTask(task) {
    tasks.update((old) => [...old, { ...task, id: Date.now() }]);
}

// For Delete Task Function
export function deleteTask(id) {
    tasks.update((old) => old.filter((t) => t.id !== id));
}
