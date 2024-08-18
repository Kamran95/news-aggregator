import React, { useEffect, useRef, useState } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NytArticleTypes } from '../../types';
import { LeftRightScrollController } from 'src/components/LeftRightScrollController';
import { NewsCard } from 'src/components/NewsCard';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';
import { SectionLoader } from 'src/components';

export const HomeNYTSection = () => {
    const contentRef = useRef(null);
    const [newsArticles, setNewsArticles] = useState<NytArticleTypes[]>([]);

    const { fetchData, data, loading } = useAxios<{ results: NytArticleTypes[] }>(
        'topstories/v2/us.json',
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

    return (
        <div className="relative">
            {loading && <SectionLoader />}
            {!newsArticles?.length ? (
                <NoRecordsFoundCard route="/nyt-news" />
            ) : (
                <div className="relative w-full">
                    <LeftRightScrollController
                        contentRef={contentRef}
                        classLeftButton=" -left-5 "
                        classRightButton=" -right-5"
                    />
                    <div ref={contentRef} className="hide-scrollbar mt-2 flex h-[680px] w-full flex-row gap-4 py-8 pe-4">
                        {newsArticles?.map((article) => {
                            return (
                                <NewsCard
                                    key={article.title}
                                    title={article.title}
                                    description={article.abstract}
                                    url={article.url}
                                    imageUrl={article?.multimedia?.[1]?.url ?? ''}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
