// layout/Primary/Header/Header.tsx
'use client';

import React, { useCallback } from "react";
import { HeaderLogic } from '@/layout/Primary/Header/HeaderLogic';
import { IconBell, IconMenu, IconSearch } from "@tabler/icons-react";
import { ColorSchemeToggle, Logo } from "@/components";
import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { UserMenu } from "@/components/User/UserMenu";
import { IoApps } from "react-icons/io5";
import AmeSearchInputOptimized from '@/ui/input/AmeSearchInputOptimized/AmeSearchInputOptimized';

const MemoizedLogo = React.memo(Logo);

export const Header = React.memo(function Header() {
    return (
        <HeaderLogic>
            {({
                  headerRef,
                  componentSize,
                  showLeftSidebar,
                  showRightSidebar,
                  logoSize,
                  isSearchHidden,
                  toggleSize,
              }) => {
                const handleLeftSidebarToggle = useCallback(() => toggleSize('leftSidebar'), [toggleSize]);
                const handleRightSidebarToggle = useCallback(() => toggleSize('rightSidebar'), [toggleSize]);

                return (
                    <div
                        ref={headerRef}
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 16px',
                            flexWrap: 'nowrap',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', flexShrink: 0 }}>
                            {showLeftSidebar && (
                                <AmeActionIcon
                                    variant="transparent"
                                    tooltip="toggle sidebar"
                                    size={componentSize}
                                    onClick={handleLeftSidebarToggle}
                                >
                                    <IconMenu size={18} />
                                </AmeActionIcon>
                            )}

                            <div style={{ width: logoSize, flexShrink: 0 }}>
                                <MemoizedLogo />
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                display: isSearchHidden ? 'none' : 'flex',
                                justifyContent: 'center',
                                minWidth: 0,
                            }}
                        >
                            <AmeSearchInputOptimized
                                size={componentSize}
                                radius="md"
                                placeholder="Search anything..."
                                leftSection={<IconSearch size={14} />}
                                style={{ flex: '1 1 auto', minWidth: '40px', maxWidth: '450px' }}
                            />
                        </div>

                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
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
                                    onClick={handleRightSidebarToggle}
                                >
                                    <IconMenu size={18} />
                                </AmeActionIcon>
                            )}

                            <AmeActionIcon variant="transparent" tooltip="apps" size={componentSize}>
                                <IoApps size={18} />
                            </AmeActionIcon>
                            <UserMenu componentSize={componentSize} />
                        </div>
                    </div>
                );
            }}
        </HeaderLogic>
    );
});
