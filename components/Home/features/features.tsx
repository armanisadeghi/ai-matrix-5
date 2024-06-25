import { Box, Title } from "@mantine/core";
import RightImageLeftContent from "./right-image-left-content/right-image-left-content";
import LeftImageRightContent from "./left-image-right-content/left-image-right-content";
import { useScrollAnimation } from "@/hooks/annimation/useScrollAnimation";

import classes from "./features.module.css";

const rightImgleftDataFirst = {
    content: {
        maintitle: "Draft",
        subtitle: "Reduce drafting time by 70%",
        description: [
            {
                bigtext: "Creative Ideation",
                smalltext: "Automatically generate winning bid ideas for a competitive edge in seconds.",
            },
            {
                bigtext: "Evidenced Ideation",
                smalltext:
                    "Effortlessly source proprietary and public knowledge to incorporate credible evidence into proposals.",
            },
            {
                bigtext: "Contextualised Ideation",
                smalltext: "Tailor ideas to project-specific requirements, increasing success chances.",
            },
            {
                bigtext: "Story-Boarding",
                smalltext: "We help create storyboards for better communication of ideas.",
            },
        ],
    },
    image: `${process.env.PUBLIC_URL}/assets/images/Draft-2.png`,
};

const leftImgleftDataFirst = {
    content: {
        maintitle: "Edit",
        subtitle: "85% Increase In Productivity",
        description: [
            {
                bigtext: "Case Study Insertion",
                smalltext: "AutogenAI integrates relevant case studies to showcase expertise.",
            },
            {
                bigtext: "Statistics Insertion",
                smalltext: "AutogenAI grounds assertions in empirical evidence.",
            },
            {
                bigtext: "“Tell me how” Evidencing",
                smalltext: "AutogenAI explains how proposed solutions deliver value.",
            },
            {
                bigtext: "Evidenced Winning Prose Evaluation",
                smalltext: "AutogenAI evaluates the effectiveness of written content.",
            },
        ],
    },
    image: `${process.env.PUBLIC_URL}/assets/images/Edit-2.png`,
};

const rightImgleftDataSecond = {
    content: {
        maintitle: "Elevate",
        subtitle: "241% Increase In Success Rates",
        description: [
            {
                bigtext: "Easy Incorporation of Win Themes, Issues, and Requirements",
                smalltext: "AutogenAI simplifies alignment of proposals with evaluators’ themes and requirements.",
            },
            {
                bigtext: "Scoring Criteria Analysis",
                smalltext: "AutogenAI analyses scoring criteria and makes improvement recommendations.",
            },
            {
                bigtext: "Mega-Extraction and Mega-Transformations",
                smalltext: "AutogenAI reads large quantities of text and extracts meaning.",
            },
            {
                bigtext: "Embedded Semantic Research Tool",
                smalltext: "AutogenAI ensures proposals are well-informed and completely current.",
            },
        ],
    },
    image: `${process.env.PUBLIC_URL}/assets/images/Elevate-2.png`,
};

export function FeatureSection() {
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
                            <Title className={classes.title} order={2} pb="0.4445em">
                                Our key features
                            </Title>
                            <div className={classes.borderLine}></div>
                        </Box>
                    </div>
                </div>
            </section>
            <RightImageLeftContent dataProps={rightImgleftDataFirst} />
            <LeftImageRightContent dataProps={leftImgleftDataFirst} />
            <RightImageLeftContent dataProps={rightImgleftDataSecond} />
        </>
    );
}
