"use client";

import ChatSummariesPage from "@/app/trials/recoil/local/components/chatCrudTable";
import useNewHandleUserInput from "@/app/trials/recoil/local/hooks/useNewHandleUserInput";
import { useSetActiveChat } from "@/app/trials/recoil/local/hooks/useSetActiveChat";
import {
    chatMessagesAtomFamily,
    fetchStatusAtom,
    hasSubmittedMessageAtom,
    userTextInputAtom,
    userUpdatedArraySelector,
} from "@/state/aiAtoms/aiChatAtoms";
import { Button, Pill, Space, Textarea } from "@mantine/core";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const ChatTestPage: React.FC = () => {
    const { activeChatId, isNewChat, setActiveChat, chatSummaries } = useSetActiveChat();
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(activeChatId));
    const messagesText = (messages && messages.map((msg) => msg.text).join("\n")) || "";
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const arrayWithUserMessage = useRecoilValue(userUpdatedArraySelector);
    const fetchStatus = useRecoilValue(fetchStatusAtom);
    const [, setHasSubmittedMessage] = useRecoilState(hasSubmittedMessageAtom);

    const { triggerProcessing } = useNewHandleUserInput();

    const handleAddMessage = () => {
        setHasSubmittedMessage(true);
        triggerProcessing();
    };

    const handleAddMessageOld = () => {
        if (arrayWithUserMessage) {
            const updatedArray = [...arrayWithUserMessage];
            setMessages(updatedArray);
            setUserTextInput("");
        }
    };

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <ChatSummariesPage textAreaRef={textAreaRef} />
            <Space h="sm" />
            <Pill.Group>
                <Pill>Chat Id: {activeChatId}</Pill>
                <Pill>New Chat? {isNewChat ? "Yes" : "No"}</Pill>
                <Pill>Fetch Status? : {fetchStatus}</Pill>
                <Button
                    onClick={() => setActiveChat("new--------------------------------------------------------chat")}
                >
                    New Chat
                </Button>
                <Button onClick={() => setActiveChat(activeChatId)}>Current Chat</Button>
            </Pill.Group>

            <Textarea
                ref={textAreaRef}
                value={userTextInput}
                onChange={(event) => setUserTextInput(event.currentTarget.value)}
                autosize
            />
            <Space w={"sm"} />
            <Button onClick={handleAddMessage}>Add Message</Button>
            <Space h="lg" />
            <Textarea value={messagesText} autosize />
            <Space h="xl" />
        </>
    );
};

export default ChatTestPage;
