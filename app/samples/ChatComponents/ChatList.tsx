import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { ChatSidebarListAtom } from "@/context/atoms/chatAtoms";

interface ChatData {
    chatId: string;
    chatTitle: string;
}

const ChatList = ({ user_id }: { user_id: string }) => {
    const [chats, setChats] = useRecoilState(ChatSidebarListAtom);

    useEffect(() => {
        fetch(`/api/chats?user_id=${user_id}`)
            .then(res => res.json())
            .then((data: Record<string, string>) => {
                const chatList: ChatData[] = Object.entries(data).map(([chatId, chatTitle]) => ({
                    chatId,
                    chatTitle,
                }));
                setChats(chatList);
            })
            .catch(error => console.error('Error fetching chats:', error));
    }, [user_id, setChats]);

    return (
        <div>
            <p>Chats for: {user_id}</p>
            <ul>
                {chats.map(({ chatId, chatTitle }) => (
                    <li key={chatId}>
                        <Link href={`/samples/chats/${chatId}`}>{chatTitle}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
