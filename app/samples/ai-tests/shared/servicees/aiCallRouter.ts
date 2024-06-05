// app/samples/ai-tests/shared/servicees/aiCallRouter.ts

import { atom, useRecoilValue } from 'recoil';
import { SOCKET_EVENTS, EVENT_TASKS } from '@/app/samples/ai-tests/shared/config/aiRequestOptions';
import { useDynamicSocketHandler } from '@/app/samples/ai-tests/shared/servicees/dynamicSocketHandler';
import { submitChatRequest } from '@/app/samples/ai-tests/shared/servicees/SteamOpenAi';
import { MessageEntry } from '@/types/chat';
import { requestEventTaskAtom, requestSocketEventAtom } from "@/app/samples/ai-tests/shared/servicees/metadataAtoms";

// Example API handlers using native fetch
const apiHandlers: Record<string, (data: any) => Promise<any>> = {
    directChat: async (data: any) => {
        const response = await fetch('/api/directChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    simpleChat: async (data: any) => {
        const response = await fetch('/api/simpleChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    runRecipe: async (data: any) => {
        const response = await fetch('/api/runRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    runAction: async (data: any) => {
        const response = await fetch('/api/runAction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    processWorkflow: async (data: any) => {
        const response = await fetch('/api/processWorkflow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    openai_stream_request: async (data: { updatedChat: MessageEntry[], updateCallback: (message: MessageEntry) => void, finalizeCallback: (message: MessageEntry) => void }) => {
        return new Promise<void>((resolve, reject) => {
            submitChatRequest(data.updatedChat, data.updateCallback, data.finalizeCallback)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }
};

// Utility function to manage requests
export const useRequestManager = () => {
    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue(requestSocketEventAtom);

    const { handleDynamicElements } = useDynamicSocketHandler();

    const handleRequest = async (data: any) => {
        try {
            // Handle API requests
            if (eventTask in apiHandlers) {
                if (eventTask === 'directStream') {
                    // Handle OpenAI stream differently
                    await apiHandlers[eventTask]({
                        updatedChat: data.updatedChat,
                        updateCallback: data.updateCallback,
                        finalizeCallback: data.finalizeCallback,
                    });
                } else {
                    const response = await apiHandlers[eventTask](data);
                    console.log('API response:', response);
                }
            }

            // Handle socket requests with combined event task and socket event
            if (EVENT_TASKS.includes(eventTask as typeof EVENT_TASKS[number]) && SOCKET_EVENTS.includes(socketEvent as typeof SOCKET_EVENTS[number])) {
                await handleDynamicElements();
            }
        } catch (error) {
            console.error('Error handling request:', error);
        }
    };

    return { handleRequest };
};