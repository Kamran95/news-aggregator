import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NytArticleTypes } from '../../types';
import { NewsCard } from '../../components';

export const NYTNews = () => {
    const [newsArticles, setNewsArticles] = useState<NytArticleTypes[]>([]);
    const [page, setPage] = useState<number>(1);
    const { fetchData, data } = useAxios<{ results: NytArticleTypes[] }>(`topstories/v2/us.json`, ServiceProviders.NYT);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const articles = data?.results;
        if (articles) {
            setNewsArticles(articles);
        }
    }, [data]);

    const handleFetchMoreData = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData();
    };
    return (
        <div className="container relative w-full px-8">
            <div className="">
                <InfiniteScroll
                    dataLength={newsArticles.length}
                    next={handleFetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    endMessage={null}>
                    {newsArticles?.map((article) => {
                        return (
                            <div key={article.title} className="hide-scrollbar h-[680px]">
                                <NewsCard
                                    key={article.title}
                                    title={article.title}
                                    description={article.abstract}
                                    url={article.url}
                                    imageUrl={article?.multimedia?.[1]?.url ?? ''}
                                />
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
};
export default NYTNews;
