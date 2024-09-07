"use client";

import AmeButton from "@/ui/buttons/AmeButton";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";
import { Avatar, Divider, Flex, Grid, Group, useMantineTheme } from "@mantine/core";
import { IconBookmarksFilled, IconChevronRight, IconHeartFilled, IconHourglass } from "@tabler/icons-react";
import { CollapsibleSection, CourseCarousel } from "../../components";

const interests = ["API Development", "Accessibility", "Accounting", "Advertising", "Algorithms"];

export default function HomePage() {
    const theme = useMantineTheme();

    return (
        <div>
            <AmeTitle mb="md">Welcome back</AmeTitle>

            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
                    <AmePaper p="sm" withBorder>
                        <Flex align="center" gap="sm" p="sm">
                            <Avatar>JO</Avatar>
                            <AmeText fw={600} tt="uppercase">
                                John
                            </AmeText>
                        </Flex>
                        <Divider my={2} />
                        <Flex align="center" gap="sm" p="sm">
                            <IconHourglass size={24} color={theme.colors.blue[6]} />
                            <Flex direction="column">
                                <AmeText fw={600}>In progress</AmeText>
                                <AmeText fz="sm">Pick up where</AmeText>
                            </Flex>
                        </Flex>
                        <Flex align="center" gap="sm" p="sm">
                            <IconHeartFilled size={24} color={theme.colors.red[6]} />
                            <Flex direction="column">
                                <AmeText fw={600}>Take a quick tour</AmeText>
                                <AmeText fz="sm">Learn with Matrix University</AmeText>
                            </Flex>
                        </Flex>
                        <Flex align="center" gap="sm" p="sm">
                            <IconBookmarksFilled size={24} color={theme.colors.orange[6]} />
                            <Flex direction="column">
                                <AmeText fw={600}>Bookmark a course</AmeText>
                                <AmeText fz="sm">From 10,000+ courses</AmeText>
                            </Flex>
                        </Flex>
                    </AmePaper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 9, xl: 10 }}>
                    <CourseCarousel isLarge />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
                    <AmeTitle order={6} mb="sm">
                        Pick your interests
                    </AmeTitle>
                    <AmePaper p="sm" withBorder style={{ height: "80%" }}>
                        <AmeText mb="sm" fz="sm">
                            You might like
                        </AmeText>
                        <Group>
                            {interests.map((item) => (
                                <AmeButton key={item} size="compact-sm" title={item}>
                                    {item}
                                </AmeButton>
                            ))}
                            <AmeButton rightSection={<IconChevronRight size={14} />} size="compact-sm" title="See more">
                                See More
                            </AmeButton>
                        </Group>
                    </AmePaper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 9, xl: 10 }}>
                    <AmeTitle order={6} mb="sm">
                        Get started with a quick course
                    </AmeTitle>
                    <CourseCarousel />
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <AmeTitle order={4} mb="md">
                        Browse by:
                    </AmeTitle>
                    <Divider />
                    <CollapsibleSection title="Category A">
                        <CourseCarousel />
                    </CollapsibleSection>
                    <CollapsibleSection title="Category B">
                        <CourseCarousel />
                    </CollapsibleSection>
                </Grid.Col>
            </Grid>
        </div>
    );
}
