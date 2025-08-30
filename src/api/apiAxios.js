import axios from 'axios';

const api = axios.create({
    baseURL: "http://194.87.133.14:8080/",
    withCredentials: true,
});


const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNjUxMSwidXNlcl9uYW1lIjoi0JLQsNGB0LjQu9C40Lkg0KLQtdGA0LrQuNC9INGC0LXRgdGCICIsInVzZXJfcGhvbmUiOiI3Nzc3Nzc3Nzc3NyIsInVzZXJfcGF5bWVudHR5cGUiOiLQktGL0L_Qu9Cw0YLQsCIsInVzZXJfYW1vdW50Ijo1MDAwLCJ1c2VyX2JhbGFuY2UiOjcwMDAsInVzZXJfaW5uIjoiOTEwMjMzMzY0NTMiLCJ1c2VyX2FjY291bnRJRCI6IjE2NTExIiwiZXhwIjoxNzU2NTg3NDAxLCJpYXQiOjE3NTY1MDEwMDF9.6e02RmpSQuzO6T_kM-XBdVkNL-DSnKE6jyczNomoPno";

api.interceptors.request.use((config) => {
    if (TEST_TOKEN) {
        config.headers.Authorization = `Bearer ${TEST_TOKEN}`;
    }
    return config;
});

export default api;
