'use client';

import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { useSetActiveChat } from '@/app/trials/recoil/local/hooks/useSetActiveChat';
import CRUDTable from '@/app/trials/recoil/local/components/CRUDComponents/CRUDTable';
import { CRUDHeader, CRUDDataItem, CRUDAction } from '@/app/trials/recoil/local/components/CRUDComponents/types';
import { useRecoilValue } from 'recoil';


interface ChatSummariesPageProps {
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatSummariesPage: React.FC<ChatSummariesPageProps> = ({textAreaRef}) => {
    const chatSummaries = useRecoilValue(chatSummariesAtom);
    const {setActiveChat} = useSetActiveChat();

    const headers: CRUDHeader[] = [
        {id: 'chatId', name: 'Chat ID'},
        {id: 'chatTitle', name: 'Chat Title'},
        {id: 'createdAt', name: 'Created At'},
        {id: 'lastEdited', name: 'Last Edited'},
        {id: 'metadata', name: 'Metadata'},
        {id: 'matrixId', name: 'Matrix ID'},
    ];

    const dataEntries = chatSummaries.map((chat) => ({
        id: chat.chatId,
        chatId: chat.chatId,
        chatTitle: chat.chatTitle,
        createdAt: chat.createdAt,
        lastEdited: chat.lastEdited,
        metadata: chat.metadata,
        matrixId: chat.matrixId,
    }));

    const handleAdd = (item: CRUDDataItem) => {

        setActiveChat('new--------------------------------------------------------chat');
        textAreaRef.current?.focus();
    };

    const handleEdit = (item: CRUDDataItem) => {
        setActiveChat(item.id);
    };

    const handleDelete = (id: string) => {
        setActiveChat('new--------------------------------------------------------chat');
    };

    const handleView = (item: CRUDDataItem) => {
        setActiveChat(item.chatId);
    };

    const handleAction = async (action: CRUDAction, item?: CRUDDataItem): Promise<boolean | void> => {
        if (action === 'view' && item) {
            handleView(item);
            return false;
        }
        if (action === 'delete' && item) {
            handleDelete(item.id);
            return true;
        }
        if (action === 'edit' && item) {
            handleEdit(item);
            return false;
        }
        if (action === 'add' && item) {
            handleAdd(item);
            return false;
        }

        return true;
    };

    const isLoading = false;

    return (
        <CRUDTable
            headers={headers}
            data={dataEntries}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onView={handleView}
            loading={isLoading}
            handleAction={handleAction}
        />
    );
};

export default ChatSummariesPage;
