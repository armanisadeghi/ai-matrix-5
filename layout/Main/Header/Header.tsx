"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Group, MantineSize } from "@mantine/core";
import { IconBell, IconMenu, IconSearch } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useRecoilValue } from "recoil";
import { headerAtom, showLeftSidebarToggle, showRightSidebarToggle } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";
import { UserMenu } from "@/components/User/UserMenu";
import { IoApps } from "react-icons/io5";

type Props = {
    tabletMatch?: boolean;
};

interface LeftSectionProps {
    showLeftSidebar: boolean;
    toggleSize: (element: 'leftSidebar' | 'rightSidebar', rate?: number) => void;
    componentSize: MantineSize;
    logoSize: number;
}


const LeftSection = React.memo(({ showLeftSidebar, toggleSize, componentSize, logoSize }: LeftSectionProps) => (
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
));

interface CenterSectionProps {
    isSearchHidden: boolean;
    componentSize: MantineSize;
}

const CenterSection = React.memo(({ isSearchHidden, componentSize }: CenterSectionProps) => (
    <Group
        style={{
            flex: 1,
            justifyContent: "center",
            display: isSearchHidden ? "none" : "flex",
            minWidth: 0,
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
));

interface RightSectionProps {
    showRightSidebar: boolean;
    toggleSize: (element: 'leftSidebar' | 'rightSidebar', rate?: number) => void;
    componentSize: MantineSize;
}

const RightSection = React.memo(({ showRightSidebar, toggleSize, componentSize }: RightSectionProps) => (
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
));

export const Header = React.memo(function Header({ tabletMatch }: Props) {
    const headerHeight = useRecoilValue(headerAtom);
    const showLeftSidebar = useRecoilValue(showLeftSidebarToggle);
    const showRightSidebar = useRecoilValue(showRightSidebarToggle);
    const { toggleSize } = useToggleSizes();
    const [isSearchHidden, setIsSearchHidden] = useState(true);
    const [logoSize, setLogoSize] = useState(200);
    const headerRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback(() => {
        if (headerRef.current) {
            const headerWidth = headerRef.current.offsetWidth;
            const hasEnoughSpace = headerWidth >= 700;
            setIsSearchHidden(!hasEnoughSpace);
            setLogoSize(hasEnoughSpace ? 200 : 100);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    const componentSize: MantineSize = useMemo(() =>
        headerHeight > 100 ? "md" : "sm", [headerHeight]
    );

    return (
        <Group
            ref={headerRef}
            h="100%"
            px="md"
            align="center"
            justify="space-between"
            style={{ flexWrap: "nowrap", overflow: "hidden" }}
        >
            <LeftSection
                showLeftSidebar={showLeftSidebar}
                toggleSize={toggleSize}
                componentSize={componentSize}
                logoSize={logoSize}
            />
            <CenterSection
                isSearchHidden={isSearchHidden}
                componentSize={componentSize}
            />
            <RightSection
                showRightSidebar={showRightSidebar}
                toggleSize={toggleSize}
                componentSize={componentSize}
            />
        </Group>
    );
});
