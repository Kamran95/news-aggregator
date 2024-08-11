import { useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ServiceProviders } from '../constants';
import { newsAxiosInstance, nytAxiosInstance, guardianAxiosInstance } from '../api';

type UseAxiosReturn<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
};

export const useAxios = <T>(url: string, type: ServiceProviders, options: AxiosRequestConfig = {}): UseAxiosReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let response: AxiosResponse<T>;
            switch (type) {
                case ServiceProviders.NEWS:
                    response = await newsAxiosInstance.get(url, options);
                    break;
                case ServiceProviders.GUARDIANS:
                    response = await guardianAxiosInstance.get(url, options);
                    break;

                default:
                    response = await nytAxiosInstance.get(url, options);
                    break;
            }
            setData(response.data);
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.response ? (axiosError.response.data as string) : axiosError.message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    return { data, loading, error, fetchData };
};
