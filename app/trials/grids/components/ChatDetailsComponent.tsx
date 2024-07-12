// components/ChatDetailsComponent.tsx
'use client';

import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Textarea } from '@mantine/core';
import { chatMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';

export const ChatDetailsComponent: React.FC = () => {
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);

    return (
        <Textarea
            value={JSON.stringify(chatMessagesLoadable, null, 2)}
            readOnly
            minRows={15}
            autosize
            style={{flexGrow: 1}}
        />
    );
};
