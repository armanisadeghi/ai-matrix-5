'use client';

import { activeChatIdAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { quickChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import AmeResponsiveSlider from '@/ui/slider/AmeResponsiveSlider';
import AmeTextAreaFancyDynamic from '@/ui/textarea/AmeTextAreaFancyDynamic';
import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { activeUserAtom } from '@/state/userAtoms';
import { useDisclosure } from '@mantine/hooks';

const NewChatInput: React.FC = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const router = useRouter();
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [triggerSimulation, setTriggerSimulation] = useState(false);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [opened, { open, close }] = useDisclosure(false);

    const handleComplete = () => {
        console.log('Assistant response simulation complete');
        close();
    };


    const handleSubmit = async (text: string) => {
        console.log('handleSubmit');
        setUserTextInput(text);
        handleOpenModal();

        if (!activeUser?.matrixId || text.trim() === '') return;

        try {
            //const newChat = await startNewChat();
            const newChatId = activeChatId;

            if (newChatId) {
                setUserTextInput('');
                setTriggerSimulation(true);
                router.push(`/trials/core-chat-trial/${newChatId}`);
            } else {
                console.error('Failed to get a valid chat ID');
            }
        } catch (error) {
            console.error('Error starting new chat:', error);
        }
    };

    const handleOpenModal = () => {
        open();
    };

    return (
        <>
            <AmeTextAreaFancyDynamic
                label="Let's get started..."
                placeholder="Ask anything..."
                settingAtomNames={quickChatSettingsList}
                modalType={'default'}
                fileUploadEnabled={true}
                onSubmit={handleSubmit}
                additionalDiv={<AmeResponsiveSlider />}
            />

            <Modal opened={opened} onClose={close} withCloseButton={false}>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{userTextInput}</pre>
            </Modal>
        </>
    );
};

export default NewChatInput;
