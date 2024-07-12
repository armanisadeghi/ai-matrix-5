// Updated PageLayout component
'use client';

import { bottomSectionStateAtom, windowSizeStateAtom, autoscrollStateAtom } from '@/state/layoutAtoms';
import React, { useEffect, useRef, ReactNode } from 'react';
import { Box, Container, useMantineTheme } from '@mantine/core';
import { useRecoilState } from 'recoil';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
    bottomSection?: boolean;
    centerColumnMaxWidth?: number;
    gapColumnsMinWidth?: number;
    orderOfImportance?: string[];
    autoscroll?: boolean;
    fade?: boolean;
    bottomSectionOffset?: number;
    children?: ReactNode;
    bottomSectionContent?: ReactNode;
}

const defaultProps: PageLayoutProps = {
    bottomSection: false,
    centerColumnMaxWidth: 775,
    gapColumnsMinWidth: 0,
    orderOfImportance: ['Gap Columns', 'Navbar', 'Sidebar'],
    autoscroll: true,
    fade: false,
    bottomSectionOffset: 15,
};

const PageLayout: React.FC<PageLayoutProps> = (props) => {
    const {
        bottomSection,
        centerColumnMaxWidth,
        gapColumnsMinWidth,
        orderOfImportance,
        autoscroll,
        fade,
        bottomSectionOffset,
        children,
        bottomSectionContent,
    } = {...defaultProps, ...props};

    const theme = useMantineTheme();
    const [windowSize, setWindowSize] = useRecoilState(windowSizeStateAtom);
    const [bottomSectionState, setBottomSectionState] = useRecoilState(bottomSectionStateAtom);
    const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom);
    const contentRef = useRef<HTMLDivElement>(null);

    // Update window size state on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowSize]);

    // Handle autoscroll
    useEffect(() => {
        if (autoscroll && isAutoscroll && contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [isAutoscroll, autoscroll]);

    // Handle content scroll interaction
    const handleScroll = () => {
        if (autoscroll && isAutoscroll) {
            setIsAutoscroll(false);
        }
    };

    // Update bottom section visibility and offset
    useEffect(() => {
        setBottomSectionState({
            isVisible: bottomSection ?? false,
            offset: bottomSectionOffset ?? 15,
        });
    }, [bottomSection, bottomSectionOffset, setBottomSectionState]);

    // Set CSS variable for center column max width
    useEffect(() => {
        if (centerColumnMaxWidth) {
            document.documentElement.style.setProperty(
                '--center-column-max-width',
                `${centerColumnMaxWidth}px`
            );
        }
    }, [centerColumnMaxWidth]);

    return (
        <Container fluid className={styles.container}>
            {/* Left Gap Column */}
            <Box
                className={styles.leftGapColumn}
                style={{
                    minWidth: `${gapColumnsMinWidth}px`,
                    flexShrink: orderOfImportance?.indexOf('Gap Columns') !== -1 ? 1 : 0,
                }}
            />
            <Box className={styles.centerColumn}
                 style={{
                     maxWidth: `${centerColumnMaxWidth}px`,
                 }}>

                {/* Main Content */}
                <Box
                    ref={contentRef}
                    className={styles.mainContent}
                    onScroll={handleScroll}
                >
                    {children}
                </Box>

                {/* Bottom Section */}
                {bottomSectionState.isVisible && (
                    <Box
                        className={styles.bottomSection}
                    >
                        {bottomSectionContent}
                    </Box>
                )}
            </Box>

            {/* Right Gap Column */}
            <Box
                className={styles.rightGapColumn}
            />
        </Container>
    );
};

export default PageLayout;
