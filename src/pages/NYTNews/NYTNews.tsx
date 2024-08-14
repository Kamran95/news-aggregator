import { useEffect, useState } from 'react';

import { useAxios, useDebounce } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NytArticleTypes } from '../../types';
import { NewsCard, NYTPageHeader } from '../../components';

export const NYTNews = () => {
    const [newsArticles, setNewsArticles] = useState<NytArticleTypes[]>([]);
    const [search, setSearch] = useState<string>('');
    const [sectionValue, setSectionValue] = useState<string>('us');
    const searchValue = useDebounce(search);

    const { fetchData, data } = useAxios<{ results: NytArticleTypes[] }>(
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
        setNewsArticles([]);
        fetchData();
    }, [searchValue]);

    return (
        <div className="container relative w-full px-8">
            <NYTPageHeader
                sectionValue={sectionValue}
                setSearchValue={setSearch}
                searchValue={search}
                setSectionValue={setSectionValue}
            />
            <div className="">
                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
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
            </div>
        </div>
    );
};
export default NYTNews;
