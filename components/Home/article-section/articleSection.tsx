import { Box, Title, Container, Image, Text, useMantineTheme, Anchor, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import classes from "./articleSection.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface CardProps {
    image: string;
    date_str: string;
    title: string;
    index: number;
    link: string;
    /* category: string; */
}

function Card({ image, date_str, title, index, link }: CardProps) {
    const elementsRef = useScrollAnimation(index * 300);
    const lastIndex = data.length - 1;
    const itemClass = `${classes.blogPost} ${index !== lastIndex && classes.speciaBlogPostItem ? classes.speciaBlogPostItem : ""}`;
    return (
        <>
            <div
                className={`${itemClass} fade-on-scroll`}
                ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
            >
                <Box className={classes.headerWrapper}>
                    <Anchor href={link} className={classes.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            className="anim-fade-in"
                        />
                    </Anchor>
                    <div className={classes.dateWrapper}>
                        <Text className={classes.dateText} pb="0.4445em">
                            {date_str}
                        </Text>
                    </div>
                </Box>
                <div className={classes.entryContent}>
                    <div className={classes.blogHeadingWrapper}>
                        <Title className={classes.blogTitle} order={3}>
                            <Anchor href={link}>{title}</Anchor>
                        </Title>
                    </div>
                </div>
                <div className={classes.btnWrapper}>
                    <Button component={"a"} href={link} className={classes.linkBtn} size="xl">
                        View Article
                    </Button>
                </div>
            </div>
        </>
    );
}

const data = [
    {
        image: "",
        date_str: "26TH MAY, 2024",
        title: "UK General Election 2024: What is purdah, when does it start and how will it impact your business?",
        link: "#",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/shutterstock_2307916095.jpg`,
        date_str: "22nd May, 2024",
        title: "How AutogenAI is Building the Future of Bid Writing",
        link: "#",
    },
    {
        image: `${process.env.PUBLIC_URL}/assets/images/shutterstock_619078730.jpg`,
        date_str: "15TH MAY, 2024",
        title: "How AI Can Help You Make the Most of Government Frameworks",
        link: "#",
    },
];

export function ArticleSection() {
    const elementsRef = useScrollAnimation(250);
    const elementsRef2 = useScrollAnimation(500);

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
                            <Box className={classes.titleBox}>
                                <div
                                    className={`${classes.titleWrapper} animate-on-scroll`}
                                    ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                >
                                    <Title className={classes.title} order={2} pb="0.4445em">
                                        LATEST NEWS & INSIGHTS.
                                    </Title>
                                    <div className={classes.borderLine}></div>
                                </div>
                                <Text
                                    className={`${classes.text} animate-on-scroll`}
                                    ref={(el: HTMLDivElement | null) => elementsRef2.current.push(el)}
                                >
                                    Written in collaboration with AutogenAI’s General Language Engine 1
                                </Text>
                            </Box>
                        </div>
                    </div>
                    <Carousel
                        loop={mobile ? true : false}
                        slideSize={{ xs: "100%", sm: "25.3%", md: "25.3%", lg: "25.3%", xl: "25.3%" }}
                        /* slideGap={{ xs: 0, sm: 5, md: 10, lg: "20rem", xl: "20rem" }} */
                        align="start"
                        withControls={false}
                        withIndicators={true}
                        className={classes.articleCarousel}
                        classNames={{
                            container: classes.articleCarouselContainer,
                            slide: classes.articleCarouselSlide,
                            indicators: classes.indicators,
                            indicator: classes.indicator,
                        }}
                        slidesToScroll={mobile ? 1 : 1}
                    >
                        {slides}
                    </Carousel>
                </Container>
            </section>
            {/* <section className={classes.featuredLogo} >
                <Container className={classes.myContainer}>
                    <Carousel
                        loop={mobile}
                        slideSize={{ xs: '100%', sm: '25%', md: '25%', lg: '25%', xl: '25%' }}
                        slideGap={{ xs: 0, sm: 5, md: 10, lg: 10, xl: 10 }}
                        align="start"
                        withControls={false}
                        withIndicators={false}
                        className={classes.featuredLogoCarousel}
                        slidesToScroll={mobile ? 1 : 1}
                    >
                        {slides}
                    </Carousel>
                </Container>
            </section> */}
        </>
    );
}
