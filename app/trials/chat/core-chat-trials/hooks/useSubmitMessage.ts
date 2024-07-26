import { addAssistantMessage } from '@/utils/supabase/chatDb';
import { useRecoilState } from 'recoil';
import { activeChatIdAtom, assistantTextStreamAtom, activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import { OpenAiStream } from '@/app/api/openai/route';


interface OpenaiMessageEntry {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const useSubmitMessage = () => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessages, setActiveChatMessages] = useRecoilState(activeChatMessagesArrayAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);

    return async () => {
        if (!activeChatId || activeChatId === 'new-chat' || activeChatMessages.length === 0) {
            return;
        }
        const createdAt = new Date().toISOString();
        const chatId = activeChatId;
        const index = activeChatMessages.length;

        const updatedMessages: OpenaiMessageEntry[] = activeChatMessages.map(msg => ({
            role: msg.role as 'system' | 'user' | 'assistant',
            content: msg.text,
        }));

        let assistantMessage = '';
        let assistantStream = '';

        await OpenAiStream(updatedMessages, (chunk) => {
            setAssistantTextStream(assistantStream += chunk);
            const newMessageEntry = {
                chatId: chatId,
                createdAt: createdAt,
                index: index,
                text: assistantMessage += chunk,
                role: 'assistant'
            };

            setActiveChatMessages([...activeChatMessages, newMessageEntry]);
        });

        addAssistantMessage(activeChatId, assistantMessage);

        //setAssistantTextStream(''); // Reset the streaming text state at the end (removed for testing)
        return {
            newAssistantEntry: {chatId, createdAt, index, text: assistantMessage, role: 'assistant'}
        };
    };
};

export default useSubmitMessage;
