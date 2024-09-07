"use client";

import AmeActionIcon from "@/ui/button/AmeActionIcon";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";
import { Badge, Box, Card, CardProps, Center, Flex, Group, rem, useMantineTheme } from "@mantine/core";
import { IconBookmark, IconDots, IconEye, IconShare2 } from "@tabler/icons-react";
import classes from "./CourseCard.module.css";

type CourseCardProps = CardProps & {
    isLarge?: boolean;
    image: string;
    title: string;
    category: string;
};

export function CourseCard({ category, image, title, isLarge }: CourseCardProps) {
    const theme = useMantineTheme();

    return isLarge ? (
        <Card p="xl" radius="md" withBorder style={{ backgroundImage: `url(${image})` }} className={classes.largeCard}>
            <div className={classes.largeOverlay} />

            <Box className={classes.content} w={{ base: 200, sm: 400, lg: 200 }}>
                <Badge variant="dot">{category}</Badge>
                <AmeTitle order={5} my="xs" className={classes.title}>
                    {title}
                </AmeTitle>
                <Flex gap="xs" align="center">
                    <AmeText className={classes.bodyText} fz="sm">
                        John Doe
                    </AmeText>
                    <AmeText>|</AmeText>
                    <AmeText fz="sm">Course</AmeText>
                </Flex>
            </Box>
        </Card>
    ) : (
        <Card p="lg" className={classes.smallCard} radius="md" component="a" target="_blank" withBorder>
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />
            <div className={classes.smallOverlay} />

            <div className={classes.content} style={{ justifyContent: "flex-end" }}>
                <div>
                    <AmeText size="md" className={classes.title} fw={500} mb="xs">
                        {title}
                    </AmeText>

                    <Group justify="space-between" gap="xs">
                        <Group gap="sm">
                            <IconEye size={16} />
                            <AmeText size="sm" className={classes.bodyText}>
                                7847
                            </AmeText>
                        </Group>
                        <Group gap="sm">
                            <AmeActionIcon title="More">
                                <IconBookmark size={16} />
                            </AmeActionIcon>
                            <AmeActionIcon title="More">
                                <IconShare2 size={16} />
                            </AmeActionIcon>
                            <AmeActionIcon title="More">
                                <IconDots size={16} />
                            </AmeActionIcon>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}
