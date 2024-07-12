import { ResponseArea } from '@/components/AiChat';
import AutoFetch from '@/components/AiChat/new/AutoFetch';
import React, { ReactNode, useMemo } from 'react';
import UserInputArea from '@/app/dashboard/intelligence/ai-chat/components/UserInputArea';
import ChatSidebar from '@/components/AiChat/Sidebar/ChatList';
import CenterLayout from '@/ui/layout/AmeCenterContent/CenterLayout';


type Props = {
    children: ReactNode;
};

const MemoizedUserInputArea = React.memo(UserInputArea);
const MemoizedChatSidebar = React.memo(ChatSidebar);
const MemoizedCenterLayout = React.memo(CenterLayout);

export default function Layout({children}: Props) {

    const memoizedLayout = useMemo(() => (
        <>
            <MemoizedCenterLayout
                bottomSectionContent={<MemoizedUserInputArea/>}
                centerSectionWidth={83}
                rightMenuSectionContent={<MemoizedChatSidebar/>}
                rightMenuSectionWidth={17}
                scrollAreaContent={<ResponseArea className="responseTextArea" bottomPadding={200}/>}
            />
            {children}
        </>
    ), [children]);

    return (
        <AutoFetch>
            {memoizedLayout}
        </AutoFetch>
    );
}

