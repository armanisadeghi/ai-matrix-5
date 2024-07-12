'use client';

import ChatSummaries from '@/app/trials/core-chat-trial/components/ChatSummaries';
import AmeTestCard from '@/app/trials/core-chat-trial/ui/AmeTestingCard';
import { activeChatIdAtom, activeChatMessagesArrayAtom, chatSummariesAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { quickChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import { activeUserAtom } from '@/state/userAtoms';

import AmeJsonInput from '@/ui/json/AmeJsonInput';
import AmeResponsiveSlider from '@/ui/slider/AmeResponsiveSlider';
import AmeTextAreaFancyDynamic from '@/ui/textarea/AmeTextAreaFancyDynamic';
import { Textarea, Button, Space, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import NewChatInput from './components/NewChatInput';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ChatPage: React.FC = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const [systemMessage, setSystemMessage] = useRecoilState(systemMessageAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [chatSummary, setChatSummary] = useRecoilState(chatSummariesAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    const startNewChat = useStartNewChat();
    const [isLoading, setIsLoading] = useState(false);

    const icon = <IoCreateOutline size={14}/>;

    const formattedText = messages.filter(message => message.role === 'user' || message.role === 'assistant').map(message => `${message.role}: ${message.text}`).join('\n\n');

    const rowHeight = 300;
    const handleNewChat = () => {
        //setActiveChatMessages([]);
    };

    useEffect(() => {
        setSystemMessage('You are the best assistant ever!');
    }, [setSystemMessage]);

    const handleSubmit = async (text: string) => {
        console.log('User input:', text);
        setUserTextInput(text);
        try {
            setIsLoading(true);
            await startNewChat();
        }
        catch (error) {
            console.error('Error starting new chat:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    // Define the initial layout
    const gridLayout = [
        {i: 'allUserChats', x: 0, y: 0, w: 10, h: 26},
        {i: 'chatSummaries', x: 11, y: 0, w: 10, h: 26},
        {i: 'newChatInput', x: 0, y: 0, w: 10, h: 26},
        {i: 'systemMessage', x: 11, y: 0, w: 10, h: 26},
        {i: 'chatDetails', x: 0, y: 11, w: 10, h: 26},
        {i: 'activeChatId', x: 0, y: 11, w: 10, h: 26},
        {i: 'activeUser', x: 11, y: 11, w: 10, h: 26},
        {i: 'userInput', x: 11, y: 11, w: 10, h: 26},
    ];

    return (
        <div>
            <GridLayout
                className="layout"
                layout={gridLayout}
                cols={20}
                rowHeight={2}
                width={1350}
                draggableHandle=".draggable-handle"
                isResizable={true}
                resizeHandles={['se']}
            >
                <div key="allUserChats">
                    <AmeTestCard rowHeight={rowHeight} title="*chatSummaries Atom" scrollbar={true}>
                        <AmeJsonInput
                            value={JSON.stringify(chatSummary || '', null, 2)}
                            readOnly
                            autosize
                            label=""
                        />
                    </AmeTestCard>
                </div>

                <div key="chatSummaries">
                    <AmeTestCard rowHeight={rowHeight} title="Chat Summaries Sidebar list" scrollbar={true}>
                        <ChatSummaries/>
                    </AmeTestCard>
                </div>
                <div key="newChatInput">
                    <AmeTestCard rowHeight={rowHeight} title="User Text Input" scrollbar={true}>
                        <NewChatInput/>
                    </AmeTestCard>
                </div>

                <div key="systemMessage">
                    <AmeTestCard rowHeight={rowHeight} title="System & liveChatsAtomFamily " scrollbar={true}>
                        <Textarea
                            value={systemMessage}
                            readOnly
                            autosize
                        />
                        <Space h="md"/>
                        <Textarea
                            value={formattedText}
                            readOnly
                            minRows={15}
                            autosize
                        />
                        <Space h="md"/>
                        <Button
                            leftSection={icon}
                            onClick={handleNewChat}>
                            New Chat
                        </Button>
                    </AmeTestCard>
                </div>

                <div key="chatDetails">
                    <AmeTestCard rowHeight={rowHeight} title="chatMessagesSelector: Chat Messages Loadable" scrollbar={true}>
                        <Textarea
                            value={JSON.stringify(messages, null, 2)}
                            readOnly
                            minRows={15}
                            autosize
                            style={{flexGrow: 1}}
                        />
                    </AmeTestCard>
                </div>

                <div key="activeChatId">
                    <AmeTestCard rowHeight={rowHeight} title="Active User & Chat" scrollbar={true}>
                        <Textarea
                            value={activeUser?.fullName ?? ''}
                            readOnly
                            autosize
                        />
                        <Space h="md"/>
                        <Textarea
                            label="Active Chat ID"
                            value={activeChatId || ''}
                            readOnly
                            autosize
                        />
                    </AmeTestCard>
                </div>

                <div key="activeUser">
                    <AmeTestCard rowHeight={rowHeight} title="activeChatMessagesArray" scrollbar={true}>
                        <Textarea
                            value={JSON.stringify(activeChatMessagesArray, null, 2)}
                            readOnly
                            autosize
                        />
                    </AmeTestCard>
                    <Space h="sm"/>
                    <Textarea
                        value={JSON.stringify('Space for Lease', null, 2)}  // TODO: Replace chatMessagesArray
                        readOnly
                        autosize
                    />
                </div>

                <div key="userInput">
                    <AmeTestCard rowHeight={rowHeight} title="Chat Messages" scrollbar={true}>
                        {isLoading ? (
                            <Loader color="blue" type="dots"/>
                        ) : (
                            <AmeTextAreaFancyDynamic
                                label="Let's get started..."
                                placeholder="Ask anything..."
                                settingAtomNames={quickChatSettingsList}
                                modalType={'default'}
                                fileUploadEnabled={true}
                                onSubmit={handleSubmit}
                                additionalDiv={<AmeResponsiveSlider/>}
                            />
                        )}
                    </AmeTestCard>
                </div>
            </GridLayout>

            <div key="uniqueKey">
                <AmeTestCard rowHeight={rowHeight} title="New Title" scrollbar={true}>
                    <Textarea/>
                </AmeTestCard>
            </div>
            <div key="anotherUniqueKey">
                <AmeTestCard rowHeight={rowHeight} title="New Title" scrollbar={true}>
                    <Textarea/>
                </AmeTestCard>
            </div>


        </div>
    );
};

export default ChatPage;
