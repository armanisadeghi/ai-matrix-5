import { useRecoilState, useRecoilValue } from "recoil";
import { requestEventTaskAtom, requestSocketEventAtom } from "@/app/samples/ai-tests/shared/atoms/metadataAtoms";
import { activeChatMessagesArrayAtom } from "../atoms/chatAtoms";
import { useDynamicSocketHandler } from "@/app/samples/ai-tests/shared/services/dynamicSocketHandler";
import { EVENT_TASKS, SOCKET_EVENTS } from "@/app/samples/ai-tests/shared/config/aiRequestOptions";
import apiHandlers from "./aiCallRouter";
import { MessageEntry, Role } from "@/types";
import { submitChatRequest } from "@/app/samples/ai-tests/shared/services/SteamOpenAi";
import { OpenAiStream } from "@/app/api/openai/route";

export const useRequestManager = () => {
    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue(requestSocketEventAtom);
    const activeChatMessagesArray = useRecoilState(activeChatMessagesArrayAtom);
    const { handleDynamicElements } = useDynamicSocketHandler();

    const openai_stream_request = ( activeChatMessagesArray: MessageEntry[], updateCallback: (message: string) => void, finalizeCallback: (message: MessageEntry) => void): Promise<void> => {

        console.log('openai_stream_request activeChatMessagesArray:', activeChatMessagesArray);

        return new Promise(async (resolve, reject) => {
            try {
                if (!Array.isArray(activeChatMessagesArray)) {
                    throw new Error('updatedChat should be an array');
                }

                const messages = activeChatMessagesArray.map(chat => ({
                    role: chat.role as 'system' | 'user' | 'assistant',
                    content: chat.text
                }));

                let assistantMessage: string = '';

                await OpenAiStream(messages, (chunk) => {
                    assistantMessage += chunk;
                    updateCallback(chunk);
                });

                const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' as Role };
                finalizeCallback(fullResponse);
                resolve();
            } catch (error) {
                console.error('Error during OpenAI stream:', error);
                reject(error);
            }
        });
    };


    const handleRequest = async (data: any) => {
        try {
            if (typeof apiHandlers[eventTask] === 'function') {
                console.log(`Handling ${eventTask} with custom handler`);
                const response = await apiHandlers[eventTask](data);
                console.log('API response:', response);

            } else {
                // Handle known static tasks
                console.log(`Handling static task for ${eventTask}`);
                switch (eventTask) {
                    case "directChat":
                    case "simpleChat":
                    case "runRecipe":
                    case "runAction":
                    case "validateRequest":
                    case "processWorkflow":
                    case "dataProcessing":
                    case "directStream":
                    case "openai_stream_request":
                        console.log('handleRequest 2 Event:', eventTask);
                        console.log('handleRequest 3 API request:', data);
                        await openai_stream_request(data);
                        break;
                    default:
                        console.log('No handler found, entering default case');
                        if (EVENT_TASKS.includes(eventTask as typeof EVENT_TASKS[number]) && SOCKET_EVENTS.includes(socketEvent as typeof SOCKET_EVENTS[number])) {
                            await handleDynamicElements();
                        }
                        break;
                }
            }
        } catch (error) {
            console.error('Error handling request:', error);
        }
    };

    return { handleRequest };
};
