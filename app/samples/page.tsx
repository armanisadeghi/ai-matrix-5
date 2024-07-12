// app/samples/OptionalStarterPage.tsx
'use client';
import ContextMenu from '@/components/ContextMenu/ContextMenu';
import { useContextMenu } from '@/context/ContextMenuProvider';
import React from 'react';


export default function Index() {
    const { showMenu } = useContextMenu();

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();  // Prevent the default context menu
        showMenu(event.pageX, event.pageY, [
            { label: 'Dashboard', onClick: () => console.log('Go to Dashboard') },
            { label: 'Settings', onClick: () => console.log('Open Settings') },
        ]);
    };

    return (
        <div>
            <div onContextMenu={handleRightClick}>
                {/* Your app components go here */}
                <ContextMenu />
            </div>
        </div>
    );
}


