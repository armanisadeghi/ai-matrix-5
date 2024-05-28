'use client';
import React from 'react';
import { useState } from 'react';
import { TextInput, Checkbox, Button, Stack } from '@mantine/core';
import AmeDrawer from './AmeDrawer';
import AmeChatHistoryEntry from "@/app/samples/chat-sidebar/AmeChatHistoryEntry";
import AmeMenu from "@/app/samples/chat-sidebar/AmeMenu";
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
                        <AmeChatHistoryEntry placeholder='sample item 1' />
                        <AmeChatHistoryEntry placeholder='sample item 2' />
                        <AmeChatHistoryEntry placeholder='sample item 3' />
                        <AmeChatHistoryEntry placeholder='What is the capital of the United States?' />
                        <AmeMenu>
                            <AmeMenu.Target>
                                <BsThreeDotsVertical size={16} />
                            </AmeMenu.Target>
                        </AmeMenu>
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
