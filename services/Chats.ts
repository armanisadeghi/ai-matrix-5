// services/Chats.ts
import { UserManager, User } from './Users';
import { v4 as uuidv4 } from 'uuid';
import { ChatsDb } from '@/utils/supabase/ChatsDb';

export enum RoleType {
    system = 'system',
    user = 'user',
    assistant = 'assistant'
}

export abstract class MessageEntry {
    text: string;
    role: RoleType;

    protected constructor(text: string, role: RoleType) {
        this.text = text;
        this.role = role;
    }
}

export class SystemEntry extends MessageEntry {
    constructor(text: string) {
        super(text, RoleType.system);
    }
}

export class UserEntry extends MessageEntry {
    constructor(text: string) {
        super(text, RoleType.user);
    }
}

export class AssistantEntry extends MessageEntry {
    constructor(text: string) {
        super(text, RoleType.assistant);
    }
}

export class MessageManager {
    messages: MessageEntry[];

    constructor() {
        this.messages = [];
    }

    addMessage(message: MessageEntry) {
        this.messages.push(message);
    }

    getMessages(): MessageEntry[] {
        return this.messages;
    }

    getMessageArray(): { text: string, role: RoleType }[] {
        return this.messages.map(msg => ({ text: msg.text, role: msg.role }));
    }

    editMessage(index: number, newText: string) {
        if (index < this.messages.length) {
            this.messages[index].text = newText;
        }
    }

    removeMessage(index: number) {
        if (index < this.messages.length) {
            this.messages.splice(index, 1);
        }
    }

    removeMessagesAfter(index: number) {
        if (index < this.messages.length) {
            this.messages = this.messages.slice(0, index + 1);
        }
    }

    getMessagesByType(role: RoleType): MessageEntry[] {
        return this.messages.filter(msg => msg.role === role);
    }

    getMessagesArrayByType(role: RoleType): { text: string, role: RoleType }[] {
        return this.messages.filter(msg => msg.role === role).map(msg => ({ text: msg.text, role: msg.role }));
    }
}

export class Chat {
    chatId: string; // corresponds to id
    chatTitle: string; // corresponds to title
    userId: string; // corresponds to user_id
    createdTimestamp: Date; // corresponds to created_at
    lastEditedTimestamp: Date; // corresponds to last_edited
    messageManager: MessageManager; // corresponds to chat_messages
    metadata: Record<string, any>; // corresponds to metadata

    constructor(chatId: string, chatTitle: string, userId: string, metadata: Record<string, any> = {}) {
        this.chatId = chatId;
        this.chatTitle = chatTitle;
        this.userId = userId;
        this.createdTimestamp = new Date();
        this.lastEditedTimestamp = new Date();
        this.messageManager = new MessageManager();
        this.metadata = metadata;
    }

    addMessageToChat(message: MessageEntry) {
        this.messageManager.addMessage(message);
        this.updateLastEditedTimestamp();
    }

    getChatMessages(): MessageEntry[] {
        return this.messageManager.getMessages();
    }

    getChatMessagesArray(): { text: string, role: RoleType }[] {
        return this.messageManager.getMessageArray();
    }

    editChatMessage(index: number, newText: string) {
        this.messageManager.editMessage(index, newText);
        this.updateLastEditedTimestamp();
    }

    removeChatMessage(index: number) {
        this.messageManager.removeMessage(index);
        this.updateLastEditedTimestamp();
    }

    removeChatMessagesAfter(index: number) {
        this.messageManager.removeMessagesAfter(index);
        this.updateLastEditedTimestamp();
    }

    getUserMessages(): MessageEntry[] {
        return this.messageManager.getMessagesByType(RoleType.user);
    }

    getUserMessagesArray(): { text: string, role: RoleType }[] {
        return this.messageManager.getMessagesArrayByType(RoleType.user);
    }

    getAssistantMessages(): MessageEntry[] {
        return this.messageManager.getMessagesByType(RoleType.assistant);
    }

    getAssistantMessagesArray(): { text: string, role: RoleType }[] {
        return this.messageManager.getMessagesArrayByType(RoleType.assistant);
    }

