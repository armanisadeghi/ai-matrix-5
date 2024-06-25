import { Box, Container, Tabs, Title, Text, Button } from "@mantine/core";
import classes from "./tabs.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function TabSection() {
    const elementsRef = useScrollAnimation(250);

    return (
        <>
            <section className={classes.sectionTitle}>
                <div className={classes.row}>
                    <div className={classes.columnContent}>
                        <Box
                            className={`${classes.titleBox} animate-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                        >
                            <Title className={`${classes.title}`} order={2} pb="0.4445em">
                                The 4 key ingredients of our custom language engines
                            </Title>
                            <div className={classes.borderLine}></div>
                        </Box>
                    </div>
                </div>
            </section>
            <section className={classes.sectionTab}>
                <Container className={classes.myContainer}>
                    <div className={classes.tabWrapper}>
                        <Tabs variant="unstyled" defaultValue="tab_nav_1" classNames={classes}>
                            <Tabs.List grow className={classes.tabNav}>
                                <Tabs.Tab value="tab_nav_1">WORLD CLASS ENGINEERING</Tabs.Tab>

                                <Tabs.Tab value="tab_nav_2">LINGUISTIC ENGINEERING</Tabs.Tab>

                                <Tabs.Tab value="tab_nav_3">YOUR KNOWLEDGE LIBRARY</Tabs.Tab>

                                <Tabs.Tab value="tab_nav_4">THE BEST UX/UI</Tabs.Tab>
                            </Tabs.List>

                            <div className={classes.tabContent}>
                                <Tabs.Panel value="tab_nav_1" pt="xs" className={classes.tabPane}>
                                    <div className={classes.tabBgImg}>
                                        <img
                                            src="assets/images/White-Neuron-Net-black-background-16x9-1-e1711384909137.png"
                                            sizes="(min-width: 768px) 80rem, 100vw"
                                            alt="White Neuron Net black and white background"
                                        />
                                    </div>
                                    <div className={classes.tabPaneInner}>
                                        <Title
                                            className={`${classes.tabPaneInnerTitle} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                            order={2}
                                        >
                                            WORLD CLASS ENGINEERING
                                        </Title>
                                        <div
                                            className={`${classes.contentBlock} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Text className={classes.p1}>
                                                We employ the top AI-engineers in the world. We combine their
                                                intelligence with the insight and experience of dozens of the most
                                                successful bid and proposal writing professionals. Our team has invested
                                                over 50,000 hours into defining the elements of compelling competitive
                                                prose and overcoming the complexities, challenges, and nuances involved
                                                in building software that wins more work and saves more time.
                                            </Text>
                                            <Text>
                                                We have developed a unique approach for optimising language. Our tool
                                                effectively conveys ideas and arguments by tailoring proposals to match
                                                the linguistic patterns, preferences, and nuances of the target
                                                audience.
                                            </Text>
                                        </div>
                                        <div
                                            className={`${classes.btnWrapper} fade-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Button href="#" component="a" size="xl" className={classes.tabPaneBtn}>
                                                LEARN MORE
                                            </Button>
                                        </div>
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="tab_nav_2" pt="xs" className={classes.tabPane}>
                                    <div className={classes.tabBgImg}>
                                        <img
                                            src="assets/images/White-Neuron-Net-black-background-16x9-1-e1711384909137.png"
                                            sizes="(min-width: 768px) 80rem, 100vw"
                                            alt="White Neuron Net black and white background"
                                        />
                                    </div>
                                    <div className={classes.tabPaneInner}>
                                        <Title
                                            className={`${classes.tabPaneInnerTitle} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                            order={2}
                                        >
                                            LINGUISTIC ENGINEERING
                                        </Title>
                                        <div
                                            className={`${classes.contentBlock} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Text className={classes.p1}>
                                                We have developed a unique approach for optimising language to
                                                effectively convey ideas and arguments by tailoring proposals to match
                                                the linguistic patterns, preferences, and nuances of the target
                                                audience.
                                            </Text>
                                            <Text>
                                                An integral part of our approach is our distinctive methodology for
                                                sourcing and choosing linguistic ingredients or ‘LINGs’. These are
                                                chosen to enhance credibility and persuasiveness based on a tiered
                                                evidence system. LINGs are specific linguistic elements designed to make
                                                writing more compelling. They can be sourced from both public and
                                                proprietary sources.
                                            </Text>
                                        </div>
                                        <div
                                            className={`${classes.btnWrapper} fade-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Button href="#" component="a" size="xl" className={classes.tabPaneBtn}>
                                                LEARN MORE
                                            </Button>
                                        </div>
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="tab_nav_3" pt="xs" className={classes.tabPane}>
                                    <div className={classes.tabBgImg}>
                                        <img
                                            src="assets/images/White-Neuron-Net-black-background-16x9-1-e1711384909137.png"
                                            sizes="(min-width: 768px) 80rem, 100vw"
                                            alt="White Neuron Net black and white background"
                                        />
                                    </div>
                                    <div className={classes.tabPaneInner}>
                                        <Title
                                            className={`${classes.tabPaneInnerTitle} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                            order={2}
                                        >
                                            YOUR KNOWLEDGE LIBRARY
                                        </Title>
                                        <div
                                            className={`${classes.contentBlock} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Text className={classes.p1}>
                                                Enhance your knowledge management and gain significant improvements and
                                                increased efficiency of up to 85%. With AutogenAI, you can effortlessly
                                                retrieve, locate, and adapt all the information in your knowledge
                                                library with the click of a button.
                                            </Text>
                                            <Text>
                                                AutogenAI leverages the rich content within your database of past
                                                winning bids, sales and marketing collateral, and product and service
                                                information to generate brand-new bid-winning responses.
                                            </Text>
                                        </div>
                                        <div
                                            className={`${classes.btnWrapper} fade-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Button href="#" component="a" size="xl" className={classes.tabPaneBtn}>
                                                LEARN MORE
                                            </Button>
                                        </div>
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="tab_nav_4" pt="xs" className={classes.tabPane}>
                                    <div className={classes.tabBgImg}>
                                        <img
                                            src="assets/images/White-Neuron-Net-black-background-16x9-1-e1711384909137.png"
                                            sizes="(min-width: 768px) 80rem, 100vw"
                                            alt="White Neuron Net black and white background"
                                        />
                                    </div>
                                    <div className={classes.tabPaneInner}>
                                        <Title
                                            className={`${classes.tabPaneInnerTitle} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                            order={2}
                                        >
                                            THE BEST UX/UI
                                        </Title>
                                        <div
                                            className={`${classes.contentBlock} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Text className={classes.p1}>
                                                AutogenAI has been designed specifically for bid writers. The tool fits
                                                seamlessly into your bid writing workflow, meaning you get all the
                                                efficiency benefits without changing the way you work.
                                            </Text>
                                            <Text>
                                                Not only do we provide software to help you write high quality bids in a
                                                fraction of the time, our training and adoption team are with you every
                                                step of the way to ensure you are making the most of the technology. We
                                                assist throughout the adoption process, ensuring a smooth transition and
                                                promoting continuous learning.
                                            </Text>
                                        </div>
                                        <div
                                            className={`${classes.btnWrapper} fade-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Button href="#" component="a" size="xl" className={classes.tabPaneBtn}>
                                                LEARN MORE
                                            </Button>
                                        </div>
                                    </div>
                                </Tabs.Panel>
                            </div>
                        </Tabs>
                    </div>
                </Container>
            </section>
        </>
    );
}
