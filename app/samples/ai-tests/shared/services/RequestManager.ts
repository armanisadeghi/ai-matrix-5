import { useRecoilValue } from "recoil";
import { requestEventTaskAtom, requestSocketEventAtom } from "@/app/samples/ai-tests/shared/atoms/metadataAtoms";
import { userMessageAtom } from "../atoms/chatAtoms";
import { useDynamicSocketHandler } from "@/app/samples/ai-tests/shared/services/dynamicSocketHandler";
import { EVENT_TASKS, SOCKET_EVENTS } from "@/app/samples/ai-tests/shared/config/aiRequestOptions";
import apiHandlers from "./aiCallRouter";

export const useRequestManager = () => {
    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue(requestSocketEventAtom);
    const newMessage = useRecoilValue(userMessageAtom);
    const { handleDynamicElements } = useDynamicSocketHandler();
    console.log('Request Manager eventTask:', eventTask);
    console.log('Request Manager socketEvent:', socketEvent);

    const handleRequest = async (data: any) => {
        try {
            console.log('handleRequest 1 Request Manager data:', data);

            switch (eventTask) {
                case "directChat":
                    console.log('handleRequest 2 Event:', eventTask);
                case "simpleChat":
                    console.log('handleRequest 2 Event:', eventTask);
                case "runRecipe":
                    console.log('handleRequest 2 Event:', eventTask);
                case "runAction":
                    console.log('handleRequest 2 Event:', eventTask);
                case "validateRequest":
                    console.log('handleRequest 2 Event:', eventTask);
                case "processWorkflow":
                    console.log('handleRequest 2 Event:', eventTask);
                case "dataProcessing":
                    console.log('handleRequest 2 Event:', eventTask);
                case "directStream":
                    console.log('handleRequest 2 Event:', eventTask);
                case "openai_stream_request":
                    console.log('handleRequest 2 Event:', eventTask);
                    console.log('handleRequest 3 API request:', data);
                    const invokeOpenAIStreamRequest = async (data: any) => {
                        try {
                            return await apiHandlers["openai_stream_request"]({
                                updatedChat: data.updatedChat,
                                updateCallback: data.updateCallback,
                                finalizeCallback: data.finalizeCallback,
                            });
                        } catch (error) {
                            console.error('Error invoking openai_stream_request:', error);
                            throw error;
                        }
                    };

                    await invokeOpenAIStreamRequest(data);
                    break;

                case apiHandlers:
                    console.log('Entering apiHandlers case'); // NEW LOG
                    const response = await apiHandlers[eventTask](data);
                    console.log('API response:', response);
                    break;

                default:
                    console.log('Entering default case'); // NEW LOG
                    if (EVENT_TASKS.includes(eventTask as typeof EVENT_TASKS[number]) && SOCKET_EVENTS.includes(socketEvent as typeof SOCKET_EVENTS[number])) {
                        await handleDynamicElements();
                    }
            }

        } catch (error) {
            console.error('Error handling request:', error);
        }
    };

    return { handleRequest };
};
