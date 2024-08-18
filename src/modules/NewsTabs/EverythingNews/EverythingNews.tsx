import { FC, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from 'src/hooks';
import { ServiceProviders } from 'src/constants';
import { NewsArticle } from 'src/types';
import { BackdropLoader, NewsCard, Tag } from 'src/components';
// import { getYesterdayDate } from 'src/utils';
import { EverythingSectionHeader } from 'src/components/NewsPageHeader';
import { getYesterdayDate } from 'src/utils';
import { DateRange, DropdownOptions } from 'src/types/genericTypes';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

interface Props {
    sources: DropdownOptions[];
}
export const EverythingNews: FC<Props> = ({ sources }) => {
    const headerRef: any = useRef(null);

    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [search, setSearch] = useState<string>('');
    const [sourceValue, setSourceValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(10);
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

    const { fetchData, data, loading } = useAxios<{ articles: NewsArticle[]; totalResults: number }>(
        `everything`,
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
        source,
        date,
    }: {
        query?: string;
        pageNo?: number;
        source?: string;
        date?: DateRange;
    }) => {
        const params = new URLSearchParams();
        if (page || pageNo) params.append('page', pageNo ? pageNo + '' : page + '');
        params.append('q', query === '' && (!source || !sourceValue) ? 'top' : query ? query : search);
        if (source || sourceValue) params.append('sources', source === '' || source ? source : sourceValue);

        if ((date?.startDate || dateRange.startDate) && date?.startDate !== null) {
            params.append('from', (date?.startDate ? date.startDate : dateRange.startDate) ?? '');
        }
        if ((date?.endDate || dateRange.endDate) && date?.endDate !== null) {
            params.append('to', (date?.endDate ? date.endDate : dateRange.endDate) ?? '');
        }
        const paramsObject: { [key: string]: string } = Object.fromEntries(params.entries());
        fetchData({
            params: paramsObject,
        });
    };

    const handleSetSourceValue = (source: string) => {
        setNewsArticles([]);
        setSourceValue(source);
        setPage(1);
        handleFetchData({ pageNo: 1, source, query: '' });
    };
    const handleSearchValue = (query: string) => {
        setNewsArticles([]);
        setSearch(query);
        setPage(1);
        handleFetchData({ query, pageNo: 1 });
    };
    const handleClearSearch = () => {
        if (headerRef.current) {
            headerRef.current.clearSearchQuery();
        }
        handleSearchValue('');
    };
    const handleDateChange = (date: DateRange) => {
        handleFetchData({ date, query: search ? search : 'all' });
        setDateRange(date);
        setNewsArticles([]);
    };
    return (
        <div>
            <BackdropLoader isLoading={loading} />
            <EverythingSectionHeader
                ref={headerRef}
                setSearchValue={handleSearchValue}
                searchValue={search}
                sources={sources}
                handleSetSourceValue={handleSetSourceValue}
                sourceValue={sourceValue}
                dateRange={dateRange}
                handleChangeDatePicker={handleDateChange}
            />
            <div className="flex items-center gap-x-4">
                <Tag label={sourceValue} onClose={() => handleSetSourceValue('')} />
                <Tag label={search} onClose={handleClearSearch} />
                {dateRange.startDate ? (
                    <Tag
                        label={`${dateRange.startDate} - ${dateRange.endDate}`}
                        onClose={() => handleDateChange({ startDate: null, endDate: null })}
                    />
                ) : null}
            </div>
            {!newsArticles?.length && !loading ? (
                <NoRecordsFoundCard heading="No Records Found!" />
            ) : (
                <div className="">
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
