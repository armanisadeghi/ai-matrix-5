import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

function useChatCleanup() {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const chatMessagesLoadable = useRecoilValueLoadable(chatMessagesSelector);

    const cleanupChat = async () => {
        // Clear the chat messages
        /*
        setChatMessages([]);

        // Reset the chat session state or other necessary states
        setChatSessionState({
            isActive: false,
            lastActiveTime: null,
            // other relevant state resets
        });

        // Perform any additional cleanup operations, such as:
        // - Closing network connections
        // - Stopping any chat timers
        // - Clearing local storage or cache related to the chat

         */

        console.log('Chat cleanup completed.');
    };

    return cleanupChat;
}

export default useChatCleanup;
