/*
// TestingUI.tsx
import { activeChatMessagesArrayAtom, chatMessagesSelector, chatSummariesAtom, systemMessageAtom } from '@/state/aiAtoms/aiChatAtoms';
import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Button, Divider, Space } from "@mantine/core";
import AmeJsonInput from '@/ui/json/AmeJsonInput';



import { activeUserAtom } from "@/state/userAtoms";
import { availableHeightSelector } from "@/state/layoutAtoms";

interface TestingUIProps {
    currentChatId: string | null;
    setCurrentChatId: (chatId: string) => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
}

const TestingUI: React.FC<TestingUIProps> = ({ currentChatId, setCurrentChatId, inputRef }) => {
    const [selectedAtom, setSelectedAtom] = useState('');
    const [atomValue, setAtomValue] = useState('');
    const [editTitle, setEditTitle] = useState('');

    const [systemMessages, setSystemMessages] = useRecoilState(systemMessageAtom);
    const [activeUser] = useRecoilState(activeUserAtom);
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);
    const [chatSummaries, setSetChatSummaries] = useRecoilState(chatSummariesAtom);
    const [currentChatMessages, setCurrentChatMessages] = useRecoilState(activeChatMessagesArrayAtom);


    const handleAtomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedAtom(selected);
        const value = getAtomValue(selected);
        setAtomValue(value);
    };

    const getAtomValue = (atomName: string) => {
        switch (atomName) {
            case 'allChatsAtom':
                return JSON.stringify(chatMessagesLoadable, null, 2);
            case 'activeChatIdAtom':
                return JSON.stringify(currentChatId, null, 2);
            case 'activeChatMessagesArrayAtom':
                return JSON.stringify(currentChatMessages, null, 2);
            case 'activeUserAtom':
                return JSON.stringify(activeUser, null, 2);
            case 'systemMessagesAtom':
                return JSON.stringify(systemMessages, null, 2);
            case 'detailsForAllChatsAtom':
                return JSON.stringify(chatSummaries, null, 2);
            case 'chatTitlesAndIdsAtom':
                return JSON.stringify(chatTitlesAndIdsAtom, null, 2);
            default:
                return 'Unknown Atom';
        }
    };

    const setAtomValueByName = (atomName: string) => {
        switch (atomName) {
            case 'allChatsAtom':
                return JSON.stringify(allChats, null, 2);
            case 'activeChatIdAtom':
                return JSON.stringify(currentChatId, null, 2);
            case 'activeChatMessagesArrayAtom':
                return JSON.stringify(currentChatMessages, null, 2);
            case 'activeUserAtom':
                return JSON.stringify(activeUser, null, 2);
            case 'systemMessagesAtom':
                return JSON.stringify(systemMessages, null, 2);
            case 'detailsForAllChatsAtom':
                return JSON.stringify(detailsForAllChats, null, 2);
            case 'chatTitlesAndIdsAtom':
                return JSON.stringify(chatTitlesAndIdsAtom, null, 2);
            default:
                return 'Unknown Atom';
        }
    };


    return (
        <div>
            <Space h="xl"/>
            <Divider my="xs" label="Testing Center" labelPosition="center"/>
            <Button variant="filled" size="xs" radius="md" onClick={console.log}>Save and New</Button>
            <Space h="md"/>
            <div>
                <h3> Used to be current Chat ID</h3>
            </div>
            <Space h="md"/>
            <div>
                <input
                    type="text"
                    value={editTitle}
                    onChange={console.log}
                    placeholder="Edit chat title"
                />
                <Button variant="filled" size="xs" radius="md" onClick={console.log}>Save Title</Button>
            </div>
            <Space h="md"/>
            <div style={{marginTop: '20px'}}>
                <label htmlFor="atom-select">Select Atom to View: </label>
                <select id="atom-select" value={selectedAtom} onChange={handleAtomSelect}>
                    <option value="">Select Atom</option>
                    <option value="availableHeightSelector">availableHeightSelector</option>
                    <option value="detailsForAllChatsAtom">detailsForAllChatsAtom</option>
                    <option value="chatTitlesAndIdsAtom">chatTitlesAndIdsAtom</option>
                    <option value="activeChatIdAtom">activeChatIdAtom</option>
                    <option value="activeChatDetailsAtom">activeChatDetailsAtom</option>
                    <option value="activeChatMessagesArrayAtom">activeChatMessagesArrayAtom</option>
                    <option value="activeChatTitleAtom">activeChatTitleAtom</option>
                </select>
                <Space h="md"/>
                <AmeJsonInput label={'JSON Display'} value={atomValue} onChange={setAtomValue}/>
            </div>
        </div>
    );
};

export default TestingUI;
*/
