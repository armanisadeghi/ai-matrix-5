import { useRecoilValue } from 'recoil';
import { activeUserAtom } from "@/context/atoms/userAtoms";
import { activeChatIdAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

async function saveMessageToDb(newMessage: { role: string; text: string }) {
    const user_id = useRecoilValue(activeUserAtom)?.id;
    const chat_id = useRecoilValue(activeChatIdAtom);

    if (!user_id || !chat_id) {
        throw new Error('User ID and chat ID are required.');
    }

    const data = {
        user_id: user_id,
        chat_id: chat_id,
        ...newMessage
    };

    try {
        const response = await fetch(`/api/chats?user_id=${user_id}&chat_id=${chat_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();


    } catch (error) {
        console.error('There was a problem adding the message:', error);
        throw error;
    }



}

export default saveMessageToDb;
