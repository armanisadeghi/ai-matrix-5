import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { hasSubmittedMessageAtom, hookIdAtom, hookIndexAtom, streamTriggerAtomFamily, userInputAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import { activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import useActiveMessages from '@/hooks/ai/old/useActiveMessages';
import { useActiveChat } from '@/hooks/ai/old/useActiveChat';
import ReusableTextArea from './ReusableTextArea';
import { Container, Paper, Grid, Button, TextInput, Select, Group, ScrollArea, Stack, Loader, Textarea } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
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

const UserEngagement: React.FC = () => {
    const setHasSubmittedMessage = useSetRecoilState(hasSubmittedMessageAtom);
    const [activeMessages, setActiveMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const textAreaId = '1';
    const [userTextInput, setUserTextInput] = useRecoilState(userInputAtomFamily(textAreaId));
    const [extraMessage, setExtraMessage] = React.useState('');
    const [messageRole, setMessageRole] = React.useState<'user' | 'assistant' | 'system'>('user');
    const { activeChatId, setActiveChat, activeChat, chatSummaries } = useActiveChat();
    const { loading, error } = useActiveMessages();
    const hookId = useRecoilValue(hookIdAtom);
    const hookIndex = useRecoilValue(hookIndexAtom)
    const [, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId: hookId, index: hookIndex }));


    const handleChangeActiveChat = (chatId: string) => {
        const result = setActiveChat(chatId);
        console.log('Changed active chat:', result);
    };

    const handleExtraMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExtraMessage(e.currentTarget.value);
    };

    const handleMessageRoleChange = (value: string) => {
        setMessageRole(value as 'user' | 'assistant' | 'system');
    };

    const handleSubmit = () => {
        if (userTextInput.trim()) {
            const newMessage: MessageType = {
                chatId: activeChatId!,
                createdAt: new Date().toISOString(),
                id: uuidv4(),
                index: activeMessages.length,
                text: userTextInput,
                role: 'user',
            };

            const updatedMessages = [...activeMessages, newMessage];
            setActiveMessages(updatedMessages);

            console.log('activeMessages:', activeMessages);
            setHasSubmittedMessage(true);
            setStreamTrigger(true);
            setUserTextInput('');
        }
    };

    const addMessage = () => {
        if (extraMessage.trim()) {
            const newMessage: MessageType = {
                chatId: activeChatId!,
                createdAt: new Date().toISOString(),
                id: uuidv4(),
                index: activeMessages.length,
                text: extraMessage,
                role: messageRole,
            };

            const updatedMessages = [...activeMessages, newMessage];

            setActiveMessages(updatedMessages);

            console.log(activeMessages);
            setExtraMessage('');
        }
    };
    const saveMessagesToDb = () => {
        console.log('Saving messages to DB');
        // Implement your logic to save messages to the database
    };



    return (
        <Container fluid style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '1rem', overflow: 'hidden' }}>
            <Grid grow style={{ flex: 1, overflow: 'hidden' }}>
                <Grid.Col span={3} style={{ height: '100%' }}>
                    <Paper shadow="xs" p="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <span>Active Messages: {activeMessages?.length || 0}</span>
                        <h3>Chats</h3>
                        <ScrollArea style={{ flex: 1 }}>
                            <Stack gap="xs">
                                {chatSummaries.map(chat => (
                                    <Button
                                        key={chat.chatId}
                                        onClick={() => handleChangeActiveChat(chat.chatId)}
                                        variant={chat.chatId === activeChatId ? "filled" : "light"}
                                        style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                        size="xs"
                                    >
                                        {chat.chatTitle}
                                    </Button>
                                ))}
                            </Stack>
                        </ScrollArea>
                        <Button onClick={() => handleChangeActiveChat('new--------------------------------------------------------chat')} mt="md">New Chat</Button>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={9} style={{ height: '100%' }}>
                    <Paper shadow="xs" p="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Active Chat: {activeChat?.chatTitle}</h3>
                        <ScrollArea style={{ flex: 1, marginBottom: '1rem' }}>
                            {loading ? (
                                <Loader />
                            ) : error ? (
                                <div>Error: {error.message}</div>
                            ) : activeMessages ? (
                                <Stack gap="xs">
                                    {activeMessages.filter(message => message.role === 'assistant' || message.role === 'user').map((message, index) => (
                                        <div key={index}>
                                            {message.role === 'user' ? (
                                                <UserMessage message={message} />
                                            ) : (
                                                <AssistantMessage message={message} />
                                            )}
                                        </div>
                                    ))}
                                </Stack>
                            ) : null}
                        </ScrollArea>
                        <Group grow>
                            <TextInput
                                value={extraMessage}
                                onChange={handleExtraMessageChange}
                                placeholder="New message"
                            />
                            <Select
                                value={messageRole}
                                onChange={(_value, option) => handleMessageRoleChange(option.value)}
                                data={[
                                    { value: 'user', label: 'User' },
                                    { value: 'assistant', label: 'Assistant' },
                                    { value: 'system', label: 'System' }
                                ]}
                                placeholder="Select Role"
                            />
                            <Button onClick={addMessage}>Add Message</Button>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Paper shadow="xs" p="md" style={{ marginTop: '1rem' }}>
                <ReusableTextArea id={textAreaId} onCustomSubmit={handleSubmit} />
                <Group justify="flex-end" mt="md">
                    <Button onClick={saveMessagesToDb}>Save Messages</Button>
                </Group>
            </Paper>
        </Container>
    );
};

export default UserEngagement;

