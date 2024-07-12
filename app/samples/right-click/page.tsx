// app/samples/right-click/OptionalStarterPage.tsx

'use client';

import ContextMenu from '@/components/ContextMenu/ContextMenu';
import { ContextMenuProvider, useContextMenu } from '@/context/ContextMenuProvider';
import React from 'react';

const App: React.FC = () => {
    const { showMenu } = useContextMenu();

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();  // Prevent the default context menu
        showMenu(event.pageX, event.pageY, [
            { label: 'Dashboard', onClick: () => console.log('Go to Dashboard') },
            { label: 'Settings', onClick: () => console.log('Open Settings') },
        ]);
    };

    return (
        <ContextMenuProvider>
            <div onContextMenu={handleRightClick}>
                {/* Your app components go here */}
                <ContextMenu />
            </div>
        </ContextMenuProvider>
    );
};

export default App;
