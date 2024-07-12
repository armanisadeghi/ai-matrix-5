import { activeChatIdAtom, chatsAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { ChatType, MessageType } from '@/types';
import { useRecoilState, useSetRecoilState } from 'recoil';


const useChatOperations = () => {
    const [activeChatId] = useRecoilState(activeChatIdAtom);
    const setChats = useSetRecoilState(chatsAtom);
    const setMessages = useSetRecoilState(messagesFamily(activeChatId));

    const addMessageToLocalChat = (newMessage: MessageType) => {
        setMessages(messages => [...messages, newMessage]);
    };

    const addLocalChat = (newChat: ChatType) => {
        setChats(chats => [...chats, newChat]);
    };

    const addChatWithMessages = (newChatWithMessages: ChatType & { messages: MessageType[] }) => {
        const { messages, ...newChat } = newChatWithMessages;
        if (newChat.chatId !== activeChatId) {
            console.error("Attempting to add a chat with a mismatched chat ID.");
            return;
        }
        setChats(chats => [...chats, newChat]);
        setMessages(() => messages);
    };

    return {
        addMessageToLocalChat,
        addLocalChat,
        addChatWithMessages,
    };
};

export default useChatOperations;
