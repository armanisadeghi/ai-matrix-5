import {
    ArticleSection,
    ContactForm,
    Counter,
    FeaturedLogo,
    FeatureSection,
    HeroBanner,
    LogoCarousel,
    SimpleContent,
    TabSection,
    TestimonialCarousel,
} from "@/components";

import "./styles.css";

function NewHomePage() {
    return (
        <>
            <HeroBanner />
            <LogoCarousel />
            <Counter />
            <TabSection />
            <FeatureSection />
            <TestimonialCarousel />
            <SimpleContent />
            <FeaturedLogo />
            <ContactForm />
            <ArticleSection />
        </>
    );
}

export default NewHomePage;
