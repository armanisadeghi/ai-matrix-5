/*
import { activeChatIdAtom, chatTransitionAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { chatStarter } from '@/state/aiAtoms/chatMessagesState';
import { activeUserAtom } from '@/state/userAtoms';
import { ChatType, mapToChatType } from '@/types';
import supabase from '@/utils/supabase/client';
import { useCallback, useEffect } from 'react';
import { atom, selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4, v4 } from 'uuid';

// Existing chatSummariesAtom
const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom',
    default: selector({
        key: 'chatSummariesDefault',
        get: async ({get}) => {
            const matrixId = get(activeUserAtom).matrixId;
            if (!matrixId) return [];
            console.log('activeUser Matrix ID:', matrixId);
            const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: matrixId});
            if (error) {
                console.error('Failed to fetch chat summaries:', error);
                return [];
            }
            return data
                ? data.map(mapToChatType).sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
                : [];
        },
    }),
});


const chatObjectSelector = selectorFamily<ChatType, string>({
    key: 'chatObjectSelector',
    get: (chatId: string) => ({get}) => {
        const chatSummaries = get(chatSummariesAtom);
        const existingChat = chatSummaries.find(chat => chat.chatId === chatId);

        if (existingChat) {
            return existingChat;
        } else {
            // Create a new chat object if it doesn't exist
            const activeUser = get(activeUserAtom);
            return {
                chatId: v4(),
                chatTitle: `new-chat-${chatId.slice(-5)}`,
                createdAt: new Date().toISOString(),
                lastEdited: new Date().toISOString(),
                matrixId: activeUser.matrixId,
                metadata: {},
                fetchedMessages: false,
            };
        }
    },
    set: (chatId: string) => ({set, get}, newValue) => {
        set(chatSummariesAtom, (prevSummaries) => {
            const index = prevSummaries.findIndex(chat => chat.chatId === chatId);
            if (index !== -1) {
                // Update existing chat
                const updatedSummaries = [...prevSummaries];
                updatedSummaries[index] = newValue as ChatType;
                return updatedSummaries;
            } else {
                // Add new chat
                return [...prevSummaries, newValue as ChatType];
            }
        });
    },
});

// Usage example
const useChatObject = (chatId: string) => {
    return useRecoilValue(chatObjectSelector(chatId));
};


const useCreateAndSetChat = () => {
    const newChatId = useRecoilCallback(({ snapshot, set }) => async (userInput: string) => {
        // Step 1: Get a new chat object (not stored in chats)
        const newChatId = v4();
        const newChat = snapshot.getLoadable(chatObjectSelector(newChatId)).getValue();

        // Step 2: Get chat with messages
        const chatWithMessages = chatStarter(userInput);

        // Step 3: Set the chatObjectSelector with the new chat
        set(chatObjectSelector(newChatId), {
            ...newChat,
            ...chatWithMessages,
        });

        return newChatId;
    });

    return newChatId;
};



function useStartNewChat() {
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [transitionState, setTransitionState] = useRecoilState(chatTransitionAtom);

    useEffect(() => {
        if (isNewChat === true && transitionState === 'idle') {
            const chatId = v4();
            setIsNewChat(false);
            setTransitionState('new');
            setActiveChatId(chatId);
            return chatId;

        } else if (isNewChat === false) {
            setTransitionState('idle');
            return activeChatId;
        } else {
            return activeChatId;
        }
    }, [isNewChat]);

    useEffect(() => {
        if (transitionState === 'transition') {
            setIsNewChat(false);
            setTransitionState('idle');
        }
    }, [transitionState]);

    return {
        startNewChat: () => {},
        finishTransition: () => {},
    };
}

*/
