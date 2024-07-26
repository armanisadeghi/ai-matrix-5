/*
// app/trials/core-chat-trial/hooks43/mergedHookAtoms/mergedChatSummaries.ts
'use client';

import { ChatType } from '@/types';
import supabase from '@/utils/supabase/client';
import { activeUserAtom } from '@/state/userAtoms';
import { atom, selector, useRecoilState, useRecoilValueLoadable } from 'recoil';


export const chatSummariesAtom = atom<ChatType[]>({
    key: 'chatSummariesAtom',
    default: [],
});

const chatSummariesSelector = selector({
    key: 'chatSummariesSelector',
    get: async ({get}) => {
        const activeUser = get(activeUserAtom);
        const {data, error} = await supabase.rpc('fetch_user_chats', {user_matrix_id: activeUser.matrixId});
        if (error) {
            console.error('Error fetching chats:', error.message);
            return [];
        }
        return data;
    }
});


const useChatSummaries = () => {
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);
    const [chatSummaries, setChatSummaries] = useRecoilState(chatSummariesAtom);

    switch (chatSummariesLoadable.state) {
        case 'hasValue':
            if (chatSummaries.length === 0) {
                setChatSummaries(chatSummariesLoadable.contents);
            }
            return chatSummaries;
        case 'loading':
            return 'loading';
        case 'hasError':
            throw chatSummariesLoadable.contents;
        default:
            return null;
    }
};
*/
