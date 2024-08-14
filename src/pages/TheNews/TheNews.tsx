import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NewsArticle } from '../../types';
import { NewsCard } from '../../components';
// import { getYesterdayDate } from 'src/utils';
import { NewsPageHeader } from 'src/components/NewsPageHeader';
import { getYesterdayDate } from 'src/utils';

export const TheNews = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [search, setSearch] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(10);

    const { fetchData, data } = useAxios<{ articles: NewsArticle[]; totalResults: number }>(
        `top-headlines`,
        ServiceProviders.NEWS,
        { params: { page, pageSize: 10, sortBy: 'publishedAt', from: getYesterdayDate(), q: 'top' } },
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

    const handleFetchData = ({ query, pageNo, category }: { query?: string; pageNo?: number; category?: string }) => {
        fetchData({
            params: {
                q: (query ? query : search) ?? '',
                category: category ? category : undefined,
                page: pageNo ?? page,
            },
        });
    };

    const handleSetCategoryValue = (category: string) => {
        setNewsArticles([]);
        setCategoryValue(category);
        setPage(1);
        handleFetchData({ category, pageNo: 1 });
    };
    const handleSearchValue = (query: string) => {
        setNewsArticles([]);
        setSearch(query);
        setPage(1);
        handleFetchData({ query, pageNo: 1 });
    };

    return (
        <div className="container relative w-full px-8">
            <NewsPageHeader
                sectionValue={categoryValue}
                setSearchValue={handleSearchValue}
                searchValue={search}
                setSectionValue={handleSetCategoryValue}
            />
            {categoryValue ? (
                <div className="bg-orange-100 my-4 flex w-auto items-center justify-between rounded-lg px-2 py-2 text-gray-500">
                    <span> {categoryValue}</span>
                </div>
            ) : null}
            <div className="">
                {newsArticles?.length ? (
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
                ) : null}
            </div>
        </div>
    );
};
export default TheNews;
