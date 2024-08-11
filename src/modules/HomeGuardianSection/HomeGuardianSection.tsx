import React, { useEffect } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';

export const HomeGuardianSection = () => {
    // data, loading, error,
    const { fetchData } = useAxios('search', ServiceProviders.GUARDIANS);

    useEffect(() => {
        fetchData();
    }, []);

    return <div>HomeGuardianSection</div>;
};
