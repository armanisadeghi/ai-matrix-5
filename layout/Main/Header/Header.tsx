"use client";

import MicrophoneButton from '@/components/Audio/MicrophoneButton';
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ActionIcon, Center, Group, MantineSize, rem, RingProgress } from '@mantine/core';
import { IconBell, IconCheck, IconMenu, IconSearch, IconX } from '@tabler/icons-react';
import { ColorSchemeToggle, Logo } from "@/components";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { useRecoilValue } from "recoil";
import { headerAtom, showLeftSidebarToggle, showRightSidebarToggle } from "@/state/layoutAtoms";
import useToggleSizes from "@/hooks/layout/useToggleSizes";
import { UserMenu } from "@/components/User/UserMenu";
import { IoApps } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";

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

interface RightSectionProps {
    showRightSidebar: boolean;
    toggleSize: (element: 'leftSidebar' | 'rightSidebar', rate?: number) => void;
    componentSize: MantineSize;
    onSearchClick: () => void;
}

const RightSection = React.memo(({ showRightSidebar, toggleSize, componentSize, onSearchClick }: RightSectionProps) => (

    <Group style={{ flex: 1, justifyContent: "flex-end", flexShrink: 0 }}>
        <MicrophoneButton />

        <AmeActionIcon variant="transparent" size={componentSize} tooltip="search" onClick={onSearchClick}>
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

interface SearchComponentProps {
    isVisible: boolean;
    onClose: () => void;
    componentSize: MantineSize;
}

const SearchComponent = React.memo(({ isVisible, onClose, componentSize }: SearchComponentProps) => {
    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            zIndex: 1000,
            backgroundColor: 'var(--mantine-color-body)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '10px'
        }}>
            <Group>
                <AmeSearchInput
                    size={componentSize}
                    radius="md"
                    placeholder="Search anything..."
                    leftSection={<IconSearch size={14} />}
                    style={{ flex: 1 }}
                />
                <AmeActionIcon variant="transparent" size={componentSize} tooltip="Close search" onClick={onClose}>
                    <IconX size={18} />
                </AmeActionIcon>
            </Group>
        </div>
    );
});

export const Header = React.memo(function Header({ tabletMatch }: Props) {
    const headerHeight = useRecoilValue(headerAtom);
    const showLeftSidebar = useRecoilValue(showLeftSidebarToggle);
    const showRightSidebar = useRecoilValue(showRightSidebarToggle);
    const { toggleSize } = useToggleSizes();
    const [logoSize, setLogoSize] = useState(200);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleResize = useCallback(() => {
        if (headerRef.current) {
            const headerWidth = headerRef.current.offsetWidth;
            setLogoSize(headerWidth >= 700 ? 200 : 150);
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

    const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

    return (
        <>
            <Group
                ref={headerRef}
                h="100%"
                px="lg"
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
                <RightSection
                    showRightSidebar={showRightSidebar}
                    toggleSize={toggleSize}
                    componentSize={componentSize}
                    onSearchClick={toggleSearch}
                />
            </Group>
            <SearchComponent isVisible={isSearchVisible} onClose={toggleSearch} componentSize={componentSize} />
        </>
    );
});
