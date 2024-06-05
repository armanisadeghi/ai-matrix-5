// app/dashboard/intelligence/chat-app/utils/dynamicSocketHandler.ts

import { initializeSocket, emitEvent, waitForEvent, closeSocket } from '@/utils/socketio/socket';
import { useRecoilValue } from 'recoil';
import { quickChatSettingsAtom } from "@/context/atoms/settingsAtoms";
import { requestEventTaskAtom, requestSocketEventAtom, requestIndexAtom } from '@/app/samples/ai-tests/shared/atoms/metadataAtoms';
import { activeChatIdAtom, activeChatMessagesArrayAtom, customInputsAtom, formResponsesAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { activeUserIdAtom, activeUserTokenAtom } from "@/context/atoms/userAtoms";

export const useDynamicSocketHandler = (callback?: (data: any) => void, onStreamEnd?: (streamBuffer: string) => void) => {
    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue(requestSocketEventAtom);
    const userId = useRecoilValue(activeUserIdAtom);
    const userToken = useRecoilValue(activeUserTokenAtom);
    const chatId = useRecoilValue(activeChatIdAtom);
    const activeChatMessagesArray = useRecoilValue(activeChatMessagesArrayAtom);
    const formResponses = useRecoilValue(formResponsesAtom);
    const customInputs = useRecoilValue(customInputsAtom);
    const requestIndex = useRecoilValue(requestIndexAtom);
    const quickChatSettings = useRecoilValue(quickChatSettingsAtom);

    const handleDynamicElements = async () => {
        // Initialize the socket connection with token, which is a string
        initializeSocket(userToken as string);

        // Form the request object
        const requestObject = {
            aiRequest: {
                metadata: {
                    eventTask,
                    socketEvent,
                    index: requestIndex,
                    requestId: '',
                    timestamp: new Date().toISOString(),
                    source: '',
                    channel: ''
                },
                user: {
                    id: userId,
                    token: userToken
                },
                recipe: {},
                chatData: {
                    chat_id: chatId,
                    activeChatMessagesArray,
                    formResponses,
                    customInputs
                }
            },
            settings: {
                quickChatSettings,
                aiModelSettings: {},
                controlSettings: {},
                pageSettings: {},
                userSettings: {},
                matrixSettings: {},
                clientSettings: {},
                agencySettings: {},
                variablesSettings: {},
                responseSettings: {},
                brokerSettings: {}
            }
        };

        // Emit the event with the request object
        emitEvent(socketEvent, requestObject);

        let streamBuffer = '';

        const handleStreamData = (data: any) => {
            console.log('Received chunk:', data);
            if (data && typeof data === 'object' && 'data' in data) {
                streamBuffer += data.data;

                // Call the callback with the current chunk of data
                if (callback) {
                    callback(data.data);
                }

                // Assuming 'isLastChunk' is a field that indicates the end of the stream
                if (data.isLastChunk) {
                    if (onStreamEnd) {
                        onStreamEnd(streamBuffer);
                    }
                    streamBuffer = ''; // Reset the buffer for the next stream
                }
            }
        };

        waitForEvent('chat_response', handleStreamData);

        return { close: closeSocket };
    };

    return { handleDynamicElements };
};
