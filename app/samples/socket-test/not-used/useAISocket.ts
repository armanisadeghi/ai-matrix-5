/*
// src/hooks/useAISocket.ts

import { socketStatusAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeRecipeIdAtom } from '@/state/aiAtoms/recipeAtoms';
import { SocketManager } from '@/utils/socketio/SocketManager';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';


export const useAISocket = () => {
    const socketStatus = useRecoilValue(socketStatusAtom);
    const recipeId = useRecoilValue(activeRecipeIdAtom);
    const [streamData, setStreamData] = useState<string>('');
    const [isStreamComplete, setIsStreamComplete] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string | null>(null);

    const runSimpleRecipe = (data: any) => {
        if (socketStatus !== 'authenticated') {
            console.error('Socket not authenticated');
            return;
        }

        if (!socket) {
            console.error('Socket not initialized');
            return;
        }

        setStreamData('');
        setIsStreamComplete(false);

        socket.emit('simple_recipe', data, (response: any) => {
            console.log('Simple recipe initiated:', response);
            if (response.event_name) {
                setEventName(response.event_name);
            }
        });
    };

    useEffect(() => {
        const socket = SocketManager.getInstance(()=>{}, ()=>{}, ()=>{}).getSocket();
        if (!socket || !eventName) return;

        const handleStreamResponse = (response: { data: string; is_final: boolean }) => {
            setStreamData(prevData => prevData + response.data);
            if (response.is_final) {
                setIsStreamComplete(true);
                socket.off(eventName);
            }
        };

        socket.on(eventName, handleStreamResponse);

        return () => {
            socket.off(eventName);
        };
    }, [eventName]);

    return { runSimpleRecipe, streamData, isStreamComplete };
};
*/
