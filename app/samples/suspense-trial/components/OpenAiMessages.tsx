'use client';

import React, { useState, useRef } from 'react';
import { Button, Grid, Slider, Space, Textarea, Text, Paper, ActionIcon } from "@mantine/core";
import { MessageEntry } from "@/types/chat";
import { submitChatRequest } from "../../ai-tests/shared/services/SteamOpenAi";
import { GiArtificialHive } from "react-icons/gi";
import { LiaEditSolid } from "react-icons/lia";
import { atom, useRecoilState } from 'recoil';

const ResponseTextArea: React.FC<{ response: string }> = ({response}) => {
    return (
        <Grid>
            <Grid.Col span={2} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <GiArtificialHive size={22} style={{color: 'gray'}}/>
            </Grid.Col>
            <Grid.Col span={10} style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Text style={{marginLeft: '10px'}}> {response || "Loading..."}</Text>
            </Grid.Col>
        </Grid>
    );
};

const UserMessagePaper: React.FC<{ userMessage: string }> = ({userMessage}) => {
    return (
        <Paper p="md">
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text style={{marginLeft: '150px'}}>
                        {userMessage}
                        <ActionIcon variant="light" size="md" aria-label="Edit Message">
                            <LiaEditSolid/>
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const responseRef = useRef<string>('');
    const [responsesState, setResponsesState] = useRecoilState(responsesStateAtom);
    const [fullResponse, setFullResponse] = useRecoilState(fullResponseAtom);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userMessage: MessageEntry = {
            role: 'user',
            text: message,
        };

        responseRef.current = '';
        setResponsesState((prevResponses) => [...prevResponses, {
            userMessage: message,
            response: ''
        }]);
        setMessage('');

        await submitChatRequest(
            [userMessage],
            (chunk) => {
                responseRef.current += chunk;
                setResponsesState((prevResponses) => {
                    const newResponses = [...prevResponses];
                    const lastIndex = newResponses.length - 1;
                    newResponses[lastIndex] = {
                        ...newResponses[lastIndex],
                        response: responseRef.current
                    };
                    return newResponses;
                });
            },
            (finalMessage) => {
                setFullResponse(finalMessage);
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
                                    <UserMessagePaper userMessage={entry.userMessage} />
                                    <ResponseTextArea response={entry.response} />
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Space h={8}/>
                            <Textarea value={userTextInput} onChange={(e) => setUserTextInput(e.target.value)} />
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
