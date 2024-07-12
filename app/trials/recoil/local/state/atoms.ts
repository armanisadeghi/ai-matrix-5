import { activeChatIdAtom, chatStartSelector, isNewChatAtom, messagesFamily, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatDetailsType, ChatType, MessageType } from '@/types';
import { createChatStartEntry } from '@/utils/supabase/chatDb';
import { atom, atomFamily, selector, selectorFamily, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';






const initializeNewChat = async ({ get, set }: { get: any, set: any }) => {
    const activeChatId = get(activeChatIdAtom);
    const startChatObject = get(chatStartSelector(activeChatId));

    // Create a new object without messages
    const chatSummary: ChatType = {
        chatId: startChatObject.chatId,
        chatTitle: startChatObject.chatTitle,
        createdAt: startChatObject.createdAt,
        lastEdited: startChatObject.lastEdited,
        matrixId: startChatObject.matrixId,
        metadata: startChatObject.metadata,
    };

    // Add the new chat summary to chatSummariesAtom
    set(chatSummariesAtom, (prevSummaries: ChatType[]) => [...prevSummaries, chatSummary]);

    // Update messagesFamily with the new messages
    set(messagesFamily(activeChatId), startChatObject.messages);

    // Update the database
    try {
        await createChatStartEntry(startChatObject);
    } catch (error) {
        console.error('Error creating chat start entry:', error);
        // You might want to add error handling or revert changes here
    }
};



const useStartNewChat = () => {
    const [chatDetails, startChat] = useRecoilState(chatStartSelector);

    const initiateNewChat = (userMessage: string) => {
        // Set user message
        setUserTextInput(userMessage);

        // Trigger chat start
        startChat({} as ChatDetailsType); // Type assertion to satisfy TS, actual value doesn't matter
    };

    return { chatDetails, initiateNewChat };
};
