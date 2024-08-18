import { useEffect, useRef, useState } from 'react';
import { useAxios } from '../../hooks';
import { ServiceProviders } from '../../constants';
import { GuardianArticleDetails } from '../../types';
import { GuardianNewsCard, LeftRightScrollController, SectionLoader } from '../../components';
import { NoRecordsFoundCard } from 'src/components/NoRecordsFoundCard';

export const HomeGuardianSection = () => {
    const contentRef = useRef(null);

    const [guardianNewsArticles, setGuardianNewsArticles] = useState<GuardianArticleDetails[]>([]);
    const { fetchData, data, loading } = useAxios<{ response: { results: GuardianArticleDetails[] } }>(
        'search',
        ServiceProviders.GUARDIANS,
    );

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const articles = data?.response?.results;
        if (articles) {
            setGuardianNewsArticles(articles);
        }
    }, [data]);
    return (
        <div className="relative">
            {loading && <SectionLoader className="!h-[280px]" />}
            {!guardianNewsArticles?.length ? (
                <NoRecordsFoundCard route="/guardian-news" className="!h-[280px]" />
            ) : (
                <div className={`relative w-full ${loading ? 'opacity-30' : 'opacity-100'}`}>
                    <LeftRightScrollController
                        contentRef={contentRef}
                        classLeftButton=" -left-5"
                        classRightButton=" -right-5"
                    />
                    <div ref={contentRef} className="hide-scrollbar mt-2 flex h-[280px] w-full flex-row gap-4 py-8 pe-4">
                        {guardianNewsArticles?.map((article) => {
                            return (
                                <GuardianNewsCard
                                    key={article.id}
                                    title={article.webTitle}
                                    pillarName={article.pillarName}
                                    url={article.webUrl}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
