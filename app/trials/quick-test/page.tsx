/*
'use client';

import { chatMessagesSelectorFamily } from '@/state/aiAtoms/chatMessagesState';
import { Textarea } from '@mantine/core';
import { useRecoilValue } from 'recoil';


function Page() {
    const {
        messages,
        initialChats,
        fetchMessages,
        addUserMessage,
        addAssistantText,
    } = useRecoilValue(chatMessagesSelectorFamily('chatId'));




    return <>
    <Textarea placeholder="Enter your text here" />





    </>;
}

export default Page;
*/
