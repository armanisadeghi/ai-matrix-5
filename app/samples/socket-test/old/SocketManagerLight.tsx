'use client';

import { activeRecipeIdAtom } from '@/state/aiAtoms/recipeAtoms';
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { combinedSettingsState } from '@/state/aiAtoms/settingsAtoms';
import {
    taskStatusAtom,
    assistantTextStreamAtom,
    chatMessagesAtomFamily,
    requestTaskAtom,
} from '@/state/aiAtoms/aiChatAtoms';
import { requestSettingsAtom } from '@/app/samples/socket-test/requestSettingsAtom';
import { handleStreamResponse } from '@/hooks/socket/handleStreamResponse';
import { useSocketConnection } from '@/app/samples/socket-test/hooks/useSocketConnection';

interface SocketManagerProps {
    children: React.ReactNode;
}

const SocketManager: React.FC<SocketManagerProps> = ({children}) => {
    const { socket, isConnected } = useSocketConnection();
    const activeUser = useRecoilValue(activeUserAtom);
    const combinedSettings = useRecoilValue(combinedSettingsState);
    const [taskStatus, setTaskStatus] = useRecoilState(taskStatusAtom);
    const requestTask = useRecoilValue(requestTaskAtom);
    const requestSettings = useRecoilValue(requestSettingsAtom);
    const recipeId = useRecoilValue(activeRecipeIdAtom);
    const setStreamMessage = useSetRecoilState(assistantTextStreamAtom);

    const startSocketStream = useCallback((chatId: string, taskName: string, taskIndex: number, messages: any[]): (() => void) => {
        if (!socket || !isConnected) {
            console.error('Socket not connected');
            return () => {};
        }

        const taskId = `${taskName}_${taskIndex}`;

        const handleChatResponse = handleStreamResponse({
            setStreamMessage,
            setMessages: (updater) => {
                const chatMessagesAtom = chatMessagesAtomFamily(chatId);
                const setChatMessages = useSetRecoilState(chatMessagesAtom);
                setChatMessages(updater);
            },
            setTaskStatus,
        });

        setTaskStatus('waiting');

        socket.emit('start_task', {
            task_name: taskName,
            task_index: taskIndex,
            task_data: {
                user_token: activeUser?.auth0Sid,
                user_id: activeUser?.matrixId,
                chat_id: chatId,
                recipe_id: recipeId,
                messages: messages,
                settings: combinedSettings,
            }
        });

        const taskUpdateListener = (data: any) => {
            handleChatResponse(data);
            if (data.includes('[END_OF_STREAM]')) {
                stopSocketStream(taskId);
            }
        };

        socket.on(`task_update_${taskId}`, taskUpdateListener);

        return () => stopSocketStream(taskId);
    }, [socket, isConnected, activeUser, combinedSettings, recipeId, setStreamMessage, setTaskStatus]);

    const stopSocketStream = useCallback((taskId: string) => {
        if (!socket || !isConnected) {
            console.error('Socket not connected');
            return;
        }

        socket.emit('stop_task', { task_id: taskId });
        socket.off(`task_update_${taskId}`);

        setStreamMessage('');
        setTaskStatus('idle');
    }, [socket, isConnected, setStreamMessage, setTaskStatus]);

    return (
        <SocketContextOld.Provider value={{startSocketStream, stopSocketStream, taskStatus}}>
            {children}
        </SocketContextOld.Provider>
    );
};

export const SocketContextOld = React.createContext<{
    startSocketStream: (chatId: string, taskName: string, taskIndex: number, messages: any[]) => () => void;
    stopSocketStream: (taskId: string) => void;
    taskStatus: string;
}>({
    startSocketStream: () => () => {},
    stopSocketStream: () => {},
    taskStatus: 'idle',
});

export const useSocket = () => React.useContext(SocketContextOld);

export default SocketManager;
