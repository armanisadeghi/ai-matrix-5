import NewChatInput from '@/app/trials/chat/core-chat-trials/components/NewChatInput';
import ChatSummaries from '@/app/trials/recoil/loadable-trial/Component1';
import React from 'react';
import AtomTesterComponent from '@/app/trials/grids/components/AtomTesterComponent';
import { AllUserChatsComponent } from '@/app/trials/grids/components/AllUserChatsComponent';
import AmeGridLayout from 'ui/layout/AmeGridLayout/AmeGridLayout';
import { SystemMessageComponent } from './components/SystemMessageComponent';
import { ChatDetailsComponent } from './components/ChatDetailsComponent';
import { ActiveUserChatComponent } from './components/ActiveUserChatComponent';
import { ActiveChatMessagesComponent } from './components/ActiveChatMessagesComponent';
import { UserInputComponent } from './components/UserInputComponent';

const ChatPage: React.FC = () => {
    const gridItems = [
        {
            title: '*chatSummaries Atom (AllUserChatsComponent)',
            content: <AllUserChatsComponent />
        },
        {
            title: '*chatSummaries Atom (AtomTesterComponent)',
            content: <AtomTesterComponent />
        },
        {
            title: 'Chat Summaries Sidebar list',
            content: <ChatSummaries />
        },
        {
            title: 'User Text Input',
            content: <NewChatInput />
        },
        {
            title: 'System & liveChatsAtomFamily',
            content: <SystemMessageComponent />
        },
        {
            title: 'chatMessagesSelector: Chat Messages Loadable',
            content: <ChatDetailsComponent />
        },
        {
            title: 'Active User & Chat',
            content: <ActiveUserChatComponent />
        },
        {
            title: 'activeChatMessagesArray',
            content: <ActiveChatMessagesComponent />
        },
        {
            title: 'Chat Messages',
            content: <UserInputComponent />
        },
    ];

    return (
        <div style={{ width: '100%', maxWidth: '1350px', margin: '0 auto' }}>
            <AmeGridLayout
                items={gridItems}
                columns={3}
                rowHeight={300}
                containerWidth="100%"
                widthUnits={9}
                heightUnits={1}

            />
        </div>
    );
};

export default ChatPage;
