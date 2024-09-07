"use client";

import AmeButton from "@/ui/buttons/AmeButton";
import AmeText from "@/ui/typography/AmeText";
import { Box, BoxProps, Collapse, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ReactNode, useRef } from "react";
type CollapsibleSectionProps = BoxProps & {
    children: ReactNode;
    title: string;
    defaultOpened?: boolean;
};

export function CollapsibleSection({ children, title, defaultOpened = true, ...others }: CollapsibleSectionProps) {
    const [opened, { toggle }] = useDisclosure(defaultOpened);
    const collapsibleRef = useRef(null);

    return (
        <Box ref={collapsibleRef} {...others}>
            <AmeButton
                title={title}
                my="sm"
                leftSection={opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                variant="transparent"
                px={0}
                onClick={toggle}
            >
                <AmeText fw={600} fz="sm">
                    {title}
                </AmeText>
            </AmeButton>

            <Collapse in={opened}>{children}</Collapse>
            {!opened && <Divider />}
        </Box>
    );
}
