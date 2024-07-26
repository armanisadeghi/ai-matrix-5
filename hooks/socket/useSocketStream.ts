import { requestSettingsAtom } from '@/app/samples/socket-test/requestSettingsAtom';
import { handleStreamResponse } from '@/hooks/socket/handleStreamResponse';
import { combinedSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiParamsType } from '@/types';
import {
    chatMessagesAtomFamily,
    assistantTextStreamAtom,
    requestTaskAtom,
    taskTriggerAtomFamily,
    taskStatusAtom,
    recipeIdAtom
} from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { emitEvent, waitForEvent } from '@/utils/socketio/basicSocket';

export interface SocketStreamHookProps {
    chatId: string;
    options?: AiParamsType;
    index?: number;
}

function useSocketStream({ chatId, options, index = 0 }: SocketStreamHookProps) {
    const hookId = 'SocketStream';
    const requestTask = useRecoilValue(requestTaskAtom);
    const requestSettings = useRecoilValue(requestSettingsAtom);
    const combinedSettings = useRecoilValue(combinedSettingsState);

    const [taskTrigger, setTaskTrigger] = useRecoilState(taskTriggerAtomFamily({ hookId, index }));
    const setTaskStatus = useSetRecoilState(taskStatusAtom);
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const setStreamMessage = useSetRecoilState(assistantTextStreamAtom);
    const activeUser = useRecoilValue(activeUserAtom);
    const userId = activeUser?.auth0Sid;
    const recipeId = useRecoilValue(recipeIdAtom);

    const handleChatResponse = useCallback(
        handleStreamResponse({ setStreamMessage, setMessages, setTaskStatus }),
        [setStreamMessage, setMessages, setTaskStatus]
    );

    useEffect(() => {
        console.log('useSocketStream effect triggered');
        console.log('Task trigger:', taskTrigger);
        console.log('Chat ID:', chatId);
        console.log('Index:', index);
        console.log('Messages:', messages);
        console.log('Combined settings:', combinedSettings);

        if (!taskTrigger) return;
        console.log('Task trigger is true, proceeding with effect');

        setTaskTrigger(false);
        console.log('Task trigger set to false');

        const payload = {
            user_id: userId,
            task_type: requestTask,
            chat_id: chatId,
            index: index,
            recipe_id: recipeId,
            messages: messages,
            settings: combinedSettings,
        };
        console.log('Payload prepared:', payload);

        setTaskStatus('waiting');
        console.log('Task status set to waiting');

        emitEvent('matrix_chat', payload, (response) => {
            console.log('Emit event callback received:', response);
            if (response.status === 'received') {
                console.log('Task received by server');
                setTaskStatus('processing');
                console.log('Task status set to processing');
            }
        });

        console.log('Emit event called');

        waitForEvent('chat_response', (data) => {
            console.log('Chat response received:', data);
            handleChatResponse(data);
        });

        console.log('Wait for event set up');

        return () => {
            console.log('Cleanup function called');
            if (typeof window !== 'undefined') {
                const socket = (window as any).socket;
                if (socket) {
                    socket.off('chat_response', handleChatResponse);
                    console.log('Chat response event listener removed');
                }
            }
        };
    }, [taskTrigger, userId, chatId, index, messages, options, combinedSettings, handleChatResponse, setTaskStatus, setTaskTrigger, requestTask, recipeId]);

    useEffect(() => {
        return () => {
            setStreamMessage('');
            setTaskStatus('idle');
        };
    }, [setStreamMessage, setTaskStatus]);

    return null;
}

export default useSocketStream;
