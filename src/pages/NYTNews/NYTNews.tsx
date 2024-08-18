import { useEffect, useState } from 'react';

import { useAxios, useDebounce } from 'src/hooks';
import { ServiceProviders } from 'src/constants';
import { NytArticleTypes } from 'src/types';
import { BackdropLoader, NewsCard, NYTPageHeader, Tag } from 'src/components';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

export const NYTNews = () => {
    const [newsArticles, setNewsArticles] = useState<NytArticleTypes[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<NytArticleTypes[]>([]);
    const [search, setSearch] = useState<string>('');
    const [sectionValue, setSectionValue] = useState<string>('us');
    const searchValue = useDebounce(search);

    const { fetchData, data, loading } = useAxios<{ results: NytArticleTypes[] }>(
        `topstories/v2/${sectionValue}.json`,
        ServiceProviders.NYT,
    );
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const articles = data?.results;
        if (articles) {
            setNewsArticles(articles);
        }
    }, [data]);

    useEffect(() => {
        setNewsArticles([]);
        fetchData();
    }, [sectionValue]);

    useEffect(() => {
        if (!searchValue) setFilteredArticles([...newsArticles]);
        const search = searchValue?.toLowerCase();
        const filteredArticles = newsArticles.filter((article) => {
            if (article?.title?.toLowerCase()?.includes(search) || article?.abstract?.toLowerCase()?.includes(search)) {
                return true;
            } else return false;
        });
        setFilteredArticles([...filteredArticles]);
    }, [searchValue, newsArticles]);

    const handleClearSearch = () => {
        setSearch('');
    };
    const handleClearSection = () => {
        setNewsArticles([]);
        setSectionValue('us');
    };
    return (
        <div className="container relative w-full px-8">
            <BackdropLoader isLoading={loading} />

            <NYTPageHeader
                sectionValue={sectionValue}
                setSearchValue={setSearch}
                searchValue={search}
                setSectionValue={setSectionValue}
            />
            <div className="flex items-center gap-x-4">
                {sectionValue !== 'us' ? <Tag label={sectionValue} onClose={handleClearSection} /> : null}
                <Tag label={search} onClose={handleClearSearch} />
            </div>
            {!filteredArticles?.length && !loading ? (
                <NoRecordsFoundCard heading="No Records Found!" />
            ) : (
                <div className="">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles?.map((article) => {
                            return (
                                <div key={article.title} className="hide-scrollbar">
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
                    </div>
                </div>
            )}
        </div>
    );
};
export default NYTNews;