    getSystemMessages(): MessageEntry[] {
        return this.messageManager.getMessagesByType(RoleType.system);
    }

    getSystemMessagesArray(): { text: string, role: RoleType }[] {
        return this.messageManager.getMessagesArrayByType(RoleType.system);
    }

    exportChatHistory(): string {
        return JSON.stringify(this.messageManager.getMessages());
    }

    importChatHistory(json: string) {
        const messages = JSON.parse(json) as MessageEntry[];
        this.messageManager = new MessageManager();
        messages.forEach(msg => this.messageManager.addMessage(msg));
        this.updateLastEditedTimestamp();
    }

    changeChatTitle(newTitle: string) {
        this.chatTitle = newTitle;
        this.updateLastEditedTimestamp();
    }

    private updateLastEditedTimestamp() {
        this.lastEditedTimestamp = new Date();
    }
}

export class ChatManager {
    static instance: ChatManager;
    public chats: Chat[];
    activeChat: Chat | undefined;
    userManager: UserManager | undefined;
    cachedActiveUser: User | null;
    chatsDb: ChatsDb;

    constructor() {
        this.chats = [];
        this.cachedActiveUser = null;
        this.chatsDb = new ChatsDb();
    }

    public static getInstance(): ChatManager {
        if (!ChatManager.instance) {
            ChatManager.instance = new ChatManager();
        }
        return ChatManager.instance;
    }

