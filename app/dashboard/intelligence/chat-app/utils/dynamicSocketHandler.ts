// app/dashboard/intelligence/chat-app/utils/dynamicSocketHandler.ts

import { initializeSocket, emitEvent, waitForEvent, closeSocket } from './socket';

export const handleDynamicElements = (userToken: string, message: string, onStreamEnd: (streamBuffer: string) => void) => {
    initializeSocket(userToken);

    emitEvent('streaming_chat', {
        promptMessage: message,
        task: 'basic_chat',
        index: 1,
        uid: '1234567890',
    });

    let streamBuffer = '';

    waitForEvent('chat_response', (data) => {
        console.log('Received chunk:', data);
        if (data && typeof data === 'object' && 'data' in data) {
            streamBuffer += data.data;

            // Assuming 'isLastChunk' is a field that indicates the end of the stream
            if (data.isLastChunk) {
                onStreamEnd(streamBuffer);
                streamBuffer = ''; // Reset the buffer for the next stream
            }
        }
    });

    return {
        close: closeSocket,
    };
};
