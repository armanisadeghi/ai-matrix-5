import { Box, Title, Text, Container, Button } from "@mantine/core";
import classes from "./simpleContent.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function SimpleContent() {
    const elementsRef = useScrollAnimation(250);
    const elementsRef2 = useScrollAnimation(500);
    const elementsRef3 = useScrollAnimation(750);

    return (
        <section className={classes.sectionTitle}>
            <Container className={classes.myContainer}>
                <div className={classes.row}>
                    <div className={classes.columnContent}>
                        <Box
                            className={`${classes.titleBox} animate-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                        >
                            <Title className={classes.title} order={2} pb="0.4445em">
                                AutogenAI's commitment to trust
                            </Title>
                            <div className={classes.borderLine}></div>
                        </Box>
                        <Text
                            className={`${classes.text} animate-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef2.current.push(el)}
                        >
                            Trust is at the core of our business and embedded in everything we do. Businesses around the
                            globe rely on AutogenAI to write winning prose, increase the quantity and quality of the
                            proposals they submit, and gain a competitive edge for their most sensitive and
                            time-critical bids. AutogenAI maintains the secure environments they’ve come to trust.
                        </Text>
                        <div
                            className={`${classes.btnWrapper} fade-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef3.current.push(el)}
                        >
                            <Button href="#" component="a" size="xl" className={classes.btn}>
                                LEARN MORE
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
