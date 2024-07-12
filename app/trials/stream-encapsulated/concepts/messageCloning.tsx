/*
import loadActiveChats, { chatsAtomNew } from '@/app/trials/stream-encapsulated/utils/loadActiveChats';
import { activeMessagesAtomNew } from '@/app/trials/stream-encapsulated/utils/loadActiveMessages';
import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Button, TextInput, Card, Group } from '@mantine/core';


const ParentChildComponent
    :
    React.FC = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [allChats, setAllChats] = useRecoilState(chatsAtomNew);
    const [activeMessages, setActiveMessages] = useRecoilState(activeMessagesAtomNew);
    const [newMessage, setNewMessage] = useState('');
    const [messageRole, setMessageRole] = useState('');

    useEffect(() => {
        loadActiveChats();
    }, []);


    const addMessage = useCallback(() => {
        if (activeChatId) {
            const neMessage: MessageType = {
                id: String(Date.now()),
                chatId: activeChatId,
                createdAt: new Date().toISOString(),
                index: activeMessages.length,
                text: newMessage,
                role: messageRole,
            };
            setActiveMessages(prevChildren => [...prevChildren, newChild]);
            setNewChildContent('');
        }
    }, [activeChatId, newChildContent, setTempChildren]);

    const saveChildren = useCallback(() => {
        pushAsyncUpdates(true);
    }, []);

    const changeActiveParentId = useCallback((id: string) => {
        setChildren(tempChildren); // Save current tempChildren before switching
        setActiveParentId(id);
    }, [tempChildren, setChildren]);

    const [inputParentId, setInputParentId] = useState('');

    return (
        <div>
            <h3>Parents</h3>
            <div>
                {parents.map(parent => (
                    <Card key={parent.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Group gap="sm" grow>
                            <div>{parent.name}</div>
                            <Button size="xs" onClick={() => changeActiveParentId(parent.id)}>Set Active</Button>
                        </Group>
                    </Card>
                ))}
            </div>

            <TextInput
                value={inputParentId}
                onChange={(e) => setInputParentId(e.currentTarget.value)}
                placeholder="Enter Parent ID"
                mt="md"
            />
            <Button onClick={() => changeActiveParentId(inputParentId)}>Change Active Parent</Button>

            <h3>Active Parent: {activeParent?.name}</h3>
            <div>
                {tempChildren.map(child => (
                    <Card key={child.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <div>{child.content}</div>
                    </Card>
                ))}
            </div>
            <TextInput
                value={newChildContent}
                onChange={(e) => setNewChildContent(e.currentTarget.value)}
                placeholder="New Child Content"
                mt="md"
            />
            <Button onClick={addChild} mt="md">Add Child</Button>
            <Button onClick={saveChildren} mt="md">Save Children</Button>
        </div>
    );
};

export default ParentChildComponent;







*/
