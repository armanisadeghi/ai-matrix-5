'use client';

import React, { useState, useRef } from 'react';
import { Button, Grid, Slider, Space, Textarea, Text, Paper, ActionIcon } from "@mantine/core";
import { MessageEntry } from "@/types/chat";
import { submitChatRequest } from "../../ai-tests/shared/services/SteamOpenAi";
import { useRecoilState } from 'recoil';
import { GiArtificialHive } from "react-icons/gi";
import { LiaEditSolid } from "react-icons/lia";
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages,
} from "../../ai-tests/shared/atoms/chatAtoms";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './FullChat.module.css';
import AmeCodeHighlight from "@/ui/highlight/AmeCodeHighlight";
import {
    CustomTable,
    CustomTableHead,
    CustomTableBody,
    CustomTableRow,
    CustomTableCell,
    CustomTableHeaderCell,
} from './CustomTable';

const renderers = {
    code: ({ className, children }) => {
        const language = className ? className.replace('language-', '') : '';
        return (
            <AmeCodeHighlight
                code={String(children).trim()}
                language={language}
                title={language.charAt(0).toUpperCase() + language.slice(1)}
            />
        );
    },
    inlineCode: ({ children }) => <code>{children}</code>, // Handle inline code separately
    table: ({ children }) => <CustomTable>{children}</CustomTable>,
    thead: ({ children }) => <CustomTableHead>{children}</CustomTableHead>,
    tbody: ({ children }) => <CustomTableBody>{children}</CustomTableBody>,
    tr: ({ children }) => <CustomTableRow>{children}</CustomTableRow>,
    th: ({ children }) => <CustomTableHeaderCell>{children}</CustomTableHeaderCell>,
    td: ({ children }) => <CustomTableCell>{children}</CustomTableCell>,
    li: ({ children }) => (
        <li>
            {React.Children.map(children, (child) =>
                typeof child === 'string' ? (
                    child
                ) : (
                    <div>{child}</div>
                )
            )}
        </li>
    ), // Custom list item renderer to handle nested elements
    p: ({ children }) => <p>{children}</p>, // Custom paragraph renderer to handle text
};

const ResponseTextArea: React.FC<{ response: string }> = ({ response }) => {
    return (
        <Grid>
            <Grid.Col span={1} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <GiArtificialHive size={18} style={{ color: 'gray' }} />
            </Grid.Col>
            <Grid.Col span={11} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text className={styles.responseTextArea}>
                    <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]} components={renderers}>
                        {response || 'Loading...'}
                    </ReactMarkdown>
                </Text>
            </Grid.Col>
        </Grid>
    );
};

const UserMessagePaper: React.FC<{ userMessage: string }> = ({ userMessage }) => {
    return (
        <Paper p="md" className={styles.userMessagePaper}>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text className={styles.userMessage}>
                        <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]} components={renderers}>
                            {userMessage}
                        </ReactMarkdown>
                        <ActionIcon
                            className={styles.actionIcon}
                            variant="transparent"
                            color="dark"
                            size="sm"
                            aria-label="Edit Message"
                        >
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

                        <Space h={15}/>
                        <div>{assistantTextStream}</div>
                        <Space h={15}/>

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