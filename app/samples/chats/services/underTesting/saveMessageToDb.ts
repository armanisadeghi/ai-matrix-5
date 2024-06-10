import { useRecoilValue } from 'recoil';
import { activeUserAtom } from "@/context/atoms/userAtoms";
import { activeChatIdAtom } from "@/state/aiAtoms/chatAtoms";

async function saveMessageToDb(newMessage: { role: string; text: string }) {
    const user_id = useRecoilValue(activeUserAtom)?.id;
    const chat_id = useRecoilValue(activeChatIdAtom);

    console.log('User ID:', user_id);
    console.log('Chat ID:', chat_id);

    if (!user_id || !chat_id) {
        console.error('User ID and chat ID are required.');
        throw new Error('User ID and chat ID are required.');
    }

    const data = {
        user_id: user_id,
        chat_id: chat_id,
        ...newMessage
    };

    console.log('Data to be sent:', data);

    try {
        const response = await fetch(`/api/chats?user_id=${user_id}&chat_id=${chat_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Response data:', result);

        return result;

    } catch (error) {
        console.error('There was a problem adding the message:', error);
        throw error;
    }
}

export default saveMessageToDb;
