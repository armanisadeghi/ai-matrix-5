// components/AiChat/UserInput/handleSubmitMessage.tsx

import { useState } from 'react';
import StreamOpenai from '../../../app/samples/chats/hooks/openAiStream';
import { useRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "../../../app/samples/ai-tests/shared/atoms/chatAtoms";
import { MessageEntry, Role } from '@/types/chat';

export const useHandleSubmitMessage = (handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [streamTrigger, setStreamTrigger] = useState(false);

    const handleSubmitMessage = async (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
        const text = textareaRef.current?.value || '';
        const userInputMessage = text.trim();

        if (userInputMessage) {
            const newUserMessage: MessageEntry = {
                role: 'user',
                text: userInputMessage,
            };

            // Add the user message to the array of messages
            const updatedMessages = [...activeChatMessagesArray, newUserMessage];
            setActiveChatMessagesArray(updatedMessages);

            handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
            textareaRef.current?.focus();

            // Trigger StreamOpenai component
            setStreamTrigger(true);
        }
    };

    return { handleSubmitMessage, streamTrigger, setStreamTrigger };
};
