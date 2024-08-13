// src/api/axiosInstance.ts

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const newsAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_NEWS_API_BASE_URL,
});

export const nytAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_NYT_API_BASE_URL,
});
export const guardianAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GUARDIAN_API_BASE_URL,
});

newsAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.params = {
        ...config.params,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
    };
    return config;
});
nytAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.params = {
        ...config.params,
        'api-key': process.env.REACT_APP_NYT_API_KEY,
    };
    return config;
});
guardianAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.params = {
        ...config.params,
        'api-key': process.env.REACT_APP_GUARDIAN_API_KEY,
    };
    return config;
});
