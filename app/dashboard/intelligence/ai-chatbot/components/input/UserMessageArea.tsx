// chatbot/components/input/UserMessageArea.tsx
'use client'

import React from 'react';
import { Textarea } from '@mantine/core';

const UserMessageArea = () => {
    return (
        <div style={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
            <div style={{ height: '2px' }}></div>
            <Textarea placeholder="Type your message..." style={{ width: '100%' }} />
            <div style={{ height: '10px' }}></div>
        </div>
    );
};

export default UserMessageArea;
