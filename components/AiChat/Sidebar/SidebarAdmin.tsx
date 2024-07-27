import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 } from 'uuid';
import { Button, Divider, Space, Stack, Text } from '@mantine/core';
import styles from './SidebarAdmin.module.css';

import { activeChatIdAtom, chatTransitionAtom, isNewChatAtom, streamStatusAtom, submitChatIdAtom, chatMessagesAtomFamily } from '@/state/aiAtoms/aiChatAtoms';

interface SidebarAdminProps {
    chatSelectCount: number;
    newChatCount: number;
}

const atomList = [
    'isNewChat',
    'chatTransition',
    'chatSelectCount',
    'newChatCount',
    'activeChatId',
    'submitChatId',
    'streamStatus'
];

const SidebarAdmin: React.FC<SidebarAdminProps> = (
    {
        chatSelectCount,
        newChatCount,
    }) => {
    const atomValues = {
        isNewChat: useRecoilValue(isNewChatAtom),
        chatTransition: useRecoilValue(chatTransitionAtom),
        chatSelectCount,
        newChatCount,
        activeChatId: useRecoilValue(activeChatIdAtom),
        submitChatId: useRecoilValue(submitChatIdAtom),
        streamStatus: useRecoilValue(streamStatusAtom),
    };

    const [keys, setKeys] = useState<Record<string, string>>(atomList.reduce((acc, atom) => {
        acc[atom] = v4();
        return acc;
    }, {} as Record<string, string>));

    useEffect(() => {
        const newKeys = Object.assign({}, keys);
        atomList.forEach(atom => {
            newKeys[atom] = v4();
        });
        setKeys(newKeys);
    }, Object.values(atomValues));

    const formatAtomName = (name: string) => {
        return name.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase());
    };

    const openAdminModal = () => {
        console.log('Open Admin Modal');
    };

    return (
        <>
            <Text size="md" c="grape">Sidebar Admin</Text>
            <Space h="xs"/>
            <Stack gap="xs">
                {atomList.map(atom => (
                    <div className={`${styles.gridItem} ${styles.highlightAnimation}`} key={keys[atom]}>
                        <Text size="xs">{formatAtomName(atom)}:</Text>
                        <Text size="xs">
                            {atomValues[atom as keyof typeof atomValues]?.toString() || 'No Value'}
                        </Text>
                    </div>
                ))}
            </Stack>
            <Space h="md"/>
            <Button fullWidth variant="filled" color="grape" size="xs" onClick={openAdminModal}>Admin modal</Button>
        </>
    );
};

export default SidebarAdmin;
