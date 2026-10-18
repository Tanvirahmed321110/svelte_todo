import { defineEnvVars } from '@sveltejs/kit/env';

// URL ঠিক আছে কিনা যাচাই করার ছোট ফাংশন
const url = (name) => (value) => {
    if (!value) throw new Error(`${name} is required in .env`);
    try {
        new URL(value);
    } catch {
        throw new Error(`${name} must be a valid URL`);
    }
    return value.replace(/\/$/, '');
};

export const variables = defineEnvVars({
    PUBLIC_COUNTRY_API_URL: {
        public: true,
        description: 'Countries API base URL',
        schema: url('PUBLIC_COUNTRY_API_URL')
    },
    PUBLIC_WEATHER_API_URL: {
        public: true,
        description: 'Weather API base URL',
        schema: url('PUBLIC_WEATHER_API_URL')
    }
});
