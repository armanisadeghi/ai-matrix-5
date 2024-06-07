"use client";
import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconArrowBarToDown, IconArrowBarToUp } from "@tabler/icons-react";
import { useFooter } from "@/context/FooterContext";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerHeightDirectAtom } from "@/context/atoms/layoutAtoms";

const actionProps: ActionIconProps = {
    variant: "light",
};

interface FooterProps {
    state: "full" | "compact" | "icons" | "hidden";
}

export const Footer = ({ state }: FooterProps) => {
    const { handleExpand, handleCollapse } = useFooter();
    const [footerHeight, setFooterHeight] = useRecoilState(footerHeightDirectAtom);

    useEffect(() => {
        switch (state) {
            case "full":
                setFooterHeight(200);
                break;
            case "compact":
                setFooterHeight(150);
                break;
            case "icons":
                setFooterHeight(70);
                break;
            default:
                setFooterHeight(0);
                break;
        }
    }, [state, setFooterHeight]);

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
