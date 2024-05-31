"use client";
import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconArrowBarToDown, IconArrowBarToUp } from "@tabler/icons-react";
import { useFooter } from "@/context/FooterContext";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface FooterProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Footer = ({ state }: FooterProps) => {
    const { handleExpand, handleCollapse } = useFooter();

    return (
        <Box p="xs">
            <AppShell.Section>
                {state === "compact" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleExpand} {...actionProps}>
                            <IconArrowBarToUp size={18} />
                        </ActionIcon>
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToDown size={18} />
                        </ActionIcon>
                    </Group>
                )}

                {state === "full" && (
                    <Group justify="flex-end" gap="xs">
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToDown size={18} />
                        </ActionIcon>
                    </Group>
                )}
                {state === "icons" && (
                    <Group justify="center" gap="xs">
                        <ActionIcon onClick={handleCollapse} {...actionProps}>
                            <IconArrowBarToDown size={18} />
                        </ActionIcon>
                    </Group>
                )}
            </AppShell.Section>

            <AppShell.Section>
                <Stack mt="md" gap="xs" align="stretch">
                    <Title>Footer</Title>
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
