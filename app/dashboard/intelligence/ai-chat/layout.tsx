"use client";

import { Button, Group, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useMemo } from "react";

import UserInputArea from "@/app/dashboard/intelligence/ai-chat/components/UserInputArea";
import { ResponseArea } from "@/components/AiChat";
import AutoFetch from "@/components/AiChat/new/AutoFetch";
import ChatSidebar from "@/components/AiChat/Sidebar/ChatSidebar";
import CenterLayout from "@/ui/layout/AmeCenterContent/CenterLayout";
import { IconExclamationCircle } from "@tabler/icons-react";

type Props = {
    children: ReactNode;
};

const MemoizedUserInputArea = React.memo(UserInputArea);
const MemoizedChatSidebar = React.memo(ChatSidebar);
const MemoizedCenterLayout = React.memo(CenterLayout);

export default function Layout({ children }: Props) {
    const searchParams = useSearchParams();
    let chatTitle = searchParams.get("chatTitle") ?? "New chat";

    const memoizedLayout = useMemo(
        () => (
            <>
                <MemoizedCenterLayout
                    bottomSectionContent={<MemoizedUserInputArea />}
                    centerSectionWidth={83}
                    rightMenuSectionContent={<MemoizedChatSidebar />}
                    rightMenuSectionWidth={17}
                    scrollAreaContent={<ResponseArea className="responseTextArea" bottomPadding={0} />}
                    topSectionContent={
                        <Group justify="space-between" py="xs">
                            <Text>{chatTitle}</Text>
                            <Button variant="subtle" leftSection={<IconExclamationCircle size={16} />}>
                                Guided Tour
                            </Button>
                        </Group>
                    }
                />
                {children}
            </>
        ),
        [children],
    );

    return <AutoFetch>{memoizedLayout}</AutoFetch>;
}
