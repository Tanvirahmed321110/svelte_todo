import { defineEnvVars } from '@sveltejs/kit/env';

const required = (value) => {
    if (!value) throw new Error('This variable is required in .env');
    return value;
};

export const variables = defineEnvVars({
    PUBLIC_COUNTRY_API_URL: { public: true, schema: required },
    PUBLIC_WEATHER_API_URL: { public: true, schema: required }
});
