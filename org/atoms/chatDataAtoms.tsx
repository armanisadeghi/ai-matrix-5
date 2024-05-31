// /atoms/chatDataAtoms.tsx

import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils'

import { ChatData, CurrentMessage, PromptMessage, FormResponse, CustomInput, ChatHistory, preparedMessages } from '../types/chatData';

// Atom for the entire chat data
export const chatDataAtom = atom<ChatData | null>(null);

// Individual atoms for each property in ChatData
export const chatDataIdAtom = atom((get) => get(chatDataAtom)?.id || '');
export const chatDataNameAtom = atom((get) => get(chatDataAtom)?.name || '');
export const chatDataCurrentMessageAtom = atom((get) => get(chatDataAtom)?.currentMessage || {} as CurrentMessage);
export const chatDataChatHistoryAtom = atom((get) => get(chatDataAtom)?.chatHistory || [] as ChatHistory[]);

// Individual atoms for each property in CurrentMessage
export const currentMessagePromptMessageAtom = atom((get) => get(chatDataCurrentMessageAtom)?.promptMessage || {} as PromptMessage);
export const currentMessageFormResponsesAtom = atom((get) => get(chatDataCurrentMessageAtom)?.formResponses || [] as FormResponse[]);
export const currentMessageCustomInputsAtom = atom((get) => get(chatDataCurrentMessageAtom)?.customInputs || [] as CustomInput[]);

// Derived atom for the prompt message details
export const promptMessageIndexAtom = atom((get) => get(currentMessagePromptMessageAtom)?.index || 0);
export const promptMessageRoleTypeAtom = atom((get) => get(currentMessagePromptMessageAtom)?.roleType || 'user');
export const promptMessageMessageAtom = atom((get) => get(currentMessagePromptMessageAtom)?.message || '');

// Atom families for dynamic elements
export const formResponseAtomFamily = atomFamily((index: number) =>
    atom((get) => get(currentMessageFormResponsesAtom)?.find(fr => fr.index === index) || {} as FormResponse)
);

export const customInputAtomFamily = atomFamily((index: number) =>
    atom((get) => get(currentMessageCustomInputsAtom)?.find(ci => ci.index === index) || {} as CustomInput)
);

export const chatHistoryAtomFamily = atomFamily((index: number) =>
    atom((get) => get(chatDataChatHistoryAtom)?.find(ch => ch.index === index) || {} as ChatHistory)
);

// Derived atom for current form responses
export const currentFormResponseQuestionsAtom = atom((get) =>
    get(currentMessageFormResponsesAtom).map(fr => fr.question)
);

export const currentFormResponseAnswersAtom = atom((get) =>
    get(currentMessageFormResponsesAtom).map(fr => fr.response)
);

// Derived atom for custom inputs
export const customInputBrokersAtom = atom((get) =>
    get(currentMessageCustomInputsAtom).map(ci => ci.inputBroker)
);

export const customInputValuesAtom = atom((get) =>
    get(currentMessageCustomInputsAtom).map(ci => ci.inputValue)
);

// Derived atom for chat history messages
export const chatHistoryMessagesAtom = atom((get) =>
    get(chatDataChatHistoryAtom).map(ch => ({ type: ch.roleType, text: ch.message }))
);

// Atom for combined messages ensuring full structure
export const preparedMessagesAtom = atom((get) => {
    const chatHistoryMessages = get(chatHistoryMessagesAtom);
    const promptMessage = get(currentMessagePromptMessageAtom);

    if (!promptMessage.message) {
        return [];
    }

    return [...chatHistoryMessages, { type: promptMessage.roleType, text: promptMessage.message }];
});

// Derived atom for full ChatData
export const derivedChatDataAtom = atom<ChatData>((get) => ({
    id: get(chatDataIdAtom),
    name: get(chatDataNameAtom),
    currentMessage: {
        promptMessage: get(currentMessagePromptMessageAtom),
        formResponses: get(currentMessageFormResponsesAtom),
        customInputs: get(currentMessageCustomInputsAtom),
    },
    chatHistory: get(chatDataChatHistoryAtom),
}));
