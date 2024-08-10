// src/api/axiosInstance.ts

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_NEWS_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                apiKey: process.env.REACT_APP_NEWS_API_KEY,
            };
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
