import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { GuardianArticleDetails } from '../../types';
import { GuardianNewsCard, GuardianPageHeader } from '../../components';

export const GuardianNews = () => {
    const [page, setPage] = useState<number>(1);
    const [guardianNewsArticles, setGuardianNewsArticles] = useState<GuardianArticleDetails[]>([]);
    const { fetchData, data } = useAxios<{ response: { results: GuardianArticleDetails[] } }>(
        'search',
        ServiceProviders.GUARDIANS,
        { params: { page, ['page-size']: 25, sortBy: 'publishedAt' } },
    );

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const articles = data?.response?.results;
        if (articles) {
            setGuardianNewsArticles((prevArticles) => [...prevArticles, ...articles]);
        }
    }, [data]);

    const handleFetchMoreData = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData({ params: { nextPage } });
    };
    return (
        <div className="container relative w-full px-8">
            <GuardianPageHeader route="/the-news" heading="The News" />
            <div className="">
                <InfiniteScroll
                    dataLength={guardianNewsArticles.length}
                    next={handleFetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    endMessage={null}>
                    {guardianNewsArticles?.map((article) => {
                        return (
                            <div key={article.id} className="hide-scrollbar h-[260px]">
                                <GuardianNewsCard
                                    key={article.id}
                                    title={article.webTitle}
                                    pillarName={article.pillarName}
                                    url={article.webUrl}
                                />
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
};
export default GuardianNews;
