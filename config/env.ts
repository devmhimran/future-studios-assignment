export const ENV = {
  API_URL: process.env.API_URL,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

if (!process.env.API_URL) {
  console.warn(
    '⚠️ Warning: API_URL is not explicitly set. Falling back to localhost.',
  );
}
