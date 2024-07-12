// UserModule.tsx
'use client';

import React from 'react';
import { useContextMenu } from 'context/ContextMenuProvider';

const UserModule: React.FC = () => {
    const { showMenu } = useContextMenu();

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        showMenu(event.pageX, event.pageY, [
            { label: 'Add User', onClick: () => console.log('Adding user') },
            { label: 'Import Users', onClick: () => console.log('Importing users') },
        ]);
    };

    return (
        <div onContextMenu={handleRightClick}>
            Click right here to manage users.
        </div>
    );
};

export default UserModule;
