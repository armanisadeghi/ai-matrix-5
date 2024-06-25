import { Container, Title, Button, Group, Text, Transition } from "@mantine/core";
import React, { useEffect, useState } from "react";

import classes from "./heroBanner.module.css";

const videoSrc = `${process.env.PUBLIC_URL}/assets/videos/art_of_the_possible-1080p.mp4`;

export const HeroBanner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <section className={classes.heroBanner}>
            <Container className={classes.myContainer}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Transition mounted={mounted} transition="fade-up" duration={1000} timingFunction="ease">
                            {(styles) => (
                                <div style={styles}>
                                    <Title className={classes.title} order={1} pb="0.4445em">
                                        Write high-quality, winning bids & proposals faster than ever.
                                    </Title>
                                    <div className={classes.borderLine}></div>
                                </div>
                            )}
                        </Transition>
                        <Transition mounted={mounted} transition="fade-up" duration={1500} timingFunction="ease">
                            {(styles) => (
                                <Text className={classes.text} style={styles}>
                                    Harness the power of augmented intelligence to write high-quality bids, proposals
                                    and tenders.
                                    <br />
                                    Use AutogenAI to create exceptional bids in minutes, not days.
                                </Text>
                            )}
                        </Transition>

                        <Transition mounted={mounted} transition="fade-up" duration={2500} timingFunction="ease">
                            {(styles) => (
                                <Group style={styles}>
                                    <Button
                                        component="a"
                                        href="#"
                                        /* radius="xl" */ size="xl"
                                        className={classes.control}
                                    >
                                        Book A Demo
                                    </Button>
                                </Group>
                            )}
                        </Transition>
                    </div>
                    <div className={classes.videoColumn}>
                        <Transition mounted={mounted} transition="fade-up" duration={2000} timingFunction="ease">
                            {(styles) => (
                                <video src={videoSrc} autoPlay loop controls className={classes.video} style={styles} />
                            )}
                        </Transition>
                    </div>
                </div>
            </Container>
        </section>
    );
};
