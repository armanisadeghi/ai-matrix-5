/*
import supabase from "@/utils/supabase/client";
import { Role, MessageEntry } from "@/types/chat.ts";

class Chat {
    chat_id: string;
    chat_title: string;
    user_id: string;
    created_at: Date;
    last_edited: Date;
    private _messages: MessageEntry[] = [];
    metadata: Record<string, any> = {};

    constructor(chat_id: string, chat_title: string, user_id: string) {
        this.chat_id = chat_id;
        this.chat_title = chat_title;
        this.user_id = user_id;
        this.created_at = new Date();
        this.last_edited = new Date();
    }

    private _addMessage(message: MessageEntry) {
        this._messages.push(message);
        this.last_edited = new Date();
    }

    async addMessage(role: Role, text: string) {
        const newMessage: MessageEntry = { role, text };
        this._addMessage(newMessage);

        // Update the chat in the Supabase database with the new message
        const { error } = await supabase
            .from('chats')
            .update({
                messages_array: this._messages,
                last_edited: this.last_edited
            })
            .eq('chat_id', this.chat_id);

        if (error) throw error;
    }

    async editMessage(index: number, newText: string) {
        if (0 <= index && index < this._messages.length) {
            const message = this._messages[index];
            message.text = newText;
            this.last_edited = new Date();

            // Update the chat in the Supabase database with the edited message
            const { error } = await supabase
                .from('chats')
                .update({
                    messages_array: this._messages,
                    last_edited: this.last_edited
                })
                .eq('chat_id', this.chat_id);

            if (error) throw error;
        } else {
            throw new Error('Message index out of range');
        }
    }

    async resetChat(index: number) {
        if (0 <= index && index < this._messages.length) {
            this._messages = this._messages.slice(0, index + 1);
            this.last_edited = new Date();

            // Update the chat in the Supabase database with the reset messages
            const { error } = await supabase
                .from('chats')
                .update({
                    messages_array: this._messages,
                    last_edited: this.last_edited
                })
                .eq('chat_id', this.chat_id);

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
            .eq('chat_id', this.chat_id)
            .single();

        if (error) throw error;
        if (data) {
            this._messages = data.messages_array;
        }
    }
}

export default Chat;
*/
