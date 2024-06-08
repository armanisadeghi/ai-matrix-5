// hooks/useChatLogic.ts
import { useState, useEffect, useRef } from 'react';
import saveMessageToDb from "@/app/samples/ai-tests/shared/services/saveMessageToDb";
import { useMediaQuery } from '@mantine/hooks';

const useChatLogic = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [opened, setOpened] = useState(false);
    const [userInput, setUserInput] = useState('');
    const textareaContainerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (textareaContainerRef.current) {
            const handleResize = () => {
                setBottomPadding(textareaContainerRef.current!.offsetHeight + 0);
            };
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        console.log('UserMessageArea container ref:', textareaContainerRef.current);
    }, [textareaContainerRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            console.log("DEBUG Received:", userInput);

            const MessageEntry = {
                role: 'user',
                text: userInput.trim()
            };

            try {
                const result = saveMessageToDb(MessageEntry);
                console.log('Message added successfully:', result);
            } catch (error) {
                console.error('There was a problem adding the message:', error);
            }

            setUserInput('');
        }
    };

    return {
        bottomPadding,
        opened,
        setOpened,
        userInput,
        handleInputChange,
        handleSendMessage,
        textareaContainerRef,
        isSmallScreen,
    };
};

export default useChatLogic;
