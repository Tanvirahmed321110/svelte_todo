// ✦ ══════════════  ⚡ Toast Store  ══════════════ ✦

// all toasts
export const toasts = $state([]);

let counter = 0;

function add({ message, type = 'info', title = '', duration }) {
    const id = ++counter;

    // duration
    const time = duration ?? (type === 'error' ? 5000 : 3000);

    toasts.push({ id, message, type, title });

    // 0 দিলে নিজে থেকে বন্ধ হবে না
    if (time > 0) setTimeout(() => dismiss(id), time);

    return id;
}

function dismiss(id) {
    const i = toasts.findIndex((t) => t.id === id);
    if (i !== -1) toasts.splice(i, 1);
}

export const toast = {
    show: add,
    success: (message, opts = {}) =>
        add({ ...opts, message, type: 'success' }),
    error: (message, opts = {}) =>
        add({ ...opts, message, type: 'error' }),
    warning: (message, opts = {}) =>
        add({ ...opts, message, type: 'warning' }),
    info: (message, opts = {}) =>
        add({ ...opts, message, type: 'info' }),
    dismiss,
    clear: () => toasts.splice(0, toasts.length)
};
