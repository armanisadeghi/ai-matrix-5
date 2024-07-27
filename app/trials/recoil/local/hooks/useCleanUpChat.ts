// hooks43/useCleanUpChat.ts

import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useRecoilCallback } from 'recoil';

export const useCleanUpChat = () => {
    const cleanUp = useRecoilCallback(({ snapshot, set }) => async () => {
        try {
            console.log('Cleaning up chat process');

            const activeChatId = await snapshot.getPromise(activeChatIdAtom);

        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }, []);

    return { cleanUp };
}

export default useCleanUpChat;
