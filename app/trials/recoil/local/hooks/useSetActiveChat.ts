import { ChatDetailsType, ChatType, MessageType } from '@/types';
import { useRecoilState, useRecoilValue, useSetRecoilState, useRecoilValueLoadable, Loadable } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { activeChatIdAtom, chatSummariesAtom, isNewChatAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';

interface SetActiveChatReturn {
    chatId: string;
    isNewChat: boolean;
    fullChat: ChatDetailsType | null;
}

interface UseSetActiveChatReturn {
    activeChatId: string;
    isNewChat: boolean;
    setActiveChat: (chatId?: string) => SetActiveChatReturn;
    messages: MessageType[];
    chatSummaries: ChatType[];
}

export function useSetActiveChat(): UseSetActiveChatReturn {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const setMessages = useSetRecoilState(messagesFamily(activeChatId));

    const chatSummaries = useRecoilValue<ChatType[]>(chatSummariesAtom);

    const setActiveChat = (chatId?: string): SetActiveChatReturn => {
        if (chatId === 'new--------------------------------------------------------chat' || !chatId) {
            const newChatId = uuidv4();
            setActiveChatId(newChatId);
            // setIsNewChat(true); Commented out due to outside errors. TODO: Put back, if running this.
            setMessages([]);
            return { chatId: newChatId, isNewChat: true, fullChat: null };
        } else {
            setActiveChatId(chatId);
            setIsNewChat(false);
            return { chatId, isNewChat: false, fullChat: null };
        }
    };


   // TODO: I Don't think we need the full chat here
    //const activeFullChatLoadable = useRecoilValueLoadable(fullChatSelectorFamily(activeChatId));
    const messages = useRecoilValue(messagesFamily(activeChatId));

/*    let activeFullChat: ChatDetailsType | null = null;
    let activeFullChatState: 'loading' | 'hasValue' | 'hasError' = 'loading';

    if (activeFullChatLoadable.state === 'hasValue') {
        activeFullChat = activeFullChatLoadable.contents;
        activeFullChatState = 'hasValue';
    } else if (activeFullChatLoadable.state === 'hasError') {
        activeFullChat = activeFullChatLoadable.contents;
        activeFullChatState = 'hasError';
    }*/

    return {
        activeChatId,
        isNewChat,
        setActiveChat,
        messages,
        chatSummaries,
    };
}
