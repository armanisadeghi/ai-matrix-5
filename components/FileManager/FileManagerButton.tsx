// components/FileManager/FileManagerButton.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { FileManagerModal } from './FileManagerModal';

export const FileManagerButton: React.FC = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <Button onClick={() => setModalOpened(true)}>Manage Files</Button>
            <FileManagerModal opened={modalOpened} onClose={() => setModalOpened(false)} />
        </>
    );
};
