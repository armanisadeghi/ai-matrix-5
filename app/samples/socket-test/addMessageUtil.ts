import { MessageType } from '@/types';
import { v4 as uuidv4 } from 'uuid';


const addMessage = (
    messages: MessageType[],
    chatId: string,
    text: string,
    role: string
): MessageType[] => {
    const newMessage: MessageType = {
        chatId: chatId,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        index: messages.length ? messages[messages.length - 1].index + 1 : 1,
        role: role,
        text: text,
    };

    return [...messages, newMessage];
};

export default addMessage;
