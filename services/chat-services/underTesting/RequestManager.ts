import {
    assistantTextStreamAtom,
    chatMessagesAtomFamily,
    streamStatusAtom,
    streamTriggerAtomFamily,
} from "@/state/aiAtoms/aiChatAtoms";
import { requestEventTaskAtom, requestSocketEventAtom } from "@/state/aiAtoms/metadataAtoms";
import { AiParamsType } from "@/types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { OpenAiStream } from "@/app/api/openai/route";
import { useDynamicSocketHandler } from "@/hooks/ai/dynamicSocketHandler";
import { EVENT_TASKS, SOCKET_EVENTS } from "@/utils/config/aiRequestOptions";
import apiHandlers from "./aiCallRouter";

const openaiStreamRequest = (
    activeChatMessagesArray: any,
    updateCallback: (message: string) => void,
    finalizeCallback: (message: any) => void,
): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(activeChatMessagesArray)) {
                throw new Error("activeChatMessagesArray should be an array");
            }

            const messages = activeChatMessagesArray.map((chat) => ({
                //@ts-ignore
                role: chat.role as "system" | "user" | "assistant",
                content: chat.text,
            }));

            let assistantMessage = "";

            await OpenAiStream(messages, (chunk) => {
                assistantMessage += chunk;
                updateCallback(chunk);
            });

            //@ts-ignore
            const fullResponse: Message = { text: assistantMessage, role: "assistant" };
            finalizeCallback(fullResponse);
            resolve();
        } catch (error) {
            console.error("Error during OpenAI stream:", error);
            reject(error);
        }
    });
};

const handleStaticTask = async (
    eventTask: string,
    data: any,
    activeChatMessagesArray: any[],
    updateCallback: (message: string) => void,
    finalizeCallback: (message: any) => void,
): Promise<any> => {
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
            return openaiStreamRequest(activeChatMessagesArray, updateCallback, finalizeCallback);
        default:
            console.log("No handler found for static task");
            return null;
    }
};

export interface MatrixStreamHookProps {
    chatId: string;
    model?: string;
    options?: AiParamsType;
    index?: number;
}

export const useRequestManager = ({ chatId, model = "gpt-4o", options, index = 0 }: MatrixStreamHookProps) => {
    const hookId = "OpenAiStream";
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId, index }));
    const setStreamStatus = useSetRecoilState(streamStatusAtom);
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const setStreamMessage = useSetRecoilState(assistantTextStreamAtom);

    const eventTask = useRecoilValue(requestEventTaskAtom);
    const socketEvent = useRecoilValue(requestSocketEventAtom);
    const { handleDynamicElements } = useDynamicSocketHandler();
    console.log("useRequestManager");

    const handleRequest = async (
        data: any,
        updateCallback: (message: string) => void,
        finalizeCallback: (message: any) => void,
    ) => {
        try {
            if (typeof apiHandlers[eventTask] === "function") {
                console.log(`Handling ${eventTask} with custom handler`);
                const response = await apiHandlers[eventTask](data);
                console.log("API response:", response);
            } else {
                console.log(`Handling static task for ${eventTask}`);
                const staticTaskResponse = await handleStaticTask(
                    eventTask,
                    data,
                    //@ts-ignore
                    messages,
                    updateCallback,
                    finalizeCallback,
                );
                if (
                    staticTaskResponse === null &&
                    EVENT_TASKS.includes(eventTask as (typeof EVENT_TASKS)[number]) &&
                    SOCKET_EVENTS.includes(socketEvent as (typeof SOCKET_EVENTS)[number])
                ) {
                    await handleDynamicElements();
                }
            }
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    return { handleRequest };
};
