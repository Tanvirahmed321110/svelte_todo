import { getAllCountries } from '#lib/services/country.service.js';

export async function load() {
    try {
        const countries = await getAllCountries();

        return {
            countries: countries || []
        };
    } catch (error) {
        console.error('Failed to load countries', error);
        return { countries: [] };
    }
}
