import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from 'uuid';

type Role = 'system' | 'user' | 'assistant';

interface MessageEntry {
    role: Role;
    text: string;
}

class Chat {
    chatId: string;
    chatTitle: string;
    userId: string;
    createdAt: Date;
    lastEdited: Date;
    private _messages: MessageEntry[] = [];
    metadata: Record<string, any> = {};

    constructor(chatId: string, chatTitle: string, userId: string) {
        this.chatId = chatId;
        this.chatTitle = chatTitle;
        this.userId = userId;
        this.createdAt = new Date();
        this.lastEdited = new Date();
    }

    private _addMessage(message: MessageEntry) {
        this._messages.push(message);
        this.lastEdited = new Date();
    }

    async addMessage(role: Role, text: string) {
        const newMessage: MessageEntry = { role, text };
        this._addMessage(newMessage);

        // Update the chat in the Supabase database with the new message
        const { error } = await supabase
            .from('chats')
            .update({
                messages_array: this._messages,
                last_edited: this.lastEdited
            })
            .eq('chat_id', this.chatId);

        if (error) throw error;
    }

    async editMessage(index: number, newText: string) {
        if (0 <= index && index < this._messages.length) {
            const message = this._messages[index];
            message.text = newText;
            this.lastEdited = new Date();

            // Update the chat in the Supabase database with the edited message
            const { error } = await supabase
                .from('chats')
                .update({
                    messages_array: this._messages,
                    last_edited: this.lastEdited
                })
                .eq('chat_id', this.chatId);

            if (error) throw error;
        } else {
            throw new Error('Message index out of range');
        }
    }

    getMessages(): { role: Role; text: string }[] {
        return this._messages.map(message => ({
            role: message.role,
            text: message.text
        }));
    }

    getTransformedMessages(roleReplacement = 'sender', textReplacement = 'content'): Record<string, string>[] {
        return this._messages.map(message => ({
            [roleReplacement]: message.role,
            [textReplacement]: message.text
        }));
    }

    async loadMessagesFromDb() {
        const { data, error } = await supabase
            .from('chats')
            .select('messages_array')
            .eq('chat_id', this.chatId)
            .single();

        if (error) throw error;
        if (data) {
            this._messages = data.messages_array;
        }
    }
}


class UserChatManager {
    userId: string;
    private _chats: Record<string, Chat> = {};
    activeChat: Chat | null = null;

    constructor(userId: string) {
        this.userId = userId;
    }

    private _addChat(chat: Chat) {
        this._chats[chat.chatId] = chat;
    }

    async createChat(chatTitle: string) {
        const chatId = uuidv4();
        const newChat = new Chat(chatId, chatTitle, this.userId);
        this._addChat(newChat);
        this.activeChat = newChat;

        // Insert the new chat into the Supabase database
        const { error } = await supabase
            .from('chats')
            .insert({
                id: chatId,
                title: chatTitle,
                user_id: this.userId,
                created_at: newChat.createdAt,
                last_edited: newChat.lastEdited,
                messages_array: [],
                metadata: {}
            });

        if (error) throw error;
    }

    switchActiveChat(chatId: string) {
        if (this._chats[chatId]) {
            this.activeChat = this._chats[chatId];
        } else {
            throw new Error('Chat ID not found');
        }
    }

    async addMessageToActiveChat(role: Role, text: string) {
        if (this.activeChat) {
            await this.activeChat.addMessage(role, text);
        } else {
            throw new Error('No active chat selected');
        }
    }

    async loadChatsFromDb() {
        const { data, error } = await supabase
            .from('chats')
            .select('id, title')
            .eq('user_id', this.userId);

        if (error) throw error;
        if (data) {
            for (const chat of data) {
                const newChat = new Chat(chat.id, chat.title, this.userId);
                this._addChat(newChat);
            }
        }
    }

    async loadChatById(chatId: string) {
        const chat = this._chats[chatId];
        if (chat) {
            await chat.loadMessagesFromDb();
        } else {
            throw new Error('Chat ID not found');
        }
    }

    getAllChats(): Record<string, any>[] {
        return Object.values(this._chats).map(chat => ({
            chat_id: chat.chatId,
            chat_title: chat.chatTitle,
            created_at: chat.createdAt,
            last_edited: chat.lastEdited,
            messages: chat.getMessages(),
            metadata: chat.metadata
        }));
    }

    getAllTitlesAndIds(): Record<string, string> {
        return Object.fromEntries(Object.values(this._chats).map(chat => [chat.chatId, chat.chatTitle]));
    }

    getChatById(chatId: string): Chat | undefined {
        return this._chats[chatId];
    }
}

export default UserChatManager;


/*
// Example usage
(async () => {
    const userChatManager = new UserChatManager('a048d457-c058-481b-a9a1-7d821b6435d5');

    // Load all chat titles and ids from the database
    await userChatManager.loadChatsFromDb();

    // Get all chat titles and ids
    const chatTitlesAndIds = userChatManager.getAllTitlesAndIds();
    console.log(chatTitlesAndIds);

    // Create a chat
    await userChatManager.createChat('Travel Tips Chat');

    // Switch to a specific chat
    userChatManager.switchActiveChat('db283651-e7a2-451c-84db-51ebbbb969b0');

    // Load the full chat details on demand
    await userChatManager.loadChatById('db283651-e7a2-451c-84db-51ebbbb969b0');

    // Add messages to the active chat
    await userChatManager.addMessageToActiveChat('user', 'Are you able to give travel tips?');
    await userChatManager.addMessageToActiveChat('assistant', 'Absolutely! Feel free to ask anything specific about New York that you need help with.');

    // Get all messages as a list of dictionaries
    const allChatsArray = userChatManager.activeChat?.getMessages();
    console.log(allChatsArray);

    // Get transformed messages with different keys
    const transformedMessages = userChatManager.activeChat?.getTransformedMessages('sender', 'content');
    console.log(transformedMessages);
})();
*/