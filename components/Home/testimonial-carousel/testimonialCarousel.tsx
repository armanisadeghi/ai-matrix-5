import { Box, Title, Text, Container, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useScrollAnimation } from "@/hooks/annimation/useScrollAnimation";

import classes from "./testimonialCarousel.module.css";
import "@mantine/carousel/styles.css";

interface CardProps {
    image: string;
    title: string;
    /* category: string; */
}

function Card({ image, title }: CardProps) {
    return (
        <>
            <div className={classes.imageWrapper}>
                <figure className={classes.galleryImage}>
                    <Image src={image} alt={title} className="anim-fade-in" />
                </figure>
            </div>
        </>
    );
}

const data = [
    {
        image: `${process.env.PUBLIC_URL}/assets/images/2.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Chrysothemis_Brown_AutogenAI_Testimonial.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Mark-Sargeant.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Debbie-Brockbank.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/2.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Chrysothemis_Brown_AutogenAI_Testimonial.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Mark-Sargeant.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Debbie-Brockbank.png`,
        title: "AutogenAI Bid Writing Software Review",
    },
];

export function TestimonialCarousel() {
    const elementsRef = useScrollAnimation(250);
    const elementsRef2 = useScrollAnimation(500);

    const slides = data.map((item, index) => (
        <Carousel.Slide key={index}>
            <Card {...item} />
        </Carousel.Slide>
    ));
    return (
        <>
            <section className={classes.sectionTitle}>
                <Container className={classes.myContainer}>
                    <div className={classes.row}>
                        <div className={classes.columnContent}>
                            <Box
                                className={`${classes.titleBox} animate-on-scroll`}
                                ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                            >
                                <Title className={classes.title} order={2} pb="0.4445em">
                                    Our customers
                                </Title>
                                <div className={classes.borderLine}></div>
                            </Box>
                            <Text
                                className={`${classes.text} animate-on-scroll`}
                                ref={(el: HTMLDivElement | null) => elementsRef2.current.push(el)}
                            >
                                Our Language Engines are making our clients’ bid-writing teams up to 85% more efficient,
                                allowing them to get to draft in minutes rather than days and boosting their win rates
                                by up to 241%. But don’t just take our word for it, see what our customers are saying.
                            </Text>
                        </div>
                    </div>
                </Container>
            </section>
            <section className={classes.sectionTestimonial}>
                <Container className={classes.myContainer}>
                    <Carousel
                        loop={true}
                        slideSize={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%", xl: "25%" }}
                        /* slideGap={{ xs: 0, sm: 5, md: 10, lg: 10, xl: 10 }} */
                        align="center"
                        withControls={true}
                        withIndicators
                        slidesToScroll={1}
                        className={classes.testimonialCarousel}
                        classNames={{
                            root: classes.viewPort,
                            container: classes.carouselContainer,
                            indicators: classes.indicators,
                            indicator: classes.indicator,
                        }}
                        nextControlIcon={<span className={classes.nextIcon}>{`>`}</span>}
                        previousControlIcon={<span className={classes.prevIcon}>{`<`}</span>}
                    >
                        {slides}
                    </Carousel>
                </Container>
            </section>
        </>
    );
}
