import { useState, useCallback, useRef } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ServiceProviders } from '../constants';
import { newsAxiosInstance, nytAxiosInstance, guardianAxiosInstance } from '../api';
import { enqueueSnackbar } from 'notistack';

type UseAxiosReturn<T> = {
    data: T | null;
    loading: boolean;
    fetchData: (params?: AxiosRequestConfig) => Promise<void>;
    showError?: boolean;
};
export const useAxios = <T>(
    url: string,
    type: ServiceProviders,
    options: AxiosRequestConfig = {},
    showError = false,
): UseAxiosReturn<T> => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(
        async (params: AxiosRequestConfig = {}) => {
            setLoading(true);
            try {
                let response: AxiosResponse<T>;
                switch (type) {
                    case ServiceProviders.NEWS:
                        response = await newsAxiosInstance.get(url, { ...options, ...params });
                        break;
                    case ServiceProviders.GUARDIANS:
                        response = await guardianAxiosInstance.get(url, { ...options, ...params });
                        break;

                    default:
                        response = await nytAxiosInstance.get(url, { ...options, ...params });
                        break;
                }
                setData(response.data);
            } catch (err) {
                const axiosError = err as any;
                if (axiosError?.response?.data) {
                    if (type === ServiceProviders.NEWS) {
                        const message = axiosError?.response?.data?.message;
                        if (showError && message) {
                            if (timeoutId.current) {
                                clearTimeout(timeoutId.current);
                            }
                            timeoutId.current = setTimeout(() => {
                                enqueueSnackbar('The News: ' + message?.split?.('.')?.[0], {
                                    variant: 'error',
                                });
                            }, 1000);
                        }
                    }
                }
            } finally {
                setLoading(false);
            }
        },
        [url],
    );

    return { data, loading, fetchData };
};
