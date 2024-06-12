// chat-app/nice-working/settings/simpleChatSettingsModal.tsx
'use client';

import React from 'react';
import AmeSettingsModal from '@/ui/modal/AmeSettingsModal';
import { AtomName } from '@/state/aiAtoms/settingsAtoms';

const SimpleChatSettingsModal: React.FC<{ opened: boolean; onClose: () => void }> = ({ opened, onClose }) => {
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
            onClose={onClose}
            atomNames={atomNames}
        />
    );
};

export default SimpleChatSettingsModal;
