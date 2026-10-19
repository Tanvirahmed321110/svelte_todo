import { config } from '#lib/config.js';

let cache = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // ১ ঘণ্টা

export async function getAllCountries() {
    // cache থাকলে instant return
    if (cache && Date.now() - cacheTime < TTL) {
        return cache;
    }

    const res = await fetch(`${config.country.baseUrl}/countries`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const json = await res.json();
    cache = json.data;
    cacheTime = Date.now();
    return cache;
}
