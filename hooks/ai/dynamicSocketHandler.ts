import { activeChatIdAtom, activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { initializeSocket, emitEvent, waitForEvent, closeSocket } from '@/utils/socketio/basicSocket';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { quickChatSettingsState } from "@/state/aiAtoms/settingsAtoms";
import { requestEventTaskAtom, requestSocketEventAtom, requestIndexAtom } from '@/state/aiAtoms/metadataAtoms';
import { realTimeDataState, streamBufferState } from '@/state/socketAtoms';


type SocketEventType = "matrix_chat" | "playground_stream" | "run_recipe" | "validation" | "workflow" | null;

// Added here because they were commented out in the original file and wanted to save them somewhere and stop Type errors

export const formResponsesAtom = atom<{ [key: string]: string }>({
    key: 'formResponsesAtom',
    default: {},
});

export const customInputsAtom = atom<string[]>({
    key: 'customInputsAtom',
    default: [],
});



export const useDynamicSocketHandler = (callback?: (data: any) => void, onStreamEndCallback?: (streamBuffer: string) => void) => {
    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue<SocketEventType>(requestSocketEventAtom);
    const activeUser = useRecoilValue(activeUserAtom);

    const chatId = useRecoilValue(activeChatIdAtom);
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);
    const formResponses = useRecoilValue(formResponsesAtom);
    const customInputs = useRecoilValue(customInputsAtom);
    const requestIndex = useRecoilValue(requestIndexAtom);
    const quickChatSettings = useRecoilValue(quickChatSettingsState);
    const setRealTimeData = useSetRecoilState(realTimeDataState);
    const setStreamBuffer = useSetRecoilState(streamBufferState);

    const handleDynamicElements = async () => {
        // Initialize the socket connection with token, which is a string
        initializeSocket(activeUser.auth0Sid as string);

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
                    id: activeUser.matrixId,
                    token: activeUser.auth0Sid
                },
                recipe: {},
                chatData: {
                    chat_id: chatId,
                    activeChatMessages,
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

        if (socketEvent) {
            // Emit the event with the request object if socketEvent is valid
            emitEvent(socketEvent, requestObject);
        } else {
            console.error('Invalid socket event:', socketEvent);
        }

        let streamBuffer = '';

        const handleStreamData = (data: any) => {
            console.log('Received chunk:', data);
            if (data && typeof data === 'object' && 'data' in data) {
                streamBuffer += data.data;

                // Update Recoil state with the current chunk of data
                setRealTimeData((prevData) => [...prevData, data.data]);

                // Call the callback with the current chunk of data
                if (callback) {
                    callback(data.data);
                }

                // Assuming 'isLastChunk' is a field that indicates the end of the stream
                if (data.isLastChunk) {
                    // Update Recoil state when the stream ends
                    setStreamBuffer(streamBuffer);

                    // Call the stream end callback
                    if (onStreamEndCallback) {
                        onStreamEndCallback(streamBuffer);
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
