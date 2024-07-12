// components/ActiveChatMessagesComponent.tsx
'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Textarea, Space } from '@mantine/core';
import { activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';

export const ActiveChatMessagesComponent: React.FC = () => {
    const activeChatMessagesArray = useRecoilValue(activeChatMessagesArrayAtom);

    return (
        <>
            <Textarea
                value={JSON.stringify(activeChatMessagesArray, null, 2)}
                readOnly
                autosize
            />
            <Space h="sm"/>
            <Textarea
                value={JSON.stringify('Space for Lease', null, 2)}
                readOnly
                autosize
            />
        </>
    );
};
