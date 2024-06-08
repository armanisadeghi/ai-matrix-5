import React from 'react';
import { useRecoilState } from 'recoil';
import { requestEventTaskAtom, requestSocketEventAtom } from "@/app/samples/ai-tests/shared/atoms/metadataAtoms";
import { useRequestManager } from '../RequestManager';
import { MessageEntry } from '@/types/chat';

const YourComponent = () => {
    const [eventTask, setEventTask] = useRecoilState(requestEventTaskAtom);
    const [socketEvent, setSocketEvent] = useRecoilState(requestSocketEventAtom);
    const { handleRequest } = useRequestManager();

    const handleClick = async () => {
        const requestData: any = { key: 'value' }; // Replace with your actual request data

        if (eventTask === 'directStream') {
            requestData.updatedChat = []; // Populate with MessageEntry[]
            requestData.updateCallback = (message: MessageEntry) => console.log('Update:', message);
            requestData.finalizeCallback = (message: MessageEntry) => console.log('Finalize:', message);
        }

        await handleRequest(requestData);
    };

    return (
        <div>
            <button onClick={handleClick}>Send Request</button>
        </div>
    );
};

export default YourComponent;
