import { PUBLIC_COUNTRY_API_URL, PUBLIC_WEATHER_API_URL } from '$env/static/public';

export const SITE_URL = 'https://yourdomain.com';
export const SITE_NAME = 'Tourgull';
export const SITE_TAGLINE = 'Tour, Flight, Hotel & More';
export const SITE_DESCRIPTION =
    'বাংলাদেশের সেরা ট্রাভেল মার্কেটপ্লেস — ট্যুর, ফ্লাইট, হোটেল, গাড়ি, খাবার সব এক জায়গায়';

// For API
export const config = {
    country: { baseUrl: PUBLIC_COUNTRY_API_URL },
    weather: { baseUrl: PUBLIC_WEATHER_API_URL }
};
