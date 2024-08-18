import { useEffect, useState } from 'react';

import { useAxios } from '../../hooks';
import { NewsTabHeader, ServiceProviders } from '../../constants';
import { NewsSource } from '../../types';
import { Tabs } from '../../components';
import { EverythingNews, TopHeadlines } from 'src/modules';
import { DropdownOptions } from 'src/types/genericTypes';

export const TheNews = () => {
    const [sources, setNewsSources] = useState<DropdownOptions[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const { fetchData, data } = useAxios<{ sources: NewsSource[] }>(`sources`, ServiceProviders.NEWS, {}, true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const { sources: resSources } = data ?? {};
        if (resSources?.length) {
            setNewsSources(resSources.map((source) => ({ id: source.id, label: source.name })));
        }
    }, [data]);
    return (
        <div className="container relative w-full px-8">
            <Tabs activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} tabHeaders={NewsTabHeader}>
                {activeTabIndex === 1 ? <EverythingNews sources={sources} /> : <TopHeadlines sources={sources} />}
            </Tabs>
        </div>
    );
};
export default TheNews;
