import React, { useEffect, useState } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { NewsArticle } from '../../types';
import { NewsCard } from '../../components';

export const HomeNewsSection = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    // data, loading, error,
    const { fetchData, data } = useAxios<{ articles: NewsArticle[] }>(
        'everything?q=top&from=2024-07-11&sortBy=publishedAt&pageSize=10',
        ServiceProviders.NEWS,
    );
    console.log({ newsArticles });
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
        <div>
            {newsArticles?.map((article) => {
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
    );
};
