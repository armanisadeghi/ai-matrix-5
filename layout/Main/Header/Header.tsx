"use client";

import React, { useState, useEffect, useRef } from "react";
import { Group, MantineSize } from "@mantine/core";
import { IconBell, IconMenu, IconSearch } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
import { headerAtom, showLeftSidebarToggle, showRightSidebarToggle } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";
import { UserMenu } from "@/components/User/UserMenu";
import { IoApps } from "react-icons/io5";

type Props = {
    tabletMatch?: boolean;
};

// TODO: Kevin... The styling for the header needs some work. It's definitely my fault.
// I don't have time to fix it, but I want to make sure you don't make the search bar any bigger
// I also want to make sure you don't mess up the icon styles (They need to be transparent)
// But for the tabletMatch, proper spacing, making sure they don't wrap, etc, please do what you need.
// Lastly, if you need to, we can make the logo slightly smaller as well.
// I also noticed the search icon doesn't work, but I wonder if maybe I messed it up. Not sure.


export function Header({ tabletMatch }: Props) {
    const { user } = useUser();
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const headerHeight = useRecoilValue(headerAtom);
    const showLeftSidebar = useRecoilValue(showLeftSidebarToggle);
    const showRightSidebar = useRecoilValue(showRightSidebarToggle);
    const { toggleSize } = useToggleSizes();
    const [isSearchHidden, setIsSearchHidden] = useState(true);
    const [logoSize, setLogoSize] = useState(200); // Initial logo size
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user && !activeUser) {
            setActiveUser(user as any);
        }
    }, [user, activeUser, setActiveUser]);

    useEffect(() => {
        const handleResize = () => {
            if (headerRef.current) {
                const headerWidth = headerRef.current.offsetWidth;
                const hasEnoughSpace = headerWidth >= 700;
                setIsSearchHidden(!hasEnoughSpace);
                if (hasEnoughSpace) {
                    setLogoSize(200);
                } else {
                    setLogoSize(100);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const componentSize: MantineSize = headerHeight > 100 ? "md" : "sm";

    return (
        <Group
            ref={headerRef}
            h="100%"
            px="md"
            align="center"
            justify="space-between"
            style={{ flexWrap: "nowrap", overflow: "hidden" }}
        >
            <Group style={{ flex: 1, justifyContent: "flex-start", flexShrink: 0 }}>
                {showLeftSidebar && (
                <AmeActionIcon
                    variant="transparent"
                    tooltip="toggle sidebar"
                    size={componentSize}
                    onClick={() => toggleSize('leftSidebar')}
                >
                    <IconMenu size={18} />
                </AmeActionIcon>
                )}

                <div style={{ width: logoSize, flexShrink: 0 }}>
                    <Logo />
                </div>
            </Group>

            {/* Center Section */}
            <Group
                style={{
                    flex: 1,
                    justifyContent: "center",
                    display: isSearchHidden ? "none" : "flex",
                    minWidth: 0, // Ensure the search section can shrink
                }}
            >
                <AmeSearchInput
                    size={componentSize}
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: "1 1 auto", minWidth: "40px", maxWidth: "450px" }}
                />
            </Group>

            {/* Right Section */}
            <Group style={{ flex: 1, justifyContent: "flex-end", flexShrink: 0 }}>
                <AmeActionIcon variant="transparent" hiddenFrom="md" size={componentSize} tooltip="search">
                    <IconSearch size={18} />
                </AmeActionIcon>
                <ColorSchemeToggle size={componentSize} />
                <AmeActionIcon variant="transparent" tooltip="notifications" size={componentSize}>
                    <IconBell size={18} />
                </AmeActionIcon>

                {showRightSidebar && (
                <AmeActionIcon
                    variant="transparent"
                    tooltip="toggle sidebar"
                    size={componentSize}
                    onClick={() => toggleSize('rightSidebar')}
                >
                    <IconMenu size={18} />
                </AmeActionIcon>
                )}

                <AmeActionIcon variant="transparent" tooltip="apps" size={componentSize}>
                    <IoApps size={18} />
                </AmeActionIcon>
                <UserMenu componentSize={componentSize} />
            </Group>
        </Group>
    );
}
