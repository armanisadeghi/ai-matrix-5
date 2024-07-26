// app/trials/grids/ChatPage.tsx
import NewChatInput from '@/app/trials/chat/core-chat-trials/components/NewChatInput';
import ChatSummaries from '@/app/trials/recoil/loadable-trial/Component1';
import React from 'react';
import { ActiveChatMessagesComponent } from '@/app/trials/grids/components/ActiveChatMessagesComponent';
import { ActiveUserChatComponent } from '@/app/trials/grids/components/ActiveUserChatComponent';
import { ChatDetailsComponent } from '@/app/trials/grids/components/ChatDetailsComponent';
import { SystemMessageComponent } from '@/app/trials/grids/components/SystemMessageComponent';
import { UserInputComponent } from '@/app/trials/grids/components/UserInputComponent';
import AmeGridLayoutAdjustable from '@/ui/layout/AmeDragGirdPlus/AmaGridUpgraded';
import AtomTesterComponent from '@/app/trials/grids/components/AtomTesterComponent';
import { AllUserChatsComponent } from '@/app/trials/grids/components/AllUserChatsComponent';

const ChatPage: React.FC = () => {
    const gridItems = [
        {
            title: '*chatSummaries Atom (AllUserChatsComponent)',
            content: <AllUserChatsComponent />,
            locked: false,
            minimized: false
        },
        {
            title: '*chatSummaries Atom (AtomTesterComponent)',
            content: <AtomTesterComponent />,
            locked: false,
            minimized: false
        },
        {
            title: 'Chat Summaries Sidebar list',
            content: <ChatSummaries />,
            locked: false,
            minimized: false
        },
        {
            title: 'User Text Input',
            content: <NewChatInput />,
            locked: false,
            minimized: false
        },
        {
            title: 'System & liveChatsAtomFamily',
            content: <SystemMessageComponent />,
            locked: false,
            minimized: false
        },
        {
            title: 'chatMessagesSelector: Chat Messages Loadable',
            content: <ChatDetailsComponent />,
            locked: false,
            minimized: false
        },
        {
            title: 'Active User & Chat',
            content: <ActiveUserChatComponent />,
            locked: false,
            minimized: false
        },
        {
            title: 'activeChatMessagesArray',
            content: <ActiveChatMessagesComponent />,
            locked: false,
            minimized: false
        },
        {
            title: 'Chat Messages',
            content: <UserInputComponent />,
            locked: false,
            minimized: false
        },
    ];

    return (
        <div style={{ width: '100%', maxWidth: '1350px', margin: '0 auto' }}>
            <AmeGridLayoutAdjustable
                items={gridItems}
                cols={{ lg: 2, md: 2, sm: 1, xs: 1 }}
                breakpoints={{ lg: 1200, md: 996, sm: 776, xs: 480 }}
                rowHeight={300}
                containerWidth="100%"
                widthUnits={1}
                heightUnits={1}
                containerPadding={[10, 10]}
                margin={[10, 10]}
                isResizable={true}
                isDraggable={true}
                compactType="vertical"
            />
        </div>
    );
};

export default ChatPage;
