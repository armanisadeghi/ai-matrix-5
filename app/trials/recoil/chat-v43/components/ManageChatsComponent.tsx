"use client";

import { ChatType } from "@/types";
import {
    ActionIcon,
    Button,
    Card,
    Container,
    Divider,
    Group,
    LoadingOverlay,
    Modal,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { formatDate } from "@storybook/blocks";
import { IconEdit, IconMessage, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

const CreateChatForm: React.FC = () => {
    const { setActiveChat, createChat } = useActiveChat43();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (title.trim().length < 3) {
            notifications.show({
                title: "Error",
                message: "Chat title must be at least 3 characters long",
                color: "red",
            });
            return;
        }

        setIsLoading(true);
        try {
            const activeChat = await setActiveChat("new-chat");

            if (activeChat) {
                activeChat.chatTitle = title;
                await createChat(activeChat);
            }

            setTitle("");
            notifications.show({ title: "Success", message: "Chat created successfully", color: "green" });
        } catch (error) {
            notifications.show({ title: "Error", message: "Failed to create chat", color: "red" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper p="md" withBorder>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="New Chat Title"
                    placeholder="Enter chat title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    required
                    minLength={3}
                />
                <Button type="submit" mt="md" leftSection={<IconPlus size={14} />} loading={isLoading}>
                    Create Chat
                </Button>
            </form>
        </Paper>
    );
};

const UpdateChatModal: React.FC<{ chat: ChatType | null; onClose: () => void }> = ({ chat, onClose }) => {
    const { updateChatTitle } = useActiveChat43();
    const [title, setTitle] = useState(chat?.chatTitle || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!chat) return;
        if (title.trim().length < 3) {
            notifications.show({
                title: "Error",
                message: "Chat title must be at least 3 characters long",
                color: "red",
            });
            return;
        }
        setIsLoading(true);
        try {
            await updateChatTitle(chat.chatId, title);
            notifications.show({ title: "Success", message: "Chat updated successfully", color: "green" });
            onClose();
        } catch (error) {
            notifications.show({ title: "Error", message: "Failed to update chat", color: "red" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal opened={!!chat} onClose={onClose} title="Update Chat">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Chat Title"
                    placeholder="Enter new chat title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    required
                    minLength={3}
                />
                <Button type="submit" mt="md" loading={isLoading}>
                    Update Chat
                </Button>
            </form>
        </Modal>
    );
};

const ChatList: React.FC<{ onEditChat: (chat: ChatType) => void }> = ({ onEditChat }) => {
    const { deleteChat, setActiveChat } = useActiveChat43();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const { chatSummaries, loading, error } = useLoadChats43();

    const handleDelete = async (chatId: string) => {
        if (window.confirm("Are you sure you want to delete this chat?")) {
            setIsDeleting(chatId);
            try {
                await deleteChat(chatId);
                notifications.show({ title: "Success", message: "Chat deleted successfully", color: "green" });
            } catch (error) {
                notifications.show({ title: "Error", message: "Failed to delete chat", color: "red" });
            } finally {
                setIsDeleting(null);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Stack gap="xs">
            {chatSummaries.map((chat) => (
                <Card key={chat.chatId} shadow="sm" p="lg" radius="md" withBorder>
                    <Group justify="apart" style={{ marginBottom: 5, marginTop: chat.chatTitle ? 5 : 0 }}>
                        <Text size="md">{chat.chatTitle}</Text>
                        <Group>
                            <Tooltip label="Set as active chat">
                                <ActionIcon color="blue" onClick={() => setActiveChat(chat.chatId)}>
                                    <IconMessage size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit chat">
                                <ActionIcon color="yellow" onClick={() => onEditChat(chat)}>
                                    <IconEdit size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Delete chat">
                                <ActionIcon
                                    color="red"
                                    onClick={() => handleDelete(chat.chatId)}
                                    loading={isDeleting === chat.chatId}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                    <Text size="sm" color="dimmed">
                        ID: {chat.chatId}
                    </Text>
                    <Text size="sm" color="dimmed">
                        Created: {formatDate(new Date(chat.createdAt))}
                    </Text>
                    <Text size="sm" color="dimmed">
                        Edited: {formatDate(new Date(chat.lastEdited))}
                    </Text>
                </Card>
            ))}
        </Stack>
    );
};

export const ManageChatsComponent: React.FC = () => {
    const [chatToUpdate, setChatToUpdate] = useState<ChatType | null>(null);
    const { chatSummaries, loading, error } = useLoadChats43();

    return (
        <Container size="lg">
            <LoadingOverlay visible={!chatSummaries} overlayProps={{ blur: 2 }} />
            <Title order={2} mb="xl">
                Manage Chats
            </Title>
            <Stack gap="xl">
                <CreateChatForm />
                <Divider my="md" label="Your Chats" labelPosition="center" />
                <ChatList onEditChat={setChatToUpdate} />
            </Stack>
            <UpdateChatModal chat={chatToUpdate} onClose={() => setChatToUpdate(null)} />
        </Container>
    );
};
function useActiveChat43(): { updateChatTitle: any; setActiveChat: any; createChat: any; deleteChat: any } {
    throw new Error("Function not implemented.");
}

function useLoadChats43(): { chatSummaries: any; loading: any; error: any } {
    throw new Error("Function not implemented.");
}
