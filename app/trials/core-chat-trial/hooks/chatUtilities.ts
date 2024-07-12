import { activeChatIdAtom, chatsAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { ChatType, MessageType } from '@/types';
import { useRecoilState, useSetRecoilState } from 'recoil';


export function setMessagesForChat(messages: MessageType[]) {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    if (activeChatId != null) {
        const setMessage = useSetRecoilState(messagesFamily(activeChatId));
        setMessage(messages);

        // TODO: Duplicate code to test different versions.
        const newSetMessages = useSetRecoilState(messagesFamily(activeChatId));
        newSetMessages(messages);
    }
}

export function addMessageToLocalChat(newMessage: MessageType) {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    if (activeChatId != null) {
        const setMessage = useSetRecoilState(messagesFamily(activeChatId));
        setMessage((messages) => [...messages, newMessage]);

        // TODO: Duplicate code to test different versions.
        const newSetMessages = useSetRecoilState(messagesFamily(activeChatId));
        newSetMessages((messages) => [...messages, newMessage]);
    }
}

export function addLocalChat(newChat: ChatType) {
    const setChats = useSetRecoilState(chatsAtom);
    setChats((chats) => [...chats, newChat]);
}
