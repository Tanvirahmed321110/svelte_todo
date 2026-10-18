import { config } from '#lib/config.js';

// সব দেশের লিস্ট আনার ফাংশন
export async function getAllCountries() {
    try {
        // সরাসরি fetch ব্যবহার করছি
        const response = await fetch(`${config.country.baseUrl}/countries`);

        // এরর চেক করা (apiClient-এ যেমন ছিল)
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        // ডেটাকে JSON-এ কনভার্ট করা
        const data = await response.json();

        // countriesnow API-তে ডেটা থাকে data.data অবজেক্টের ভেতর
        return data.data;
    } catch (error) {
        console.error('দেশ আনার সময় সমস্যা হয়েছে:', error);
        throw error; // SvelteKit-এর +error.svelte পেজে পাঠানোর জন্য
    }
}
