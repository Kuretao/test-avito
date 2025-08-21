import axios from 'axios';

const api = axios.create({
    baseURL: "http://194.87.133.14:8080/",
    withCredentials: true,
});


const TEST_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiMmJoZWxwLnJ1IiwiaWF0IjoxNzU1NjkwNzUzLCJuYmYiOjE3NTU2OTA3NTMsImV4cCI6MTc1NjI5NTU1MywidXNlcl9pZCI6MTY1MTF9.zo6ShLvIhyoE1bExBD4VIPKVgApY48yyTKmXu_acLtM";

api.interceptors.request.use((config) => {
    if (TEST_TOKEN) {
        config.headers.Authorization = `Bearer ${TEST_TOKEN}`;
    }
    return config;
});

export default api;
