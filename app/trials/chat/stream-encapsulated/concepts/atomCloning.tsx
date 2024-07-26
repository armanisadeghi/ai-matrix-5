/*
import { activeUserAtom } from '@/state/userAtoms';
import { Json, MessageType } from '@/types';
import supabase from '@/utils/supabase/client';
import React, { useCallback, useState } from 'react';
import { atom, atomFamily, DefaultValue, selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, TextInput, Card, Group } from '@mantine/core';
import { updateAllMessages, updateSomeMessages } from '@/utils/supabase/chatDb';





interface ParentType {
    id: string;
    name: string;
    createdAt: string;
    lastEdited: string;
    metadata?: Json;
    children?: ChildType[];
    [key: string]: any;
}

interface ChildType {
    id: string;
    parentId: string;
    createdAt: string;
    metadata?: Json;
    [key: string]: any;
}

const parentState = atom<ParentType[]>({
    key: 'parentState',
    default: selectorFamily<ParentType[]>({
        key: 'parentStateSelector',
        get: async ({get}) => {
            const activeUser = get(activeUserAtom);
            const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
            if (error) {
                console.error('Error fetching chats:', error.message);
                return [];
            }
            return data;
        }
    });
});



    const activeParentIdState = atom<string | null>({
    key: 'activeParentIdState',
    default: null,
});

const childStateFamily = atomFamily<ChildType[], string>({
    key: 'childStateFamily',
    default: selectorFamily<ChildType[], string>({
        key: 'childStateDefault',
        get: parentId => async () => {
            const {data, error} = await databaseFetchAll(parentId);
            if (error) {console.error('Failed to fetch messages: ', error); return [];}
            return data || [];
        }
    }),
});

const tempChildState = atom<ChildType[]>({
    key: 'tempChildState',
    default: selector<ChildType[]>({
        key: 'tempChildStateDefault',
        get: async ({get}) => {
            const activeParentId = get(activeParentIdState);
            if (activeParentId === null) {
                return [];
            }
            const childState = get(childStateFamily(activeParentId));
            return childState;
        }
    }),
});

const deepEqual = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export async function pushAsyncUpdates(dbReplace = false) {
    const activeParentId = useRecoilValue(activeParentIdState);
    if (activeParentId === null) { return; }
    const updatedArrayOfObjects = useRecoilValue(tempChildState);
    const [childValues, setChildValues] = useRecoilState(childStateFamily(activeParentId));
    setChildValues(updatedArrayOfObjects);

    if (dbReplace) {
        const {data, error} = await updateAllMessages(activeParentId, updatedArrayOfObjects);
        if (error) { console.error('Failed to fetch messages: ', error); return []; }
    } else {
        const newEntries = updatedArrayOfObjects.filter(item => !childValues.some(cv => cv.id === item.id));
        const changedEntries = updatedArrayOfObjects.filter(item => {
            const existingItem = childValues.find(cv => cv.id === item.id);
            return existingItem && !deepEqual(existingItem, item);
        });
        const deletedEntries = childValues.filter(item => !updatedArrayOfObjects.some(uao => uao.id === item.id)).map(item => item.id);

        const {data, error} = await updateSomeMessages(activeParentId, { newEntries, changedEntries, deletedEntries });
        if (error) { console.error('Failed to fetch messages: ', error); return []; }
    }
}


// Component
const ParentChildComponent: React.FC = () => {
    const [parents, setParents] = useRecoilState(parentState);
    const [activeParentId, setActiveParentId] = useRecoilState(activeParentIdState);
    const activeParent = parents.find(parent => parent.id === activeParentId);
    const [tempChildren, setTempChildren] = useRecoilState(tempChildState);
    const setChildren = useSetRecoilState(childStateFamily(activeParentId || ''));
    const [newChildContent, setNewChildContent] = useState('');

    const addChild = useCallback(() => {
        if (activeParentId) {
            const newChild: ChildType = {
                id: String(Date.now()),
                parentId: activeParentId,
                content: newChildContent,
                createdAt: new Date().toISOString(),
            };
            setTempChildren(prevChildren => [...prevChildren, newChild]);
            setNewChildContent('');
        }
    }, [activeParentId, newChildContent, setTempChildren]);

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
