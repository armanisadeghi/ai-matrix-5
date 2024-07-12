import useStreamChat from '@/app/trials/recoil/local/hooks/useSteamChat';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { fetchStatusAtom, isNewChatAtom, userTextInputAtom, chatStartSelector, messagesFamily, activeChatIdAtom, userUpdatedArraySelector, streamTriggerAtomFamily, hookIdAtom, hookIndexAtom, chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useMessageActions } from '@/app/trials/recoil/local/hooks/useMessageActions';


export const useHandleUserInput = () => {
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const fetchStatus = useRecoilValue(fetchStatusAtom);
    const hookId = useRecoilValue(hookIdAtom);
    const hookIndex = useRecoilValue(hookIndexAtom)
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({ hookId: hookId, index: hookIndex }));
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const {extractLastMessageAddReturnOne} = useMessageActions();
    const [streamChatProps, setStreamChatProps] = useState({trigger: false, onComplete: () => {}});

    useStreamChat(streamChatProps);

    const handleChat = useRecoilCallback(({snapshot, set}) => async () => {
        if (isNewChat) {
            const startChatObject = await snapshot.getPromise(chatStartSelector);
            if (!startChatObject) return;

            const {messages, ...chatSummary} = startChatObject;
            set(chatSummariesAtom, (prevSummaries) => [...prevSummaries, chatSummary]);
            set(messagesFamily(startChatObject.chatId), messages);
        } else {
            const arrayWithUserMessage = await snapshot.getPromise(userUpdatedArraySelector);
            const activeChatId = await snapshot.getPromise(activeChatIdAtom);

            if (!arrayWithUserMessage) {
                console.error('arrayWithUserMessage is not ready');
                return;
            }

            const userMessageEntry = extractLastMessageAddReturnOne(arrayWithUserMessage);
            console.log('User message entry:', userMessageEntry);
        }

        setStreamTrigger(true);
    }, [isNewChat, extractLastMessageAddReturnOne]);

    const triggerProcessing = useCallback(async () => {
        try {
            await handleChat();
            if (isNewChat) {
                setIsNewChat(false);
            }
        }
        catch (error) {
            console.error('Error processing chat:', error);
        }
        finally {
            setStreamChatProps({
                trigger: true,
                onComplete: () => {
                    setStreamTrigger(false);
                    setUserTextInput('');
                }
            });
        }
    }, [handleChat, isNewChat, setIsNewChat, setUserTextInput, setStreamTrigger]);

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
