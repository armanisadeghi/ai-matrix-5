// ui/layout/AmeCenterContent/OptionalStarterPage.tsx
'use client';

// This is just a little sample page to help get you started, if you want to use this layout.

import { Textarea } from '@mantine/core';
import CenterLayout from '@/ui/layout/AmeCenterContent/CenterLayout';
import React from 'react';
import ResponseArea from '@/components/AiChat/Response/ResponseArea';
import useDynamicLayout from '@/hooks/ai/useDynamicChatLayout';
import OptionalBottomSection from '@/ui/layout/AmeCenterContent/OptionalBottomSection';
import ChatSidebar from "@/components/AiChat/Sidebar/ChatList";

const TopSection: React.FC = () => {
    return (
        <Textarea
            placeholder="Enter your request or question here..."
            autosize
            minRows={2}
            maxRows={8}
        >
        </Textarea>
    );

}

export default function SamplePageWithCenterContent() {
    const {bottomPadding} = useDynamicLayout();
    return (
        <>
            <CenterLayout
                topSectionContent={<TopSection/>}
                bottomSectionContent={<OptionalBottomSection/>}
                rightMenuSectionContent={<ChatSidebar/>}
                centerSectionWidth={80}
                rightMenuSectionWidth={20}

                // In this example, only two of the 3 available sections are used.
                //leftMenuSectionContent={<YourLeftMenuSection/>}
                //leftMenuSectionWidth={0}
            >
                <div>
                    <ResponseArea bottomPadding={bottomPadding}/>
                </div>
            </CenterLayout>
        </>
    );
}
