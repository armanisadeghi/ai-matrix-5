'use client';
import React from 'react';
import useDynamicLayout from '@/hooks/ai/useDynamicChatLayout';
import ResponseArea from "@/components/AiChat/Response/ResponseArea";
import responseStyles from '@/components/AiChat/Response/ResponseArea.module.css';
import textareaStyles from '@/components/AiChat/UserInput/DynamicTextarea.module.css';
import containerStyles from './AiChat.module.css';
import AmeTextAreaFancyDynamic from "@/ui/textarea/AmeTextAreaFancyDynamic";
import ResponsiveSlider from "@/components/AiChat/UserInput/settings/MatrixSlider/ResponsiveSlider";
import { simpleChatSettingsList } from "@/state/aiAtoms/settingsAtoms";

const ChatsPage = () => {
    const { bottomPadding, containerHeight, textareaContainerRef } = useDynamicLayout();

    return (
        <div className={containerStyles.container} style={{ height: containerHeight }}>
            <ResponseArea className={responseStyles.container} bottomPadding={bottomPadding} />
            <AmeTextAreaFancyDynamic
                className={textareaStyles.dynamicTextareaContainer}
                label="Let's get started..."
                placeholder="Enter your request or question here..."
                ref={textareaContainerRef}
                modalType="default"
                settingAtomNames={simpleChatSettingsList}
            />
            <ResponsiveSlider />
        </div>
    );
};

export default ChatsPage;
