
interface Message {
    id: number;  // Adding an ID for message tracking
    role: string;
    content: string;
}

interface FormResponse {
    question: string;
    response: string;
}

interface CustomInput {
    inputType: string;
    inputValue: string;
}

interface ChatHistoryEntry extends Message {}  // Inherits from Message

interface PromptData {
    chatId: string;
    promptMessage: Message;
    formResponses: FormResponse[];
    customInputs: CustomInput[];
    chatHistory: ChatHistoryEntry[];
}
//@ts-ignore
export const promptDataAtom = atom<PromptData>({
    chatId: '1002',
    promptMessage: {
        id: 0,  // Default ID for the initial prompt
        role: '',
        content: '',
    },
    formResponses: [],
    customInputs: [],
    chatHistory: [],
});

// Utility function to add a new message or update an existing one in chat history
//@ts-ignore
export const updateChatHistory = atom(
    null,
    (get, set, updatedMessage: ChatHistoryEntry) => {
        const promptData = get(promptDataAtom);
        const existingMessageIndex = promptData.chatHistory.findIndex(m => m.id === updatedMessage.id);
        if (existingMessageIndex !== -1) {
            // Update existing message
            const updatedChatHistory = promptData.chatHistory.map((m, idx) => idx === existingMessageIndex ? updatedMessage : m);
            set(promptDataAtom, { ...promptData, chatHistory: updatedChatHistory });
        } else {
            // Add new message
            const newChatHistory = [...promptData.chatHistory, updatedMessage];
            set(promptDataAtom, { ...promptData, chatHistory: newChatHistory });
        }
    }
);

// Utility function to update the prompt message
//@ts-ignore
export const updatePromptMessage = atom(
    null,
    (get, set, updatedMessage: Message) => {
        const promptData = get(promptDataAtom);
        set(promptDataAtom, { ...promptData, promptMessage: updatedMessage });
    }
);

// Utility functions for form responses and custom inputs
//@ts-ignore
export const updateFormResponses = atom(
    null,
    (get, set, responses: FormResponse[]) => {
        const promptData = get(promptDataAtom);
        set(promptDataAtom, { ...promptData, formResponses: responses });
    }
);

//@ts-ignore
export const updateCustomInputs = atom(
    null,
    (get, set, inputs: CustomInput[]) => {
        const promptData = get(promptDataAtom);
        set(promptDataAtom, { ...promptData, customInputs: inputs });
    }
);
