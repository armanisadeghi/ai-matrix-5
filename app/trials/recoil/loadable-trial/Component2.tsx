"use client";

import { activeChatIdAtom, activeChatSelector } from "@/state/aiAtoms/aiChatAtoms";
import React from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

const ChatItem: React.FC<{ chat: any }> = ({ chat }) => {
    return (
        <div>
            <h2>{chat.chatTitle}</h2>
            <ul>
                {Object.keys(chat).map((key) => {
                    if (key !== "chatTitle") {
                        const value = chat[key as keyof any];
                        return <li key={key}>{`${key}: ${value}`}</li>;
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

function ChatSummaries() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(activeChatSelector);
    switch (chatSummariesLoadable.state) {
        case "hasValue":
            return (
                <div>
                    {Array.isArray(chatSummariesLoadable.contents) &&
                        chatSummariesLoadable.contents.map((chat: any) => <ChatItem key={chat.chatId} chat={chat} />)}
                </div>
            );
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            throw chatSummariesLoadable.contents;
        default:
            return null;
    }
}

export default ChatSummaries;
