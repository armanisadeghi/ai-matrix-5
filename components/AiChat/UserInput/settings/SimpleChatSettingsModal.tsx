import React from 'react';
import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';
import { AtomName } from '@/state/aiAtoms/settingsAtoms';

const SimpleChatSettingsModal: React.FC<{ opened: boolean; onClose?: () => void }> = ({ opened, onClose }) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const atomNames: AtomName[] = [
        'submitOnEnter',
        'makeSmallTalk',
        'quickAnswer',
        'improveQuestions',
        'aiPreferencesMain',
        'stopSequence',
        'aiPreferencesSecond'
    ];

    return (
        <AmeSettingsModal
            opened={opened}
            onClose={handleClose}
            atomNames={atomNames}
        />
    );
};

export default SimpleChatSettingsModal;
