export const ENV = {
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8983/api",
    REQUEST_TIMEOUT: Number(process.env.EXPO_PUBLIC_REQUEST_TIMEOUT) || 10000,
};

