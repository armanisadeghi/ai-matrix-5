// app/samples/ai-tests/shared/services/aiCallRouter.ts
'use server';

import { atom, useRecoilValue } from 'recoil';
import { SOCKET_EVENTS, EVENT_TASKS } from '@/app/samples/ai-tests/shared/config/aiRequestOptions';
import { useDynamicSocketHandler } from '@/app/samples/ai-tests/shared/services/dynamicSocketHandler';
import { submitChatRequest } from '@/app/samples/ai-tests/shared/services/SteamOpenAi';
import { MessageEntry } from '@/types/chat';
import { requestEventTaskAtom, requestSocketEventAtom } from "@/app/samples/ai-tests/shared/atoms/metadataAtoms";



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
};

export default apiHandlers;
