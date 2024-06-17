"use client";

import { ActionIcon, ActionIconProps, AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useRecoilState } from "recoil";
import { footerAtom } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";

const actionProps: ActionIconProps = {
    variant: "light",
};

export const Footer = () => {
    const [footerHeight] = useRecoilState(footerAtom);
    const { toggleSize } = useToggleSizes();

    const handleToggle = () => {
        toggleSize('footer');
    };

    return (
        <Box p="xs">
            <AppShell.Section>
                <Group justify="flex-end" gap="xs">
                    <ActionIcon onClick={handleToggle} {...actionProps}>
                        {footerHeight === 0 ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                    </ActionIcon>
                </Group>
            </AppShell.Section>

            <AppShell.Section>
                <Stack mt="md" gap="xs" align="stretch">
                    <Title>Footer</Title>
                </Stack>
            </AppShell.Section>
        </Box>
    );
};
