import React, { Suspense } from 'react';
import { Badge, Button, Radio, RadioGroup, Space, Textarea } from "@mantine/core";
import Loading from "@/app/dashboard/loading";
import { useChatManager } from '../chats/hooks/useChatDbAtoms';
import ChatMessage from "@/app/samples/new-db/ChatMessage";

const ChatPage: React.FC = () => {
    const {
        selectedChatId,
        chatSummariesLoadable,
        chatDetailsLoadable,
        newMessage,
        setNewMessage,
        userId,
        firstName,
        handleChatSelect,
        handleCreateChat,
        handleAddMessage
    } = useChatManager();

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Badge variant="filled">{firstName}</Badge>
                <Space h="md" />
                <Badge variant="filled">{userId}</Badge>
                <Space h="md" />
            </Suspense>
            <Space h="md" />
            <Button onClick={handleCreateChat}>Create Chat</Button>
            <Space h="md" />
            <Suspense fallback={<Loading />}>
                {chatSummariesLoadable.state === 'hasValue' && (
                    <RadioGroup
                        variant="vertical"
                        label="Select a Chat"
                        required
                        onChange={(value: string) => handleChatSelect(value)}
                    >
                        {chatSummariesLoadable.contents.map((chat) => (
                            <Radio key={chat.chatId} value={chat.chatId} label={chat.chatTitle} />
                        ))}
                    </RadioGroup>
                )}
            </Suspense>
            <Space h="md" />
            {selectedChatId && (
                <Suspense fallback={<Loading />}>
                    {chatDetailsLoadable.state === 'hasValue' && (
                        <div>
                            <p><strong>Chat Title:</strong> {chatDetailsLoadable.contents.chatTitle}</p>
                            <p><strong>Chat ID:</strong> {chatDetailsLoadable.contents.chatId}</p>
                            <p><strong>User ID:</strong> {chatDetailsLoadable.contents.userId}</p>
                            <p><strong>Created At:</strong> {chatDetailsLoadable.contents.createdAt}</p>
                            <p><strong>Last Edited:</strong> {chatDetailsLoadable.contents.lastEdited}</p>
                            <p><strong>Metadata:</strong> {chatDetailsLoadable.contents.metadata}</p>
                            <div>
                                {chatDetailsLoadable.contents.messagesArray.map((message, index) => (
                                    <ChatMessage key={index} index={index} role={message.role} text={message.text} />
                                ))}
                            </div>
                        </div>
                    )}
                </Suspense>
            )}
            <Space h="md" />
            <Textarea
                placeholder="Enter a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.currentTarget.value)}
            />
            <Space h="md" />
            <Button onClick={handleAddMessage} disabled={!newMessage}>Add Message</Button>
        </div>
    );
};

export default ChatPage;
