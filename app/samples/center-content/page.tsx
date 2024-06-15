// CenterContent.tsx
'use client';

import React, { useRef, ReactNode, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { autoscrollStateAtom } from './layoutAtoms';
import styles from './CenterContent.module.css';
import { ScrollArea } from '@mantine/core';
import AmeTextWithSlider, { AmeTextWithSliderProps } from '@/ui/textarea/AmeTextWithSlider';
import textareaStyles from '@/components/AiChat/UserInput/DynamicTextarea.module.css';
import { simpleChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import ResponseArea, { ResponseAreaProps } from '@/components/AiChat/Response/ResponseArea';
import useDynamicLayout from '@/hooks/ai/useDynamicChatLayout';

interface CenterContentProps {
    autoscroll?: boolean;
    fade?: boolean;
    children?: ReactNode;
    bottomSectionContent?: ReactNode;
    ameTextWithSliderProps?: Partial<AmeTextWithSliderProps>;
    responseAreaProps?: Partial<ResponseAreaProps>;
}

const defaultProps: CenterContentProps = {
    autoscroll: true,
    fade: true,
};

const CenterContent: React.FC<CenterContentProps> = (props) => {
    const {
        autoscroll,
        children,
        bottomSectionContent,
        ameTextWithSliderProps,
        responseAreaProps,
    } = { ...defaultProps, ...props };

    const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom);
    const contentRef = useRef<HTMLDivElement>(null);
    const { bottomPadding, textareaContainerRef } = useDynamicLayout();

    // Handle autoscroll
    useEffect(() => {
        if (autoscroll && isAutoscroll && contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [isAutoscroll, autoscroll, children]);

    // Handle content scroll interaction
    const handleScroll = useCallback(() => {
        if (autoscroll && isAutoscroll) {
            setIsAutoscroll(false);
        }
    }, [autoscroll, isAutoscroll, setIsAutoscroll]);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => {
                contentElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <div className={styles.container}>
            <div className={styles.leftGapColumn}></div>
            <div className={styles.centerColumn}>
                <ScrollArea h={250} scrollbarSize={4} scrollHideDelay={100} className={styles.mainContent}>
                    <div ref={contentRef}>
                        <ResponseArea bottomPadding={bottomPadding} {...responseAreaProps} />
                    </div>
                </ScrollArea>
                <div className={styles.bottomSection}>
                    <div>
                        <AmeTextWithSlider
                            className={textareaStyles.dynamicTextareaContainer}
                            label="Let's get started..."
                            placeholder="Enter your request or question here..."
                            ref={textareaContainerRef}
                            modalType="default"
                            settingAtomNames={simpleChatSettingsList}
                            {...ameTextWithSliderProps}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.rightGapColumn}></div>
        </div>
    );
};

export default CenterContent;
