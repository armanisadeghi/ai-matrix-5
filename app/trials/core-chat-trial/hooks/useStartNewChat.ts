/*
import { userTextInputAtom, isNewChatAtom, activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { ChatDetailsType, Json } from '@/types';
import { createChatStartEntry } from '@/utils/supabase/chatDb';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSubmitMessage from '@/app/trials/core-chat-trial/hooks/useSubmitMessage';


function useStartNewChat() {
    const userMessage = useRecoilValue(userTextInputAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const [activeChatId,] = useRecoilState(activeChatIdAtom);

    const submitMessage = useSubmitMessage();

    // const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesSpecialSelector);
    const startNewChat = () => {

        if (!isNewChat || userMessage.length === 0 || !startChatObject) {
            return;
        }
        // setActiveChatMessages(startingMessages);
        const newChatDetails: ChatDetailsType = startChatObject;
        setFetchMessages(newChatDetails);
        setIsNewChat(false);

        submitMessage();

        //setLiveChatDetails(startChatObject);
        createChatStartEntry(startChatObject as unknown as Json);

        // TODO: add to local store as well.
        //setChatSummaries([...chatSummaries, startChatObject]);
    };

    return startNewChat;
}

export default useStartNewChat;
*/
