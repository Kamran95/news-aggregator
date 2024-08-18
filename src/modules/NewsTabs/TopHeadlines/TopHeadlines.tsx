import { FC, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from 'src/hooks';
import { ServiceProviders } from 'src/constants';
import { NewsArticle } from 'src/types';
import { BackdropLoader, NewsCard, Tag } from 'src/components';
import { NewsPageHeader } from 'src/components/NewsPageHeader';
import { getYesterdayDate } from 'src/utils';
import { DropdownOptions } from 'src/types/genericTypes';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

interface Props {
    sources: DropdownOptions[];
}
export const TopHeadlines: FC<Props> = ({ sources }) => {
    const headerRef: any = useRef(null);

    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [search, setSearch] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [sourceValue, setSourceValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(10);
    const { fetchData, data, loading } = useAxios<{ articles: NewsArticle[]; totalResults: number }>(
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

    const handleFetchData = ({
        query,
        pageNo,
        category,
        source,
    }: {
        query?: string;
        pageNo?: number;
        category?: string;
        source?: string;
    }) => {
        const params = new URLSearchParams();
        if (page || pageNo) params.append('page', pageNo ? pageNo + '' : page + '');
        console.log({ category, categoryValue, source, sourceValue });

        params.append('q', query === '' || query ? query : search);
        if (source || sourceValue) params.append('sources', source === '' || source ? source : sourceValue);
        if (category || categoryValue) params.append('category', category === '' || category ? category : categoryValue);
        const paramsObject: { [key: string]: string } = Object.fromEntries(params.entries());
        fetchData({
            params: paramsObject,
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
    const handleSetSourceValue = (source: string) => {
        setNewsArticles([]);
        setSourceValue(source);
        setPage(1);
        handleFetchData({ pageNo: 1, source });
    };
    const handleClearSearch = () => {
        if (headerRef.current) {
            headerRef.current.clearSearchQuery();
        }
        handleSearchValue('');
    };
    const handleClearCategory = () => {
        setNewsArticles([]);
        setCategoryValue('');
        setPage(1);
        handleFetchData({ pageNo: 1, category: '', query: search ? search : sourceValue ? '' : 'all' });
    };
    const handleClearSources = () => {
        setNewsArticles([]);
        setSourceValue('');
        setPage(1);
        handleFetchData({ pageNo: 1, source: '', query: search ? search : categoryValue ? '' : 'all' });
    };
    return (
        <div>
            <BackdropLoader isLoading={loading} />
            <NewsPageHeader
                ref={headerRef}
                sectionValue={categoryValue}
                setSearchValue={handleSearchValue}
                searchValue={search}
                setSectionValue={handleSetCategoryValue}
                sources={sources}
                handleSetSourceValue={handleSetSourceValue}
                sourceValue={sourceValue}
            />
            <div className="flex items-center gap-x-4">
                <Tag label={sourceValue} onClose={handleClearSources} />
                <Tag label={search} onClose={handleClearSearch} />
                <Tag label={categoryValue} onClose={handleClearCategory} />
            </div>
            {!newsArticles?.length && !loading ? (
                <NoRecordsFoundCard heading="No Records Found!" />
            ) : (
                <div>
                    {newsArticles?.length ? (
                        <InfiniteScroll
                            dataLength={newsArticles.length}
                            next={handleFetchMoreData}
                            hasMore={newsArticles?.length !== totalRecords}
                            loader={null}
                            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                            endMessage={null}>
                            {newsArticles
                                ?.filter((val) => val.title !== '[Removed]')
                                ?.map((article) => {
                                    return (
                                        <div key={article.title} className="hide-scrollbar">
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
            )}
        </div>
    );
};
