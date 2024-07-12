// components/ActiveUserChatComponent.tsx
'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Textarea, Space } from '@mantine/core';
import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';

export const ActiveUserChatComponent: React.FC = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);

    return (
        <>
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
        </>
    );
};
