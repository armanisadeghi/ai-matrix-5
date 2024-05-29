// chatbot/components/UserMessageArea.tsx
import React, { forwardRef } from 'react';
import { Textarea } from '@mantine/core';

const UserMessageArea = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} style={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
            <div style={{ height: '2px' }}></div>
            <Textarea placeholder="Type your message..." style={{ width: '100%' }} />
            <div style={{ height: '10px' }}></div>
        </div>
    );
});

UserMessageArea.displayName = 'UserMessageArea';

export default UserMessageArea;
