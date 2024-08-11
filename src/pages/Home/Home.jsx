import { HomeGuardianSection, HomeNYTSection, HomeNewsSection } from '../../modules';

export const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6">
                <HomeNewsSection />
                <HomeNYTSection />
                <HomeGuardianSection />
                {/* {newsData.map((news, index) => (
                    <NewsCard
                        key={index}
                        title={news.title}
                        description={news.description}
                        url={news.url}
                        imageUrl={news.imageUrl}
                    />
                ))} */}
            </div>
        </div>
    );
};
