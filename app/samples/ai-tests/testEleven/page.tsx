'use client';

import React from 'react';
import { useStreamChat } from './hooks/useStreamChat';
import { Space, Textarea, Grid, Button } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom, assistantTextStreamAtom, userTextInputAtom } from '@/state/aiAtoms/chatAtoms';
import styles from './Chat.module.css';
import ResponseArea from './components/Response/ResponseArea';

const Chat: React.FC = () => {
    const { handleSubmit } = useStreamChat();
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);

    return (
        <div>
            <div >
                <div>
                    <ResponseArea />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Textarea
                            className="w-full p-2 border border-gray-300 rounded shadow-xl"
                            placeholder="Say something..."
                            value={userTextInput}
                            onChange={(event) => setUserTextInput(event.currentTarget.value)}
                            minRows={3}
                            autosize
                        />
                        <Button type="submit" className="mt-2">
                            Send
                        </Button>
                    </form>
                </div>
            </div>
            <div>
                <Grid>
                    <Grid.Col span={4}>
                        <Textarea
                            label="Array Atom Value"
                            value={JSON.stringify(activeChatMessagesArray, null, 2)}
                            minRows={10}
                            autosize
                            resize="both"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Textarea
                            label="Assistant Text Stream"
                            value={assistantTextStream}
                            minRows={10}
                            autosize
                            resize="both"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Textarea
                            label="User Text Input"
                            value={userTextInput}
                            minRows={10}
                            autosize
                            resize="both"
                        />
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
};

export default Chat;
