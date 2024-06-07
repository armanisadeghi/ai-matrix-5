"use client";

import React, { useEffect, useRef } from "react";
import { ActionIcon, ActionIconProps, Group, MantineSize, Burger, Menu } from "@mantine/core";
import {
    IconArrowBarToDown,
    IconArrowBarToUp,
    IconBell,
    IconPalette,
    IconSearch,
    IconSettings2
} from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import Link from "next/link";
import { PATH_USER } from "@/routes";
import { useLayout } from "@/context/LayoutContext";
import { useHeader } from "@/context/HeaderContext";
import AmeNavButton from "@/ui/buttons/AmeNavButton";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { FaRegUser } from "react-icons/fa";
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { headerHeightDirectAtom } from "@/context/atoms/layoutAtoms";

const actionProps: ActionIconProps = {
    variant: "light",
};

type Props = {
    state: "large" | "medium" | "hidden";
    tabletMatch?: boolean;
};

export function Header({ state, tabletMatch }: Props) {
    const { toggleOpened, opened } = useLayout();
    const { headerState, handleCollapse, handleExpand } = useHeader();
    const [headerHeight, setHeaderHeight] = useRecoilState(headerHeightDirectAtom);

    useEffect(() => {
        switch (state) {
            case "large":
                setHeaderHeight(80);
                break;
            case "medium":
                setHeaderHeight(70);
                break;
            default:
                setHeaderHeight(0);
                break;
        }
    }, [state, setHeaderHeight]);

    const componentSize: MantineSize = headerState === "large" ? "md" : "sm";

    return (
        <Group h="100%" px="md" align="center" justify="space-between" style={{ flexWrap: "nowrap" }}>
            <Group>
                <Burger opened={opened} onClick={toggleOpened} hiddenFrom="sm" size="sm" />
                <Logo />
                <Group visibleFrom="sm">
                    {state === "medium" && (
                        <Group justify="flex-end" gap="xs">
                            <AmeActionIcon title="shrink header" onClick={handleCollapse} {...actionProps}>
                                <IconArrowBarToUp size={18} />
                            </AmeActionIcon>
                            <AmeActionIcon title="expand header" onClick={handleExpand} {...actionProps}>
                                <IconArrowBarToDown size={18} />
                            </AmeActionIcon>
                        </Group>
                    )}

                    {state === "large" && (
                        <Group justify="flex-end" gap="xs">
                            <AmeActionIcon title="shrink header" onClick={handleCollapse} {...actionProps}>
                                <IconArrowBarToUp size={18} />
                            </AmeActionIcon>
                        </Group>
                    )}
                </Group>
            </Group>
            <Group visibleFrom="sm" style={{ flexGrow: 1, justifyContent: "center" }}>
                <AmeNavButton asIcon navigateTo="back" />
                <AmeNavButton asIcon navigateTo="next" />
                <AmeSearchInput
                    size={componentSize}
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: "1 1 auto", minWidth: "60px", maxWidth: tabletMatch ? "350px" : "500px" }}
                    visibleFrom="sm"
                />
            </Group>
            <Group>
                <AmeActionIcon hiddenFrom="md" size={componentSize} title="search">
                    <IconSearch size={18} />
                </AmeActionIcon>
                <ColorSchemeToggle size={componentSize} />
                <AmeActionIcon title="notifications" size={componentSize}>
                    <IconBell size={18} />
                </AmeActionIcon>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <ActionIcon title="user menu" variant="transparent">
                            <FaRegUser />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            component={Link}
                            href={PATH_USER.tabs("personal")}
                            leftSection={<IconSettings2 size={16} />}
                        >
                            Settings
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            href={PATH_USER.tabs("appearance")}
                            leftSection={<IconPalette size={16} />}
                        >
                            Appearance
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}
