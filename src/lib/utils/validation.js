// //  For Required Field
// export function required(value, message) {
//     if (!value || !value.trim()) {
//         return message;
//     }
//     return '';
// }

// // For  Min Length
// export function minLen(value, len, message) {
//     return value && value.length < len ? (message ?? `Minimum  ${len} Characters`) : '';
// }

// // For Max Length
// export function maxLen(value, len, message) {
//     return value && value.length > len ? (message ?? `Maximum ${len} characters`) : '';
// }

// lib/utils/validation.js

// Required
export function required(value, message = 'This field is required') {
    const str = value == null ? '' : String(value);
    return !str.trim() ? message : '';
}

// Min Length
export function minLen(value, len, message = `Minimum ${len} characters`) {
    const str = value == null ? '' : String(value);
    return str && str.length < len ? message : '';
}

// Max Length
export function maxLen(value, len, message = `Maximum ${len} characters`) {
    const str = value == null ? '' : String(value);
    return str && str.length > len ? message : '';
}
