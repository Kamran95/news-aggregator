import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NewsArticle } from '../../types';
import { NewsCard } from '../../components';
import { getYesterdayDate } from 'src/utils';

export const TheNews = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(10);
    const { fetchData, data } = useAxios<{ articles: NewsArticle[]; totalResults: number }>(
        `top-headlines?q=top&from=${getYesterdayDate()}&sortBy=publishedAt`,
        ServiceProviders.NEWS,
        { params: { page, pageSize: 15, sortBy: 'publishedAt' } },
    );
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const { articles, totalResults } = data ?? {};
        setTotalRecords(totalResults ?? 0);
        if (articles) {
            setNewsArticles([...articles]);
        }
    }, [data]);
    const handleFetchMoreData = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData({ params: { nextPage } });
    };
    return (
        <div className="container relative w-full px-8">
            <div className="">
                <InfiniteScroll
                    dataLength={newsArticles.length}
                    next={handleFetchMoreData}
                    hasMore={newsArticles?.length !== totalRecords}
                    loader={<h4>Loading...</h4>}
                    className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    endMessage={null}>
                    {newsArticles
                        ?.filter((val) => val.title !== '[Removed]')
                        ?.map((article) => {
                            return (
                                <div key={article.title} className="hide-scrollbar h-[680px]">
                                    <NewsCard
                                        title={article.title}
                                        description={article.description}
                                        url={article.url}
                                        imageUrl={article.urlToImage}
                                    />
                                </div>
                            );
                        })}
                </InfiniteScroll>
            </div>
        </div>
    );
};
export default TheNews;
