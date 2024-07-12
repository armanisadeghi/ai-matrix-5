'use client';

import { ChatType } from '@/types';
import supabase from '@/utils/supabase/client';
import { activeUserAtom } from '@/state/userAtoms';
import { atom, selector, useRecoilState, useRecoilValueLoadable } from 'recoil';

const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom-NotUsed2',
    default: [],
});

const chatSummariesSelector = selector({
    key: 'chatSummariesSelector-NotUsed1',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        if (!activeUser) {
            return [];
        }
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data || [];
    }
});

const useChatSummaries = () => {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    if (chatSummariesLoadable.state === 'hasValue') {
        if (chatSummaries.length === 0) {
            setChatSummaries(chatSummariesLoadable.contents);
        }
        return chatSummaries;
    } else if (chatSummariesLoadable.state === 'loading') {
        return 'loading';
    } else if (chatSummariesLoadable.state === 'hasError') {
        throw chatSummariesLoadable.contents;
    } else {
        return null;
    }
};

export default useChatSummaries;
