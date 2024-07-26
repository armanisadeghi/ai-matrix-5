/*
import { atomFamily, useRecoilCallback, useRecoilValueLoadable } from 'recoil';
import { chatMessagesSelector, chatSummariesSelector } from '@/hooks43/ai/useChatAtomsDb';



export const chatSummaryFamily = atomFamily<Chat[], string>({
    key: 'chatSummaryFamily',
    default: [],
});


/!*

export const useInitializeUserChats = () => {
    const initialize = useRecoilCallback(({ snapshot, set }) => async (userId: string) => {
        const summariesLoadable = snapshot.getLoadable(chatSummariesSelector(userId));
        if (summariesLoadable.state === 'hasValue') {
            const summaries = summariesLoadable.contents;
            set(chatSummaryFamily(userId), summaries);

            await Promise.all(summaries.map(async summary => {
                const messagesLoadable = snapshot.getLoadable(chatMessagesSelector(summary.chatId));
                if (messagesLoadable.state === 'hasValue') {
                    const messages = messagesLoadable.contents;
                    set(chatWithMessagesFamily(summary.chatId), messages);
                }
            }));
        }
    });
    return initialize;
};

*!/
*/
