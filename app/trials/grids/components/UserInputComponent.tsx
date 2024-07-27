'use client';

// components/UserInputComponent.tsx
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Loader } from '@mantine/core';
import AmeTextAreaFancyDynamic from '@/ui/textarea/AmeTextAreaFancyDynamic';
import AmeResponsiveSlider from '@/ui/slider/AmeResponsiveSlider';
import { userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { quickChatSettingsList } from '@/state/aiAtoms/settingsAtoms';

export const UserInputComponent: React.FC = () => {
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (text: string) => {
        console.log('User input:', text);
        setUserTextInput(text);
        try {
            setIsLoading(true);
            //await startNewChat();
        } catch (error) {
            console.error('Error starting new chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        isLoading ? (
            <Loader color="blue" type="dots"/>
        ) : (
            <AmeTextAreaFancyDynamic
                label="Let's get started..."
                placeholder="Ask anything..."
                settingAtomNames={quickChatSettingsList}
                modalType={'default'}
                fileUploadEnabled={true}
                onSubmit={handleSubmit}
                additionalDiv={<AmeResponsiveSlider/>}
            />
        )
    );
};
