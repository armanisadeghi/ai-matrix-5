'use client';

import {
    autoscrollStateAtom,
    leftSidebarAtom,
    overrideFlagAtom,
    presetTypeAtom,
    rightSidebarAtom
} from '@/state/layoutAtoms';
import { useAutoscroll } from '@/ui/layout/AmeCenterContent/useAutoscroll';
import React, { useRef, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ScrollArea } from '@mantine/core';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import styles from '@/ui/layout/AmeCenterContent/CenterContent.module.css';


interface PageLayoutProps {
    autoscroll?: boolean;
    children?: ReactNode;
    scrollAreaContent?: ReactNode;
    topSectionContent?: ReactNode;
    rightMenuSectionContent?: ReactNode;
    bottomSectionContent?: ReactNode;
    leftMenuSectionContent?: ReactNode;
    centerSectionWidth?: number;
    leftMenuSectionWidth?: number;
    rightMenuSectionWidth?: number;
}

const defaultProps: PageLayoutProps = {
    autoscroll: true,
    centerSectionWidth: 100,
    leftMenuSectionWidth: 0,
    rightMenuSectionWidth: 0,
};

const PrimaryLayout: React.FC<PageLayoutProps & { scrollAreaRef: React.RefObject<HTMLDivElement> }> = React.memo(
    ({topSectionContent, scrollAreaContent, bottomSectionContent, scrollAreaRef}) => {
        return (
            <div className={styles['ame-centerContent-container']}>
                <div className={styles['ame-centerContent-leftGapColumn']}></div>
                <div className={styles['ame-centerContent-centerColumn']}>
                    <div className={styles['ame-centerContent-topSection']}>{topSectionContent}</div>
                    <ScrollArea
                        scrollbarSize={4}
                        scrollHideDelay={100}
                        className={styles['ame-centerContent-mainContent']}
                        viewportRef={scrollAreaRef}
                    >
                        {scrollAreaContent}
                    </ScrollArea>
                    <div className={styles['ame-centerContent-bottomSection']}>{bottomSectionContent}</div>
                </div>
                <div className={styles['ame-centerContent-rightGapColumn']}></div>
            </div>
        );
    }
);

const CenterLayout: React.FC<PageLayoutProps> = (props) => {
    const {
        scrollAreaContent,
        topSectionContent,
        rightMenuSectionContent,
        bottomSectionContent,
        leftMenuSectionContent,
        centerSectionWidth = 100,
        leftMenuSectionWidth = 0,
        rightMenuSectionWidth = 0,
    } = {...defaultProps, ...props};

    const setRightSidebarWidth = useSetRecoilState(rightSidebarAtom);
    const setLeftSidebarWidth = useSetRecoilState(leftSidebarAtom);
    const setPresetType = useSetRecoilState(presetTypeAtom);
    const setOverrideFlag = useSetRecoilState(overrideFlagAtom);

    const scrollAreaRef = useAutoscroll();

    useEffect(() => {
        setOverrideFlag(true);
        setPresetType('centerContent');
    }, []);

    useEffect(() => {
        if (leftMenuSectionContent !== undefined && leftMenuSectionWidth > 0) {
            setLeftSidebarWidth(50);
        }
        if (rightMenuSectionContent !== undefined && rightMenuSectionWidth > 0) {
            setRightSidebarWidth(0);
        }
    }, [leftMenuSectionContent, leftMenuSectionWidth, rightMenuSectionContent, rightMenuSectionWidth, setLeftSidebarWidth, setRightSidebarWidth]);


    const memoizedSections = useMemo(() => {
        const sections = [];
        const sizes = [];

        if (leftMenuSectionContent !== undefined && leftMenuSectionWidth > 0) {
            sections.push(
                <div key="leftMenu" className={styles['ame-centerContent-leftMenu']}>
                    {leftMenuSectionContent}
                </div>
            );
            sizes.push(leftMenuSectionWidth);
        }

        sections.push(
            <PrimaryLayout
                key="centerContent"
                topSectionContent={topSectionContent}
                scrollAreaContent={scrollAreaContent}
                bottomSectionContent={bottomSectionContent}
                scrollAreaRef={scrollAreaRef}
            />
        );
        sizes.push(centerSectionWidth);

        if (rightMenuSectionContent !== undefined && rightMenuSectionWidth > 0) {
            sections.push(
                <div key="rightMenu" className={styles['ame-centerContent-rightMenu']}>
                    {rightMenuSectionContent}
                </div>
            );
            sizes.push(rightMenuSectionWidth);
        }

        return {sections, sizes};
    }, [leftMenuSectionContent, leftMenuSectionWidth, topSectionContent, scrollAreaContent, bottomSectionContent, centerSectionWidth, rightMenuSectionContent, rightMenuSectionWidth]);

    if (memoizedSections.sections.length === 1) {
        return memoizedSections.sections[0] as React.ReactElement;
    }

    return (
        <VerticalSplitter initialSizes={memoizedSections.sizes} expandToMin={true}>
            {memoizedSections.sections}
        </VerticalSplitter>
    );
};

export default React.memo(CenterLayout);
