import { useRecoilState } from 'recoil';
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages,
} from "@/state/aiAtoms/chatAtoms";
import { MessageEntry, Role } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";

export const submitChatRequest = (
    userTextInput?: string,
    userMessageEntry?: MessageEntry
): Promise<void> => {
    const { addMessageWithRole, messages, addMessage } = useChatMessages();
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [assistantMessageEntry, setAssistantMessageEntry] = useRecoilState(assistantMessageEntryAtom);
    console.log('app/samples/ai-tests/shared/services/StreamToAtoms.ts submitChatRequest')

    return new Promise(async (resolve, reject) => {
        try {
            if (userTextInput) {
                // Step 1: Add user message to the chat array
                addMessageWithRole(userTextInput, 'user');
            } else if (userMessageEntry) {
                // Directly add the user message entry if provided
                addMessage(userMessageEntry);
            }

            // Get the updated chat array
            const updatedChat = messages;

            // Prepare the messages for the API call
            const messagesPayload = updatedChat.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            let assistantMessage: string = '';

            await OpenAiStream(messagesPayload, (chunk) => {
                // Step 3: Stream response into assistantTextStreamAtom
                assistantMessage += chunk;
                setAssistantTextStream(prev => prev + chunk);
            });

            // Step 4: Create a full assistant message entry
            const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' };

            // Step 5: Update the assistant message entry and chat array
            setAssistantMessageEntry(fullResponse);
            addMessage(fullResponse);

            resolve();
        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};