    public async initializeUserManager(): Promise<void> {
        if (!this.userManager) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.userManager = await UserManager.getInstance();
        }
    }

    public async initializeAllChatsForUser(userId: string): Promise<Chat[]> {
        const userChats = await this.chatsDb.getAllChatByUserId(userId);

        if (userChats) {
            this.chats = userChats;
        }

        return this.chats;
    }

    async createChat(chatTitle: string, chatId: string = uuidv4(), metadata: Record<string, any> = {}): Promise<string | void> {
        await this.initializeUserManager();

        if (!this.userManager) {
            throw new Error('UserManager not initialized. Please call initializeUserManager() before creating chats.');
        }

        let user = this.cachedActiveUser;

        if (!user) {
            let retryCount = 0;
            while (!user && retryCount < 10) {
                try {
                    user = await this.userManager.getActiveUser(); // Try to fetch from UserManager
                    if (!user) {
                        console.log(`Attempt ${retryCount + 1}: No active user set. Retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                    }
                } catch (error) {
                    console.error(`Attempt ${retryCount + 1} failed with error: ${error}`);
                    if (retryCount >= 9) {
                        console.error('Failed to obtain an active user after 10 attempts. Cannot create chat.');
                        return; // Exit the method if no user can be obtained after retries
                    }
                }
                retryCount++;
            }
        }

        if (!user) return; // If no user is found after retries, exit the method

        this.cachedActiveUser = user;  // Cache the retrieved active user for future use

        const chat = new Chat(chatId, chatTitle, user.id, metadata);

        this.setActiveChat(chatId);

        return chatId;
    }

    setActiveChat(chatId: string): void {
        this.activeChat = this.chats.find(chat => chat.chatId === chatId);
    }

    getActiveChat(): Chat | undefined {
        return this.activeChat;
    }

    getChat(chatId: string): Chat | undefined {
        return this.chats.find(chat => chat.chatId === chatId);
    }

    getDetailsForAllChats(): Chat[] {
        return this.chats;
    }

    async getAllChatsForUser(userId: string): Promise<void> {
        const userChats = await this.chatsDb.getAllChatByUserId(userId);
        if (userChats) {
            this.chats = userChats;
        }
    }

    async saveAllChatsForUser(userId: string): Promise<void> {
        for (const chat of this.chats) {
            await this.chatsDb.updateChat(chat.chatId, chat);
        }
    }

    async updateChat(chatId: string, updatedData: Partial<Chat>): Promise<void> {
        const chat = this.getChat(chatId);
        if (chat) {
            Object.assign(chat, updatedData);
            await this.chatsDb.updateChat(chatId, chat);
        }
    }

    exportAllChats(): string {
        return JSON.stringify(this.chats);
    }

    importAllChats(json: string) {
        const chats = JSON.parse(json) as Chat[];
        this.chats = chats.map(chat => {
            const newChat = new Chat(chat.chatId, chat.chatTitle, this.cachedActiveUser?.id || '', chat.metadata);
            newChat.importChatHistory(JSON.stringify(chat.messageManager.getMessages()));
            return newChat;
        });
    }

    getAllChatDetailsArray(): { chatId: string, chatTitle: string, userId: string, messages: { text: string, role: string }[] }[] {
        return this.chats.map(chat => ({
            chatId: chat.chatId,
            chatTitle: chat.chatTitle,
            userId: chat.userId,
            messages: chat.getChatMessagesArray()
        }));
    }

    getChatMessagesArray(chatId?: string): { text: string, role: string }[] | undefined {
        const chat = chatId ? this.getChat(chatId) : this.activeChat;
        return chat?.getChatMessagesArray();
    }

    addMessageToChat(message: MessageEntry, chatId?: string) {
        const chat = chatId ? this.getChat(chatId) : this.activeChat;
        if (chat) {
            chat.addMessageToChat(message);
        } else {
            console.log('Chat not found or no active chat set');
        }
    }

    createChatWithSystemMessage(chatTitle: string, MessageEntry = {text: 'You are a helpful assistant.', role: 'system'}) {
        this.createChat(chatTitle);
        this.addMessageToChat(new SystemEntry(MessageEntry.text));
        return this.activeChat;
    }

    changeChatTitle(newTitle: string, chatId?: string) {
        const chat = chatId ? this.getChat(chatId) : this.activeChat;
        if (chat) {
            chat.changeChatTitle(newTitle);
        } else {
            throw new Error('Chat not found or no active chat set');
        }
    }

    getActiveChatMessagesArray(format: string = 'matrix'): any {
        if (!this.activeChat) return undefined;

        switch (format.toLowerCase()) {
            case 'openai':
                return this.getOpenAiMessageArray(this.activeChat.chatId);
            case 'claude':
                return this.getClaudeMessageArray(this.activeChat.chatId);
            case 'gemini':
                return this.getGeminiMessageArray(this.activeChat.chatId);
            case 'matrix':
            default:
                return this.getMatrixMessageArray(this.activeChat.chatId);
        }
    }

    renameKeys(array: { text: string, role: string }[], textKey: string, roleKey: string): any[] {
        return array.map(item => ({
            [roleKey]: item.role,
            [textKey]: item.text
        }));
    }

    getMatrixMessageArray(chatId?: string): { role: string, text: string }[] | undefined {
        const messages = this.getChatMessagesArray(chatId);
        return messages ? this.renameKeys(messages, 'text', 'role') as { role: string, text: string }[] : undefined;
    }

    getOpenAiMessageArray(chatId?: string): { role: string, content: string }[] | undefined {
        const messages = this.getChatMessagesArray(chatId);
        return messages ? this.renameKeys(messages, 'content', 'role') as { role: string, content: string }[] : undefined;
    }

    getClaudeMessageArray(chatId?: string): { system: string, content: { type: string, text: string }[] } | undefined {
        const messages = this.getChatMessagesArray(chatId);
        if (!messages) return undefined;

        const systemMessage = messages.find(msg => msg.role === 'system')?.text || '';
        const content = messages
            .filter(msg => msg.role !== 'system')
            .map(msg => ({ type: 'text', text: msg.text }));

        return { system: systemMessage, content };
    }

    getGeminiMessageArray(chatId?: string): { messages: string[] } | undefined {
        const messages = this.getChatMessagesArray(chatId);
        return messages ? { messages: messages.map(msg => msg.text) } : undefined;
    }

    getChatTitlesAndIds(): { chatId: string, chatTitle: string }[] {
        return this.chats.map(chat => ({
            chatId: chat.chatId,
            chatTitle: chat.chatTitle
        }));
    }
}
