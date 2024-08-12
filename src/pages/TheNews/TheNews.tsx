import React, { useEffect, useRef, useState } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NewsArticle } from '../../types';
import { NewsCard } from '../../components';
import { LeftRightScrollController } from 'src/components/LeftRightScrollController';
import { getYesterdayDate } from 'src/utils';

export const TheNews = () => {
    const contentRef = useRef(null);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const { fetchData, data } = useAxios<{ articles: NewsArticle[] }>(
        `top-headlines?q=top&from=${getYesterdayDate()}&sortBy=publishedAt&pageSize=10`,
        ServiceProviders.NEWS,
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
        <div className="container relative w-full">
            <LeftRightScrollController contentRef={contentRef} classLeftButton=" -left-5" classRightButton=" -right-5" />
            <div className="grid grid-cols-4 gap-x-4">
                {newsArticles
                    ?.filter((val) => val.title !== '[Removed]')
                    ?.map((article) => {
                        return (
                            <div ref={contentRef} key={article.title} className="hide-scrollbar h-[680px]">
                                <NewsCard
                                    title={article.title}
                                    description={article.description}
                                    url={article.url}
                                    imageUrl={article.urlToImage}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default TheNews;
