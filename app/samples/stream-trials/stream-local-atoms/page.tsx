'use client';

import React, { useState, useRef } from 'react';
import { Button, Grid, Slider, Space, Textarea, Text, Paper, ActionIcon } from "@mantine/core";
import { MessageEntry } from "@/types/chat";
import { submitChatRequest } from "../../ai-tests/shared/services/SteamOpenAi";
import { atom, useRecoilState } from 'recoil';
import { GiArtificialHive } from "react-icons/gi";
import { LiaEditSolid } from "react-icons/lia";
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages,
} from "../../ai-tests/shared/atoms/chatAtoms";


const ResponseTextArea: React.FC<{ response: string }> = ({ response }) => {
    return (
        <Grid>
            <Grid.Col span={1} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <GiArtificialHive size={18} style={{ color: 'gray' }} />
            </Grid.Col>
            <Grid.Col span={11} style={{ display: 'flex', alignItems: 'flex-start' , justifyContent: 'flex-start'}}>
                <Text style={{ marginLeft: '10px', whiteSpace: 'pre-wrap' }}> {response || "Loading..."}</Text>
            </Grid.Col>
        </Grid>
    );
};

const UserMessagePaper: React.FC<{ userMessage: string }> = ({ userMessage }) => {
    return (
        <Paper p="md">
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text style={{ marginLeft: '150px' }}>
                        {userMessage}
                        <ActionIcon variant="transparent" color={"dark"} size="sm" aria-label="Edit Message">
                            <LiaEditSolid />
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default function ChatInterface() {
    const responseRef = useRef<string>('');
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [userMessageEntry, setUserMessageEntry] = useRecoilState(userMessageEntryAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [assistantMessageEntry, setAssistantMessageEntry] = useRecoilState(assistantMessageEntryAtom);
    const [messages, setMessages] = useState<{ userMessage: string, response: string }[]>([]);
    const activeChatMessagesArray = useChatMessages();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userMessage: MessageEntry = {
            role: 'user',
            text: userTextInput,
        };

        setUserMessageEntry(userMessage);
        responseRef.current = '';
        setMessages((prevMessages) => [...prevMessages, { userMessage: userTextInput, response: '' }]);
        setUserTextInput('');

        await submitChatRequest(
            [userMessage],
            (chunk) => {
                responseRef.current += chunk;
                setAssistantTextStream(responseRef.current);
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1].response = responseRef.current;
                    return newMessages;
                });
            },
            (finalMessage) => {
                setAssistantMessageEntry(finalMessage);
            }
        );
    };

    return (
        <div>
            <Grid>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={7}>
                    <div>
                        <div>
                            {messages.map((entry, index) => (
                                <div key={index}>
                                    <UserMessagePaper userMessage={entry.userMessage}/>
                                    <ResponseTextArea response={entry.response}/>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Space h={8}/>
                            <Textarea value={userTextInput} onChange={(e) => setUserTextInput(e.target.value)}/>
                            <Space h={4}/>

                            <Grid>
                                <Grid.Col span={7}>
                                    <Slider color="gray" size="xs" min={0} max={10}/>

                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Button type="submit">Submit</Button>
                                </Grid.Col>
                                <Grid.Col span={2}></Grid.Col>
                            </Grid>

                        </form>
                    </div>
                </Grid.Col>
                <Grid.Col span={2}></Grid.Col>
            </Grid>
        </div>
    );
}
