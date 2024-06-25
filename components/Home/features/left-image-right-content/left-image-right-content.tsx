import { Title, Text, Grid, Image, Container } from "@mantine/core";
import classes from "../features.module.css";
import { useScrollAnimation } from "@/hooks/annimation/useScrollAnimation";
interface Description {
    bigtext: string;
    smalltext: string;
}

interface Content {
    maintitle: string;
    subtitle: string;
    description: Description[];
}

interface LeftImageRightContentProps {
    dataProps: {
        content: Content;
        image: string;
    };
}

const LeftImageRightContent: React.FC<LeftImageRightContentProps> = ({ dataProps }) => {
    const elementsRef = useScrollAnimation(250);
    return (
        <>
            <section className={classes.sectionFeatures}>
                <Container className={classes.myContainer}>
                    <div className={classes.rowWrapper}>
                        <div className={classes.columnContentWrapper}>
                            <Grid justify="center" align="center" className={classes.rowGrid}>
                                <Grid.Col span={{ xs: 12, sm: 5 }} className={classes.columnContentSecond}>
                                    <div className="imgWrapper">
                                        <Image
                                            src={dataProps.image}
                                            alt={dataProps.content.maintitle}
                                            className="anim-fade-in"
                                        />
                                    </div>
                                </Grid.Col>
                                <Grid.Col span={{ xs: 12, sm: 5 }} className={classes.columnContentFirst}>
                                    <div className={classes.headerWrapper}>
                                        <div
                                            className={`animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                        >
                                            <Title className={classes.mainTitle} order={3} pb="0.4445em">
                                                {dataProps.content.maintitle}
                                            </Title>
                                            <div className={classes.leftBorderLine}></div>
                                        </div>
                                        <Title
                                            className={`${classes.subTitle} animate-on-scroll`}
                                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                            order={4}
                                        >
                                            {dataProps.content.subtitle}
                                        </Title>
                                    </div>
                                    <div
                                        className="textWrapper animate-on-scroll"
                                        ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                                    >
                                        {dataProps.content.description.map((item, index) => (
                                            <div className={classes.descWrapper} key={index}>
                                                <Title className={classes.descTitle} order={5}>
                                                    {item.bigtext}
                                                </Title>
                                                <Text className={classes.descText}>{item.smalltext}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </Grid.Col>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default LeftImageRightContent;
