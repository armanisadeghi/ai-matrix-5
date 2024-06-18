'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { autoscrollStateAtom } from './layoutAtoms';
import CenterContent from './CenterContent';
import styles from './CenterContent.module.css';
import AmeTextWithSlider, { AmeTextWithSliderProps } from '@/ui/textarea/AmeTextWithSlider';
import textareaStyles from '@/components/AiChat/UserInput/DynamicTextarea.module.css';
import { simpleChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import ResponseArea, { ResponseAreaProps } from '@/components/AiChat/Response/ResponseArea';
import useDynamicLayout from '@/hooks/ai/useDynamicChatLayout';

const Page: React.FC = () => {
    const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom);
    const contentRef = useRef<HTMLDivElement>(null);
    const { bottomPadding, textareaContainerRef } = useDynamicLayout();

    useEffect(() => {
        if (isAutoscroll && contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [isAutoscroll]);

    const handleScroll = useCallback(() => {
        if (isAutoscroll) {
            setIsAutoscroll(false);
        }
    }, [isAutoscroll, setIsAutoscroll]);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => {
                contentElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const responseAreaProps: Partial<ResponseAreaProps> = {}; // Define as necessary
    const ameTextWithSliderProps: Partial<AmeTextWithSliderProps> = {}; // Define as necessary

    return (
        <CenterContent
            textareaContainerRef={textareaContainerRef}
            ameTextWithSliderProps={ameTextWithSliderProps}
            simpleChatSettingsList={simpleChatSettingsList}
            mainContent={
                <div ref={contentRef}>
                    <ResponseArea bottomPadding={bottomPadding} {...responseAreaProps} />
                </div>
            }
            bottomContent={
                <AmeTextWithSlider
                    className={textareaStyles.dynamicTextareaContainer}
                    label="Let's get started..."
                    placeholder="Enter your request or question here..."
                    ref={textareaContainerRef}
                    modalType="default"
                    settingAtomNames={simpleChatSettingsList}
                    {...ameTextWithSliderProps}
                />
            }
        />
    );
};

export default Page;
