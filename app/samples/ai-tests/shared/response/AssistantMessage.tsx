import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { Grid, Text } from '@mantine/core';
import { MessageEntry } from '@/types/chat';
import { GiArtificialHive } from "react-icons/gi";
import { activeChatMessagesArrayAtom } from "@/app/samples/ai-tests/shared/servicees/chatAtoms";
import { requestEventTaskAtom, requestIndexAtom, requestSocketEventAtom, requestSourceAtom } from "@/app/samples/ai-tests/shared/servicees/metadataAtoms";
import { callbackFunctionAtom } from "@/app/samples/ai-tests/shared/tests/TrialAtoms";

interface AssistantMessageProps {
    entryIndex: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ entryIndex }) => {
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);
    const message: MessageEntry | undefined = activeChatMessages[parseInt(entryIndex)];
    const setRequestEventTask = useSetRecoilState(requestEventTaskAtom);
    const setSocketEvent = useSetRecoilState(requestSocketEventAtom);
    const setRequestIndex = useSetRecoilState(requestIndexAtom);
    const setRequestSource = useSetRecoilState(requestSourceAtom);
    const setCallback = useSetRecoilState(callbackFunctionAtom);
    const setActiveMessages = useSetRecoilState(activeChatMessagesArrayAtom);

    useEffect(() => {
        if (message) {
            setRequestEventTask('directStream');
            setRequestIndex(0);
            setRequestSource('ai-tests');
            setSocketEvent(null);
            setCallback(() => (chunk: string) => {
                const newMessage: MessageEntry = { role: 'assistant', text: chunk };
                setActiveMessages(prevMessages => (prevMessages ? [...prevMessages, newMessage] : [newMessage]));
            });
        }
    }, [message, setRequestEventTask, setSocketEvent, setRequestIndex, setRequestSource, setCallback, setActiveMessages]);

    if (!message) {
        return null;
    }

    return (
        <Grid>
            <Grid.Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <GiArtificialHive size={22} style={{ color: 'gray' }} />
            </Grid.Col>
            <Grid.Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginLeft: '10px' }}>
                    {message.text || "Loading..."}
                </Text>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
