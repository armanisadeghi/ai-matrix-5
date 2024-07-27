import { OpenAiStream } from "@/app/api/openai/route";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilState } from "recoil";

const StreamOpenaiArmani = () => {
    const [ assistantTextStream, setAssistantTextStream ] = useRecoilState(assistantTextStreamAtom);
    const [ activeChatMessagesArray, setActiveChatMessagesArray ] = useRecoilState(activeChatMessagesArrayAtom);

    return new Promise(async (reject) => {
        try {
            const messages = activeChatMessagesArray.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            let assistantMessage: string = '';

            await OpenAiStream(messages, (chunk) => {
                assistantMessage += chunk;

                setAssistantTextStream(assistantMessage);
            });

            const fullResponse: any = {
                index: activeChatMessagesArray.length,
                role: 'assistant' as string,
                text: assistantMessage,
            };

            const updatedArray = [...activeChatMessagesArray, fullResponse];
            setActiveChatMessagesArray(updatedArray);

        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};

export default StreamOpenaiArmani;
