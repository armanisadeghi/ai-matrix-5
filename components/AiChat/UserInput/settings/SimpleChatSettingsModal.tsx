// chat-app/nice-working/settings/simpleChatSettingsModal.tsx
'use client';

import React from 'react';
import { useRecoilState } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Select, Space } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import {
    aiPreferencesMainAtom,
    aiPreferencesSecondAtom,
    makeSmallTalkAtom,
    quickAnswerAtom,
    improveQuestionsAtom,
    submitOnEnterAtom
} from '@/state/aiAtoms/settingsAtoms';
import AmeFieldset from '@/ui/fieldset/AmeFieldset';
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox';
import { aiPreferencesMainOptions, aiPreferencesSecondOptions } from "@/utils/config/chatSettingsOptions";

const SimpleChatSettingsModal: React.FC<{ opened: boolean; onClose: () => void }> = ({ opened, onClose }) => {
    const [aiPreferencesMain, setAiPreferencesMain] = useRecoilState(aiPreferencesMainAtom);
    const [aiPreferencesSecond, setAiPreferencesSecond] = useRecoilState(aiPreferencesSecondAtom);
    const [makeSmallTalk, setMakeSmallTalk] = useRecoilState(makeSmallTalkAtom);
    const [quickAnswer, setQuickAnswer] = useRecoilState(quickAnswerAtom);
    const [improveQuestions, setImproveQuestions] = useRecoilState(improveQuestionsAtom);
    const [submitOnEnter, setSubmitOnEnter] = useRecoilState(submitOnEnterAtom);

    const handleSubmit = () => {
        // Handle submit logic if needed
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Customize your experience"
            centered
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            scrollAreaComponent={ScrollArea.Autosize}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <AmeFieldset
                legend="Matrix Chat Settings"
                layout="single"
                fieldsetWidth="100%"
                showButton={true}
                onButtonClick={handleSubmit} // Pass the handleSubmit function
            >
                <AmeCheckbox
                    label="Submit on Enter"
                    checked={submitOnEnter}
                    onChange={(e) => setSubmitOnEnter(e.currentTarget.checked)}
                />
                <AmeCheckbox
                    label="Make Small Talk"
                    checked={makeSmallTalk}
                    onChange={(e) => setMakeSmallTalk(e.currentTarget.checked)}
                />
                <AmeCheckbox
                    label="Quick Answer"
                    checked={quickAnswer}
                    onChange={(e) => setQuickAnswer(e.currentTarget.checked)}
                />
                <AmeCheckbox
                    label="Improve Questions"
                    checked={improveQuestions}
                    onChange={(e) => setImproveQuestions(e.currentTarget.checked)}
                />
                <Select
                    label="AI Preferences"
                    data={aiPreferencesMainOptions}
                    value={aiPreferencesMain}
                    onChange={(value) => setAiPreferencesMain(value || '')}
                />
                <Select
                    label="Secondary Preference"
                    data={aiPreferencesSecondOptions}
                    value={aiPreferencesSecond}
                    onChange={(value) => setAiPreferencesSecond(value || '')}
                />
            </AmeFieldset>
        </Modal>
    );
};

export default SimpleChatSettingsModal;
