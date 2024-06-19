import { initializeSocket, emitEvent, waitForEvent, closeSocket } from '@/utils/socketio/socket'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { quickChatSettingsState } from '@/state/aiAtoms/settingsAtoms'
import {
    requestEventTaskAtom,
    requestSocketEventAtom,
    requestIndexAtom
} from '@/state/aiAtoms/metadataAtoms'
import { realTimeDataState, streamBufferState } from '@/state/socketAtoms'
import { userIdSelector, userTokenSelector } from '@/state/userAtoms'
import {
    activeChatIdAtom,
    activeChatMessagesArrayAtom,
    customInputsAtom,
    formResponsesAtom
} from '@/state/aiAtoms/chatAtoms'

type SocketEventType =
    | 'matrix_chat'
    | 'playground_stream'
    | 'run_recipe'
    | 'validation'
    | 'workflow'
    | null

export const useDynamicSocketHandler = (
    callback?: (data: any) => void,
    onStreamEndCallback?: (streamBuffer: string) => void
) => {
    const eventTask = useRecoilValue(requestEventTaskAtom)
    const socketEvent = useRecoilValue<SocketEventType>(requestSocketEventAtom)
    const userId = useRecoilValue(userIdSelector)
    const userToken = useRecoilValue(userTokenSelector)

    const chatId = useRecoilValue(activeChatIdAtom)
    const activeChatMessagesArray = useRecoilValue(activeChatMessagesArrayAtom)
    const formResponses = useRecoilValue(formResponsesAtom)
    const customInputs = useRecoilValue(customInputsAtom)
    const requestIndex = useRecoilValue(requestIndexAtom)
    const quickChatSettings = useRecoilValue(quickChatSettingsState)
    const setRealTimeData = useSetRecoilState(realTimeDataState)
    const setStreamBuffer = useSetRecoilState(streamBufferState)

    const handleDynamicElements = async () => {
        // Initialize the socket connection with token, which is a string
        initializeSocket(userToken as string)

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
        }

        if (socketEvent) {
            // Emit the event with the request object if socketEvent is valid
            emitEvent(socketEvent, requestObject)
        } else {
            console.error('Invalid socket event:', socketEvent)
        }

        let streamBuffer = ''

        const handleStreamData = (data: any) => {
            console.log('Received chunk:', data)
            if (data && typeof data === 'object' && 'data' in data) {
                streamBuffer += data.data

                // Update Recoil state with the current chunk of data
                setRealTimeData((prevData) => [...prevData, data.data])

                // Call the callback with the current chunk of data
                if (callback) {
                    callback(data.data)
                }

                // Assuming 'isLastChunk' is a field that indicates the end of the stream
                if (data.isLastChunk) {
                    // Update Recoil state when the stream ends
                    setStreamBuffer(streamBuffer)

                    // Call the stream end callback
                    if (onStreamEndCallback) {
                        onStreamEndCallback(streamBuffer)
                    }

                    streamBuffer = '' // Reset the buffer for the next stream
                }
            }
        }

        waitForEvent('chat_response', handleStreamData)

        return { close: closeSocket }
    }

    return { handleDynamicElements }
}
