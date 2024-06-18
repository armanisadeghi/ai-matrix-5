// BottomSection component
import React from 'react';
import textareaStyles from '@/components/AiChat/UserInput/DynamicTextarea.module.css';
import { simpleChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import AmeTextWithSlider from "@/ui/textarea/AmeTextWithSlider";
import useDynamicLayout from "@/hooks/ai/useDynamicChatLayout";

const BottomSection: React.FC = () => {
    const { textareaContainerRef } = useDynamicLayout();

    return (
        <div>
            <AmeTextWithSlider
                className={textareaStyles.dynamicTextareaContainer}
                label="Let's get started..."
                placeholder="Enter your request or question here..."
                ref={textareaContainerRef}
                modalType="default"
                settingAtomNames={simpleChatSettingsList}
            />
        </div>
    );
};

export default BottomSection;
