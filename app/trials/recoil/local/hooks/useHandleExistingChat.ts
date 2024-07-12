import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { activeChatIdAtom, streamTriggerAtomFamily, userUpdatedArraySelector } from '@/state/aiAtoms/aiChatAtoms';
import { useMessageActions } from '@/app/trials/recoil/local/hooks/useMessageActions';
import { useCallback } from 'react';

export const useHandleExistingChat = () => {
    const { extractLastMessageAddReturnOne } = useMessageActions();
    const arrayWithUserMessage = useRecoilValue(userUpdatedArraySelector);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId: 'OpenAiStream', index: 0 }));

    return useCallback(() => {
        if (!arrayWithUserMessage) {
            console.error('arrayWithUserMessage is not ready');
            return;
        }

        const userMessageEntry = extractLastMessageAddReturnOne(arrayWithUserMessage);

        setStreamTrigger(true);

        console.log('Trigger status: ', true);
    }, [arrayWithUserMessage, extractLastMessageAddReturnOne, setStreamTrigger]);
};

export default useHandleExistingChat;
