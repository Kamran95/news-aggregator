import React, { useEffect, useRef, useState } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NewsArticle } from '../../types';
import { NewsCard, SectionLoader } from '../../components';
import { LeftRightScrollController } from 'src/components/LeftRightScrollController';
import { getYesterdayDate } from 'src/utils';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

export const HomeNewsSection = () => {
    const contentRef = useRef(null);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const { fetchData, data, loading } = useAxios<{ articles: NewsArticle[] }>(
        `top-headlines?q=top&from=${getYesterdayDate()}&sortBy=publishedAt&pageSize=10`,
        ServiceProviders.NEWS,
        {},
        true,
    );
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const articles = data?.articles;
        if (articles) {
            setNewsArticles(articles);
        }
    }, [data]);
    return (
        <>
            {loading && <SectionLoader />}
            {!newsArticles?.length ? (
                <NoRecordsFoundCard route="/the-news" />
            ) : (
                <div className="relative w-full">
                    <LeftRightScrollController
                        contentRef={contentRef}
                        classLeftButton=" -left-5"
                        classRightButton=" -right-5"
                    />
                    <div ref={contentRef} className="hide-scrollbar mt-2 flex h-[680px] w-full flex-row gap-4 py-8 pe-4">
                        {newsArticles
                            ?.filter((val) => val.title !== '[Removed]')
                            ?.map((article) => {
                                return (
                                    <NewsCard
                                        key={article.title}
                                        title={article.title}
                                        description={article.description}
                                        url={article.url}
                                        imageUrl={article.urlToImage}
                                    />
                                );
                            })}
                    </div>
                </div>
            )}
        </>
    );
};
