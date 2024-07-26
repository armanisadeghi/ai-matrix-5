import { activeChatIdAtom, activeChatMessagesArrayAtom, chatSummariesAtom, isNewChatAtom } from '@/state/aiAtoms/aiChatAtoms';
import { ActiveChatMessagesType } from '@/types';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const useChangeActiveChat = () => {
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    //setIsNewChat(false);

    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);

    const chatMessagesLoadable = useRecoilValueLoadable(chatSummariesAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState<ActiveChatMessagesType[]>(activeChatMessagesArrayAtom);

    const changeActiveChat = () => {
        if (activeChatId === null) {
            console.log('useChangeActiveChat Page is loading for the first time. Confirm state and do nothing.');
            setActiveChatId('new--------------------------------------------------------chat');
            setActiveChatMessagesArray([]);
        } else if (activeChatId === 'new--------------------------------------------------------chat') {
            console.log('useChangeActiveChat User clicked new chat to start a new chat.');
            setActiveChatMessagesArray([]);
        } else {
            if (chatMessagesLoadable.state === 'hasValue') {
                console.log('useChangeActiveChat User clicks on a chat summary in the sidebar to go to a different chat.');
                setActiveChatMessagesArray(chatMessagesLoadable.contents);
            } else if (chatMessagesLoadable.state === 'loading') {
                console.log('useChangeActiveChat Loading chat messages...');
            } else if (chatMessagesLoadable.state === 'hasError') {
                console.error('Error loading chat messages:', chatMessagesLoadable.contents);
            }
        }
    };

    return changeActiveChat;
};

export default useChangeActiveChat;
