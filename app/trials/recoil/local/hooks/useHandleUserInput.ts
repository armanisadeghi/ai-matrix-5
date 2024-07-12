import useStreamChat from '@/app/trials/recoil/local/hooks/useSteamChat';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchStatusAtom, isNewChatAtom, streamTriggerAtomFamily, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useHandleNewChat } from './useHandleNewChat';
import { useHandleExistingChat } from './useHandleExistingChat';

export const useHandleUserInput = () => {
    const isNewChat = useRecoilValue(isNewChatAtom);
    const fetchStatus = useRecoilValue(fetchStatusAtom);
    const setIsNewChat = useSetRecoilState(isNewChatAtom);
    const setUserTextInput = useSetRecoilState(userTextInputAtom);
    const handleNewChat = useHandleNewChat();
    const handleExistingChat = useHandleExistingChat();
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId: 'OpenAiStream', index: 0 }));
    const [streamChatProps, setStreamChatProps] = useState({ trigger: false, onComplete: () => {} });

    useStreamChat(streamChatProps);

    const triggerProcessing = useCallback(async () => {
        try {
            if (isNewChat) {
                await handleNewChat();
                setIsNewChat(false);
            } else {
                await handleExistingChat();
            }
        } catch (error) {
            console.error('Error processing chat:', error);
        } finally {
            setStreamChatProps({
                trigger: true,
                onComplete: () => {
                    setStreamTrigger(false);
                    setUserTextInput('');
                }
            });
        }
    }, [handleNewChat, handleExistingChat, setIsNewChat, setUserTextInput]);

    useEffect(() => {
        if (streamTrigger) {
            triggerProcessing();
        }
    }, [streamTrigger, triggerProcessing]);

    return {
        triggerProcessing,
        isProcessing: fetchStatus === 'fetching',
        processingError: fetchStatus === 'error' || fetchStatus === 'dbError',
    };
};

export default useHandleUserInput;
