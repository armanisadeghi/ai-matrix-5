import { ActionIcon, Button, Flex, ScrollArea, Stack, useMantineTheme } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeTitle from "@/ui/typography/AmeTitle";
import useColorUtils from "@/utils/colorUtils";
import AmeButton from "@/ui/buttons/AmeButton";

interface SidebarItemData {
    id: string;
    name: string;
    value: string | number;
}

interface SidebarSectionProps {
    title: string;
    actionTitle: string;
    sectionItems: SidebarItemData[];
    onItemClick: (id: string) => void;
    onItemAction: (id: string) => void;
    onSectionAction: () => void;
}

const SidebarItem: React.FC<{
    item: SidebarItemData;
    onItemClick: (id: string) => void;
    onItemAction: (id: string) => void;
}> = ({ item, onItemClick, onItemAction }) => {
    const [hovered, setHovered] = useState(false);
    const { getDefaultBackgroundColor, getHoverBackgroundColor, getModerateTextColor } = useColorUtils();
    const theme = useMantineTheme();

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const handleIconClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            onItemAction(item.id);
        },
        [item.id, onItemAction],
    );

    return (
        <Flex
            mih={0}
            gap="0"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="nowrap"
            style={{ width: "100%", margin: "0", padding: "0" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onItemClick(item.id)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: hovered ? getHoverBackgroundColor() : getDefaultBackgroundColor(),
                    color: getModerateTextColor(),
                    transition: "background-color 0.3s",
                    padding: "0 5px",
                    position: "relative",
                    borderRadius: theme.radius.sm,
                }}
            >
                <div style={{ cursor: "pointer", padding: "0", margin: "0", width: "100%" }}>
                    <AmeActionTextInput
                        initialValue={`${item.name}: ${item.value}`}
                        editable={false}
                        variant={"unstyled"}
                        style={{
                            textDecoration: "none",
                            padding: "0",
                            width: "100%",
                        }}
                        highlightOnClick={false}
                    />
                </div>
                {hovered && (
                    <ActionIcon
                        variant="transparent"
                        size="xs"
                        style={{ cursor: "pointer", position: "absolute", right: 5 }}
                        onClick={handleIconClick}
                    >
                        <BsThreeDotsVertical />
                    </ActionIcon>
                )}
            </div>
        </Flex>
    );
};

const SidebarSection: React.FC<SidebarSectionProps> = ({
    title,
    sectionItems,
    onItemClick,
    onItemAction,
    onSectionAction,
    actionTitle,
}) => {
    return (
        <AmePaper withBorder p="xs">
            <AmeTitle order={6} mb="xs">
                {title}
            </AmeTitle>
            <ScrollArea h={150} scrollbarSize={4} scrollHideDelay={500}>
                <Stack gap={4}>
                    {sectionItems.map((item) => (
                        <SidebarItem key={item.id} item={item} onItemClick={onItemClick} onItemAction={onItemAction} />
                    ))}
                </Stack>
            </ScrollArea>
            <AmeButton title={actionTitle} fullWidth onClick={onSectionAction}>
                {actionTitle}
            </AmeButton>
        </AmePaper>
    );
};

export default SidebarSection;
