// services/UserChatManager.ts

import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface IChat {
    loadMessagesFromDb(): unknown;
    resetChat(index: number): unknown;
    getMessages(): any;
    chat_id: string;
    chat_title: string;
    user_id?: string;
    created_at: string;
    last_edited: string;
    messages_array: any[];
    metadata: any;
}

class UserChatManager {
    user_id: string;
    private _chats: Record<string, IChat> | any = {};
    activeChat: IChat | null | any = null;

    constructor(user_id: string) {
        this.user_id = user_id;
    }

    private _addChat(chat: IChat | any) {
        this._chats[chat.chat_id] = chat;
    }

    async createChat(chat_title: string) {
        const chat_id = uuidv4();
        // const newChat = new Chat(chat_id, chat_title, this.user_id);
        const newChat = {
            chat_id: "",
            chat_title: "",
            user_id: "",
            created_at: "",
            last_edited: "",
            messages_array: [],
            metadata: undefined,
            loadMessagesFromDb: function (): unknown {
                throw new Error("Function not implemented.");
            },
            resetChat: function (index: number): unknown {
                throw new Error("Function not implemented.");
            },
            getMessages: function () {
                throw new Error("Function not implemented.");
            },
        };
        this._addChat(newChat);
        this.activeChat = newChat;

        // Insert the new chat into the Supabase database
        const { error } = await supabase.from("chats").insert({
            chat_id,
            chat_title,
            user_id: this.user_id,
            created_at: newChat.created_at,
            last_edited: newChat.last_edited,
            messages_array: [],
            metadata: {},
        });

        if (error) throw error;
    }

    switchActiveChat(chat_id: string) {
        if (this._chats[chat_id]) {
            this.activeChat = this._chats[chat_id];
        } else {
            throw new Error("Chat ID not found");
        }
    }

    async addMessageToActiveChat(role: string, text: string) {
        if (this.activeChat) {
            // await this.activeChat.addMessage(role, text);
        } else {
            throw new Error("No active chat selected");
        }
    }

    async loadChatsFromDb() {
        const { data, error } = await supabase.from("chats").select("chat_id, chat_title").eq("user_id", this.user_id);

        if (error) throw error;
        if (data) {
            for (const chat of data) {
                // const newChat = new Chat(chat.chat_id, chat.chat_title, this.user_id);
                const newChat = {
                    chat_id: "",
                    chat_title: "",
                    user_id: "",
                    created_at: "",
                    last_edited: "",
                    messages_array: [],
                    metadata: undefined,
                    loadMessagesFromDb: function (): unknown {
                        throw new Error("Function not implemented.");
                    },
                    resetChat: function (index: number): unknown {
                        throw new Error("Function not implemented.");
                    },
                    getMessages: function () {
                        throw new Error("Function not implemented.");
                    },
                };
                this._addChat(newChat);
            }
        }
    }

    async loadChatById(chat_id: string) {
        let chat = this._chats[chat_id];
        if (!chat) {
            const { data, error } = await supabase.from("chats").select("*").eq("chat_id", chat_id).single();

            if (error) throw error;
            if (data) {
                chat = {
                    chat_id: data.chat_id,
                    chat_title: data.chat_title,
                    created_at: data.created_at,
                    last_edited: data.last_edited,
                    messages_array: [],
                    metadata: data.metadata,
                    loadMessagesFromDb: async function () {
                        // Implement the function to load messages from the database
                    },
                    resetChat: function (index: number) {
                        // Implement the function to reset the chat
                    },
                    getMessages: function () {
                        // Implement the function to get messages
                    },
                };
                await chat.loadMessagesFromDb();
                this._addChat(chat);
            } else {
                throw new Error("Chat not found");
            }
        } else {
            await chat.loadMessagesFromDb();
        }
    }

    async deleteChatById(chat_id: string) {
        const { error } = await supabase.from("chats").delete().eq("chat_id", chat_id);

        if (error) throw error;

        delete this._chats[chat_id];
    }

    async resetChat(chat_id: string, index: number) {
        const chat = this._chats[chat_id];
        if (!chat) {
            throw new Error("Chat not found");
        }

        await chat.resetChat(index);
    }

    getAllChats(): Record<string, any>[] | any {
        return Object.values(this._chats).map((chat: any) => ({
            chat_id: chat.chat_id,
            chat_title: chat.chat_title,
            created_at: chat.created_at,
            last_edited: chat.last_edited,
            messages: chat.getMessages(),
            metadata: chat.metadata,
        }));
    }

    getAllTitlesAndIds(): Record<string, string> | any {
        return Object.fromEntries(Object.values(this._chats).map((chat: any) => [chat.chat_id, chat.chat_title]));
    }

    getChatById(chat_id: string): IChat | undefined | any {
        return this._chats[chat_id];
    }
}

export default UserChatManager;
