// UserTable.tsx
'use client';

import React from 'react';
import { useContextMenu } from 'context/ContextMenuProvider';

const UserTable: React.FC = () => {
    const { showMenu } = useContextMenu();

    const handleRightClick = (event: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
        event.preventDefault();
        showMenu(event.pageX, event.pageY, [
            { label: 'Edit User', onClick: () => console.log('Editing user') },
            { label: 'Delete User', onClick: () => console.log('Deleting user') },
        ]);
    };

    return (
        <table onContextMenu={handleRightClick}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {/* Table rows would be rendered here */}
            </tbody>
        </table>
    );
};

export default UserTable;
