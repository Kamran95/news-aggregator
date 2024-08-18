import { HomeSectionHeader } from 'src/components';
import { HomeGuardianSection, HomeNYTSection, HomeNewsSection } from '../../modules';

export const Home = () => {
    return (
        <div className="container px-8">
            <div className="grid grid-cols-1">
                <section>
                    <HomeSectionHeader route="/the-news" heading="The News" />
                    <HomeNewsSection />
                </section>
                <section>
                    <HomeSectionHeader route="/nyt-news" heading="New York Times" />
                    <HomeNYTSection />
                </section>
                <section>
                    <HomeSectionHeader route="/guardian-news" heading="The Guardian News" />
                    <HomeGuardianSection />
                </section>
            </div>
        </div>
    );
};
export default Home;
