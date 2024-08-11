import React, { useEffect } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';

export const HomeNYTSection = () => {
    // data, loading, error,
    const { fetchData } = useAxios('topstories/v2/us.json', ServiceProviders.NYT);
    useEffect(() => {
        fetchData();
    }, []);
    return <div>HomeNYTSection</div>;
};
