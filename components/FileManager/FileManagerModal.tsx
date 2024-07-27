// components/FileManager/FileManagerModal.tsx

import React from 'react';
import { Modal } from '@mantine/core';
import { FileManagerBase } from './FileManagerBase';

interface FileManagerModalProps {
    opened: boolean;
    onClose: () => void;
}

export const FileManagerModal: React.FC<FileManagerModalProps> = ({ opened, onClose }) => {
    return (
        <Modal opened={opened} onClose={onClose} title="File Manager" size="lg">
            <FileManagerBase onClose={onClose} />
        </Modal>
    );
};
