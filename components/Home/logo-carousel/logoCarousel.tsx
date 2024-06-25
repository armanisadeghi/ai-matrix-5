import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Title, useMantineTheme, Container, Transition } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";

import classes from "./logoCarousel.module.css";
import "@mantine/carousel/styles.css";

interface CardProps {
    image: string;
    title: string;
    index: number;
    mounted: boolean;
    /* category: string; */
}

function Card({ image, title, index, mounted }: CardProps) {
    const delay = index * 500; // 500ms delay for each image
    const [delayMounted, setDelayMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayMounted(mounted);
        }, delay);

        return () => clearTimeout(timeout);
    }, [mounted, delay]);

    return (
        <>
            <Transition mounted={delayMounted} transition="fade" duration={1000} timingFunction="ease">
                {(styles) => (
                    <div className={classes.item} style={styles}>
                        <div className={classes.imageBox}>
                            <div className={classes.imageWrapper}>
                                <img src={image} alt={title} className="anim-fade-in" />
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
}

const data = [
    {
        image: `${process.env.PUBLIC_URL}/assets/images/serco_v2_logo_white.png`,
        title: "Serco logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/Mitie-White-Logo-Horizontal.webp`,
        title: "Mitie logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/specsavers-logo.png`,
        title: "Specsavers logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/bidding-limited-white.png`,
        title: "Bidding Limited logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/ADS-white.png`,
        title: "ADS logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/KHLogo_White.png`,
        title: "KH logo",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/MCR-Group-White.png`,
        title: "MCR Group logo",
    },
];

export function LogoCarousel() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
    const slides = data.map((item, index) => (
        <Carousel.Slide key={index}>
            <Card {...item} index={index} mounted={mounted} />
        </Carousel.Slide>
    ));

    return (
        <section className={classes.logoCarousel}>
            <Container className={classes.myContainer}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Transition mounted={mounted} transition="fade-up" duration={1000} timingFunction="ease">
                            {(styles) => (
                                <div className={classes.header} style={styles}>
                                    <Title className={classes.title} order={2} pb="0.4445em">
                                        Trusted by
                                    </Title>
                                    <div className={classes.borderLine}></div>
                                </div>
                            )}
                        </Transition>
                        <Carousel
                            slideSize={{ xs: "100%", sm: "33.33%", md: "33.33%", lg: "25%", xl: "20%" }}
                            slideGap={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                            loop={true}
                            align="start"
                            withControls={false}
                            /* slidesToScroll={mobile ? 1 : 2} */
                            slidesToScroll={1}
                            plugins={[autoplay.current]}
                            onMouseEnter={autoplay.current.stop}
                            onMouseLeave={autoplay.current.reset}
                            speed={10}
                            draggable
                            className={classes.logoCarouselSlider}
                            classNames={{
                                slide: classes.itemSlides,
                            }}
                        >
                            {slides}
                        </Carousel>
                    </div>
                </div>
            </Container>
        </section>
    );
}
