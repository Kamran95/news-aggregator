import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios, useDebounce } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { GuardianArticleDetails, GuardianSectionApiResponse, SectionTypes } from '../../types';
import { GuardianNewsCard, GuardianPageHeader } from 'src/components';
import { DateRange } from 'src/types/genericTypes';

export const GuardianNews = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [sectionValue, setSectionValue] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

    const searchValue = useDebounce(search);

    const [guardianNewsArticles, setGuardianNewsArticles] = useState<GuardianArticleDetails[]>([]);
    const [guardianSections, setGuardianSections] = useState<SectionTypes[]>([]);

    const { fetchData, data } = useAxios<{ response: { results: GuardianArticleDetails[] } }>(
        'search',
        ServiceProviders.GUARDIANS,
        {
            params: {
                page,
                ['page-size']: 25,
                sortBy: 'publishedAt',
            },
        },
    );
    const { fetchData: fetchSections, data: sectionsData } = useAxios<GuardianSectionApiResponse>(
        'sections',
        ServiceProviders.GUARDIANS,
    );
    const handleFetchData = ({
        date,
        query,
        pageNo,
        section,
    }: {
        date?: DateRange;
        query?: string;
        pageNo?: number;
        section?: string;
    }) => {
        fetchData({
            params: {
                ['from-date']: (date ? date.startDate : dateRange.startDate) ?? undefined,
                ['to-date']: (date ? date.endDate : dateRange.endDate) ?? undefined,
                q: (query ? query : searchValue) ?? undefined,
                section: (section ? section : searchValue) ?? undefined,
                page: pageNo ?? page,
            },
        });
    };

    useEffect(() => {
        fetchData();
        fetchSections();
    }, []);

    useEffect(() => {
        const resData = sectionsData?.response.results;
        if (resData?.length) {
            setGuardianSections(resData);
        }
    }, [sectionsData]);
    useEffect(() => {
        const articles = data?.response?.results;
        if (articles) {
            setGuardianNewsArticles((prevArticles) => [...prevArticles, ...articles]);
        }
    }, [data]);

    useEffect(() => {
        setGuardianNewsArticles([]);
        setPage(1);
        handleFetchData({ section: sectionValue, pageNo: 1 });
    }, [sectionValue]);

    useEffect(() => {
        setGuardianNewsArticles([]);
        setPage(1);
        setDateRange({ startDate: null, endDate: null });
        handleFetchData({ query: searchValue, pageNo: 1 });
    }, [searchValue]);

    const handleFetchMoreData = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        handleFetchData({ pageNo: nextPage });
    };
    const handleDateChange = (date: DateRange) => {
        handleFetchData({ date });
        setDateRange(date);
        setGuardianNewsArticles([]);
    };

    return (
        <div className="container relative w-full px-8">
            <GuardianPageHeader
                sectionValue={sectionValue}
                guardianSections={guardianSections}
                setSearchValue={setSearch}
                searchValue={search}
                value={dateRange}
                setSectionValue={setSectionValue}
                handleValueChange={handleDateChange}
            />
            <div className="">
                <InfiniteScroll
                    dataLength={guardianNewsArticles.length}
                    next={handleFetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    endMessage={null}>
                    {guardianNewsArticles?.map((article, index) => {
                        return (
                            <div key={article.id + index} className="hide-scrollbar h-[260px]">
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
