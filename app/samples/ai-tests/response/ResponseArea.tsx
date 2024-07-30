// app/chat/response/ResponseArea.tsx

import { ScrollArea } from "@mantine/core";
import React from "react";
import AIResponse from "./AIResponse";
import { useResponses } from "./ResponseContext";
import UserMessage from "./UserMessage";

interface ResponseAreaProps {
    bottomPadding: number;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ bottomPadding }) => {
    const { messages } = useResponses();

    return (
        <ScrollArea style={{ flexGrow: 1, width: "95%", paddingBottom: bottomPadding }}>
            {messages.map((message) =>
                //@ts-ignore
                message.role === "user" ? (
                    <UserMessage key={message.id} message={message} />
                ) : (
                    <AIResponse key={message.id} message={message} />
                ),
            )}
        </ScrollArea>
    );
};

export default ResponseArea;
