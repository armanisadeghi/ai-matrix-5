// app/trials/stream-tester/components/userEngagement.tsx
import React, { useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Container, Textarea, Button, Stack, ScrollArea, Paper } from '@mantine/core';
import useMessageStreamer from '../hooks/useMessageStreamer';
import { v4 as uuidv4 } from 'uuid';
import { activeChatIdAtom, isNewChatAtom, userTextInputAtom, hasSubmittedMessageAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';

interface MessageProps {
    message: MessageType;
}

const UserMessage: React.FC<MessageProps> = ({message}) => (
    <Paper shadow="xs" p="xs" style={{marginLeft: '15rem'}}>
        <Textarea
            value={message.text}
            variant="filled"
            autosize
            placeholder="Input placeholder"
        />
    </Paper>
);

const AssistantMessage: React.FC<MessageProps> = ({message}) => (
    <div>
        <p>{message.text}</p>
    </div>
);

const BasicUserComponent: React.FC = () => {
    const [messageArray, setMessageArray] = useRecoilState(activeMessagesAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const userTextInput = useRecoilValue(userTextInputAtom);
    const setUserTextInput = useSetRecoilState(userTextInputAtom);
    const setHasSubmittedMessage = useSetRecoilState(hasSubmittedMessageAtom);
    const [streamTrigger, setStreamTrigger] = useRecoilState(triggerStreamChatAtom);

    const updateCallback = useCallback((chunk: string) => {
    }, []);

    const finalizeCallback = useCallback((fullResponse: MessageType) => {
        setStreamTrigger(false);
    }, [setStreamTrigger]);

    useMessageStreamer(updateCallback, finalizeCallback);

    const handleSubmit = useCallback(() => {
        if (userTextInput.trim()) {
            const newMessage: MessageType = {
                chatId: activeChatId!,
                role: 'user',
                index: messageArray.length,
                text: userTextInput,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
            };

            setMessageArray((prevArray) => [...prevArray, newMessage]);
            setStreamTrigger(true);
            setUserTextInput('');
            setHasSubmittedMessage(true);
            console.log('Message Array: ', messageArray);
        }
    }, [activeChatId, messageArray.length, setHasSubmittedMessage, setMessageArray, setStreamTrigger, setUserTextInput, userTextInput]);

    useEffect(() => {
        if (streamTrigger) {
            setStreamTrigger(false);
        }
    }, [streamTrigger, setStreamTrigger]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '0.5rem', boxSizing: 'border-box'}}>
            <ScrollArea style={{flex: 1, marginBottom: '1rem'}}>
                <Stack gap="xs" align="left" justify="flex-start" style={{display: 'flex', flexDirection: 'column', paddingLeft: '15rem', paddingRight: '15rem', boxSizing: 'border-box'}}
                >
                    {messageArray.filter(message => message.role === 'assistant' || message.role === 'user').map((message, index) => (
                        <div key={index}>
                            {message.role === 'user' ? (
                                <UserMessage message={message}/>
                            ) : (
                                <AssistantMessage message={message}/>
                            )}
                        </div>
                    ))}
                </Stack>
            </ScrollArea>
            <div style={{position: 'fixed', bottom: 0, width: '100%', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Container size="md" style={{display: 'flex', maxWidth: '800px', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Textarea
                        placeholder="Type your message..."
                        value={userTextInput}
                        onChange={(event) => setUserTextInput(event.currentTarget.value)}
                        style={{flex: 1, marginRight: '0.5rem'}}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Container>
            </div>
        </div>
    );
};

export default BasicUserComponent;
