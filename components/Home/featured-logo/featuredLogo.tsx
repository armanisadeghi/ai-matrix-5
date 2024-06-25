import { Box, Title, Container, Image, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import { useScrollAnimation } from "@/hooks/annimation/useScrollAnimation";

import classes from "./featuredLogo.module.css";

interface CardProps {
    image: string;
    title: string;
    index: number;
    /* category: string; */
}

function Card({ image, title, index }: CardProps) {
    const elementsRef = useScrollAnimation(index * 300);
    const itemClass = `${classes.item} ${index !== 0 && classes.specialItem ? classes.specialItem : ""}`;
    return (
        <>
            <div
                className={`${itemClass} fade-on-scroll`}
                ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
            >
                <Box className={classes.imageBox}>
                    <div className={classes.imageWrapper}>
                        <Image src={image} alt={title} className="anim-fade-in" />
                    </div>
                </Box>
            </div>
        </>
    );
}

const data = [
    {
        image: `${process.env.PUBLIC_URL}/assets/images/BBC_white_logo.png`,
        title: "BBC Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Untitled-design-14.png`,
        title: "CNBC Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/the-times-logo-white-p4ze56iubvr4oz3chtk85wy1thv28udldclwb80xz4.png`,
        title: "The Times Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Untitled-design-13.png`,
        title: "Bloomberg Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/BBC_white_logo.png`,
        title: "BBC Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Untitled-design-14.png`,
        title: "CNBC Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/the-times-logo-white-p4ze56iubvr4oz3chtk85wy1thv28udldclwb80xz4.png`,
        title: "The Times Logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Untitled-design-13.png`,
        title: "Bloomberg Logo",
    },
];

export function FeaturedLogo() {
    const elementsRef = useScrollAnimation(250);
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = data.map((item, index) => (
        <Carousel.Slide key={index}>
            <Card {...item} index={index} />
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
                                    As featured in
                                </Title>
                                <div className={classes.borderLine}></div>
                            </Box>
                        </div>
                    </div>
                    <Carousel
                        loop={mobile}
                        slideSize={{ xs: "100%", sm: "25%", md: "25%", lg: "25%", xl: "25%" }}
                        /* slideGap={{ xs: 0, sm: 5, md: 10, lg: 10, xl: 10 }} */
                        align="start"
                        withControls={false}
                        withIndicators={false}
                        className={classes.featuredLogoCarousel}
                        slidesToScroll={mobile ? 1 : 1}
                    >
                        {slides}
                    </Carousel>
                </Container>
            </section>
        </>
    );
}
