import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeChatIdAtom, activeChatMessagesArrayAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { v4 as uuidv4 } from 'uuid';

const useDynamicTextareaLogic = () => {
    const [userInput, setUserInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [streamTrigger, setStreamTrigger] = useState(false);
    const activeChatId = useRecoilValue(activeChatIdAtom);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = async (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
        const text = textareaRef.current?.value || '';

        setUserTextInput(text.trim());
        if (userTextInput) {
            const newUserMessage = {
                chatId: activeChatId!,
                createdAt: new Date().toISOString(),
                id: uuidv4(),
                index: activeChatMessagesArray.length,
                role: 'user',
                text: userTextInput,
            };

            const updatedMessages = [...activeChatMessagesArray, newUserMessage];
            setActiveChatMessagesArray(updatedMessages);

            handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
            textareaRef.current?.focus();

            setStreamTrigger(true);

            useStartNewChat();  // TODO CHAT UPDATE - I added this in place of the old code, but it's not doing this properly.
        }
    };

    return {
        userInput,
        handleInputChange,
        handleSendMessage,
        textareaRef,
        streamTrigger,
        setStreamTrigger,
    };
};

export default useDynamicTextareaLogic;

function useStartNewChat() {
    throw new Error('Function not implemented.');
}
