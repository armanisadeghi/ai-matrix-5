'use client';
import React from 'react';
import { useState } from 'react';
import { Button, Stack } from '@mantine/core';
import AmeDrawer from './AmeDrawer';
import AmeChatHistoryEntry from "@/components/AiChat/Sidebar/AmeChatHistoryEntry";
import AmeMenu from "@/components/AiChat/Sidebar/AmeMenu";
import { BsThreeDotsVertical } from "react-icons/bs";

const Page: React.FC = () => {
    const [drawerOpened, setDrawerOpened] = useState(true);

    const handleClose = () => {
        setDrawerOpened(false);
    };

    return (
        <div>
            <Button onClick={() => setDrawerOpened(true)}>Open Drawer</Button>
            <AmeDrawer
                opened={drawerOpened}
                onClose={handleClose}
                header="Chat History"
                content={
                    <Stack
                        h={300}
                        bg="var(--mantine-color-body)"
                        align="stretch"
                        justify="flex-start"
                        gap="xs"
                    >
                        <AmeChatHistoryEntry keyProp={'test'} initialValue='sample item 1' />
                        <AmeChatHistoryEntry keyProp={'test'} initialValue='sample item 2' />
                        <AmeChatHistoryEntry keyProp={'test'} initialValue='sample item 3' />
                        <AmeChatHistoryEntry keyProp={'test'} initialValue='What is the capital of the United States?' />
                    </Stack>
                }
                size='xs'
                position="left"
                allowScroll={true}
            />
        </div>
    );
};

export default Page;
