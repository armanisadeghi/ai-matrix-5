import "reflect-metadata";
import { Json } from '@/types';
import supabase from '@/utils/supabase/client';
import { Expose, Type, plainToInstance, Transform } from 'class-transformer';

interface Dictionary {
    [key: string]: any;
}

type dbFunctions = {
    clone_and_edit_chat: {
        Args: {
            original_chat_id: string;
            edited_index: number;
            new_message: string;
            new_message_role: string;
        };
        Returns: {
            chatId: string;
            chatTitle: string;
            createdAt: string;
            lastEdited: string;
            matrixId: string;
            metadata: Json;
            messages: Json;
        }[];
    };
    fetch_chat_messages: {
        Args: {
            p_chat_id: string;
        };
        Returns: {
            chatid: string;
            messages: Json;
        }[];
    };
    // Other db functions
};

interface CloneAndEditChatParams {
    original_chat_id: string;
    edited_index: number;
    new_message: string;
    new_message_role: string;
}

// Custom mappings for exceptions in key transformations
const customSnakeCaseMappings: Dictionary = {
    specialFieldName: 'unique_special_field_name'
};

const customCamelCaseMappings: Dictionary = {
    // Database name: 'Frontend name'
    user_id: 'user_id'
};

// Function to transform object keys to snake_case, considering exceptions
function transformToSnakeCase(params: Dictionary): Dictionary {
    return Object.keys(params).reduce((acc, key) => {
        let transformedKey = customSnakeCaseMappings[key] || key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        // Handle specific cases
        if (key.startsWith('new')) {
            transformedKey = transformedKey.replace(/^new_/, '');
        }
        if (key.startsWith('edited')) {
            transformedKey = transformedKey.replace(/^edited_/, '');
        }
        if (key.startsWith('p_')) {
            transformedKey = transformedKey.replace(/^p_/, '');
        }
        acc[transformedKey] = params[key];
        return acc;
    }, {} as Dictionary);
}

// Function to transform object keys to camelCase, considering exceptions
function transformToCamelCase(obj: Dictionary): Dictionary {
    return Object.keys(obj).reduce((acc, key) => {
        let transformedKey = customCamelCaseMappings[key] || key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        // Handle specific cases
        if (key.startsWith('p_')) {
            transformedKey = key.replace(/^p_/, '');
        }
        acc[transformedKey] = obj[key];
        return acc;
    }, {} as Dictionary);
}

class MessageType {
    @Expose() chatId!: string;
    @Expose() createdAt!: string;
    @Expose() id!: string;
    @Expose() index!: number;
    @Expose() text!: string;
    @Expose() role!: string;

    @Expose()
    @Type(() => Object)
    @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value), { toClassOnly: true })
    @Transform(({ value }) => JSON.stringify(value), { toPlainOnly: true })
    metadata!: any;
}

class ChatType {
    @Expose() chatId!: string;
    @Expose() chatTitle!: string;
    @Expose() createdAt!: string;
    @Expose() lastEdited!: string;
    @Expose() matrixId!: string;

    @Expose()
    @Type(() => Object)
    @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value), { toClassOnly: true })
    @Transform(({ value }) => JSON.stringify(value), { toPlainOnly: true })
    metadata!: any;

    @Type(() => MessageType)
    @Expose() messages?: MessageType[];
}

// Function to fetch chat messages using a stored procedure
async function fetchChatMessages(originalChatId: string) {
    //@ts-ignore
    const { data, error } = await supabase.rpc('fetch_messages', { p_chat_id: originalChatId });
    console.log('fetchChatMessages fetched Message data: ', data)

    if (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }

    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
    }

    return data.map((item: any) => plainToInstance(ChatType, transformToCamelCase(item), { excludeExtraneousValues: true }));
}

// Function to clone and edit a chat using a stored procedure
async function cloneAndEditChat(originalChatId: string, editedIndex: number, newMessage: string, newMessageRole: string) {
    const params: dbFunctions['clone_and_edit_chat']['Args'] = {
        original_chat_id: originalChatId,
        edited_index: editedIndex,
        new_message: newMessage,
        new_message_role: newMessageRole
    };

    const snakeCaseParams = transformToSnakeCase(params);
    //@ts-ignore
    const { data, error } = await supabase.rpc('clone_and_edit_chat', snakeCaseParams);

    if (error) {
        console.error('Error cloning and editing chat:', error);
        throw error;
    }

    if (!data) {
        throw new Error('No data returned from clone_and_edit_chat');
    }

    return plainToInstance(ChatType, transformToCamelCase(data), { excludeExtraneousValues: true });
}

// Limited version of performDatabaseOperation for testing
//@ts-ignore
async function limitedPerformDatabaseOperation(operation: 'clone_and_edit_chat' | 'fetch_messages', params: dbFunctions[typeof operation]['Args']) {
    const snakeCaseParams = transformToSnakeCase(params);
    //@ts-ignore
    const { data, error } = await supabase.rpc(operation, snakeCaseParams);

    if (error) {
        console.error(`Error performing operation ${operation}:`, error);
        throw error;
    }

    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
    }

    // Determine the return type based on the operation, here we use ChatType as an example
    return data.map((item: any) => plainToInstance(ChatType, transformToCamelCase(item), { excludeExtraneousValues: true }));
}

export { fetchChatMessages, cloneAndEditChat, limitedPerformDatabaseOperation, transformToSnakeCase, transformToCamelCase, ChatType, MessageType };
