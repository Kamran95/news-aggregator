import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAxios } from 'src/hooks';
import { ServiceProviders } from 'src/constants';
import { GuardianArticleDetails, GuardianSectionApiResponse, SectionTypes } from 'src/types';
import { GuardianNewsCard, GuardianPageHeader, Tag } from 'src/components';
import { DateRange } from 'src/types/genericTypes';
import { BackdropLoader } from 'src/components/BackdropLoader';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

export const GuardianNews = () => {
    const headerRef: any = useRef(null);

    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [sectionValue, setSectionValue] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

    const [guardianNewsArticles, setGuardianNewsArticles] = useState<GuardianArticleDetails[]>([]);
    const [guardianSections, setGuardianSections] = useState<SectionTypes[]>([]);

    const { fetchData, data, loading } = useAxios<{ response: { results: GuardianArticleDetails[] } }>(
        'search',
        ServiceProviders.GUARDIANS,
        {
            params: {
                page: 1,
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
        const params = new URLSearchParams();
        if (page || pageNo) params.append('page', pageNo ? pageNo + '' : page + '');
        if (query || search) params.append('q', query ? query : search);
        if (section || sectionValue) params.append('section', section ? section : sectionValue);
        if ((date?.startDate || dateRange.startDate) && date?.startDate !== null) {
            params.append('from-date', (date?.startDate ? date.startDate : dateRange.startDate) ?? '');
        }
        if ((date?.endDate || dateRange.endDate) && date?.endDate !== null) {
            params.append('to-date', (date?.endDate ? date.endDate : dateRange.endDate) ?? '');
        }
        const paramsObject: { [key: string]: string } = Object.fromEntries(params.entries());
        fetchData({
            params: paramsObject,
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

    const handleChangeSectionValue = (section: string) => {
        setGuardianNewsArticles([]);
        setSectionValue(section);
        setPage(1);
        handleFetchData({ section, pageNo: 1 });
    };

    const handleChangeQuery = (query: string) => {
        setGuardianNewsArticles([]);
        setSearch(query);
        setPage(1);
        handleFetchData({ query, pageNo: 1 });
    };

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

    const handleClearSearch = () => {
        if (headerRef.current) {
            headerRef.current.clearSearchQuery();
        }
        handleChangeQuery('');
    };
    return (
        <div className="container w-full px-8">
            <BackdropLoader isLoading={loading} />

            <GuardianPageHeader
                ref={headerRef}
                sectionValue={sectionValue}
                guardianSections={guardianSections}
                setSearchValue={handleChangeQuery}
                value={dateRange}
                setSectionValue={handleChangeSectionValue}
                handleValueChange={handleDateChange}
            />
            <div className="flex items-center gap-x-4">
                <Tag label={sectionValue} onClose={() => handleChangeSectionValue('')} />
                <Tag label={search} onClose={handleClearSearch} />
                {dateRange.startDate ? (
                    <Tag
                        label={`${dateRange.startDate} - ${dateRange.endDate}`}
                        onClose={() => handleDateChange({ startDate: null, endDate: null })}
                    />
                ) : null}
            </div>
            {!guardianNewsArticles?.length && !loading ? (
                <NoRecordsFoundCard heading="No Records Found!" />
            ) : (
                <div>
                    <InfiniteScroll
                        dataLength={guardianNewsArticles.length}
                        next={handleFetchMoreData}
                        hasMore={true}
                        loader={null}
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
            )}
        </div>
    );
};
export default GuardianNews;
