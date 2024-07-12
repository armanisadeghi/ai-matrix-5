import "reflect-metadata";
import { Json } from '@/types';
import supabase from '@/utils/supabase/client';
import { Expose, Type, plainToInstance, Transform } from 'class-transformer';

interface Dictionary {
    [key: string]: any;
}


type dbFunctions = {
    add_assistant_message: {
        Args: {
            chatid: string
            message: string
        }
        Returns: undefined
    }
    add_custom_message:
        | {
        Args: {
            chat_id: string
            role: string
            message: string
            created_at: string
            index: number
        }
        Returns: undefined
    }
        | {
        Args: {
            chat_id: string
            role: string
            message: string
            message_index?: number
            message_created_at?: string
        }
        Returns: undefined
    }
    add_system_message: {
        Args: {
            chat_id: string
            message: string
        }
        Returns: undefined
    }
    add_user_message: {
        Args: {
            chat_id: string
            message: string
        }
        Returns: undefined
    }
    clone_and_edit_chat: {
        Args: {
            original_chat_id: string
            edited_index: number
            new_message: string
            new_message_role: string
        }
        Returns: {
            chatId: string
            chatTitle: string
            createdAt: string
            lastEdited: string
            matrixId: string
            metadata: Json
            messages: Json
        }[]
    }
    clone_chat: {
        Args: {
            original_chat_id: string
        }
        Returns: {
            chatId: string
            chatTitle: string
            createdAt: string
            lastEdited: string
            matrixId: string
            metadata: Json
            messages: Json
        }[]
    }
    fetch_chat_messages: {
        Args: {
            p_chat_id: string
        }
        Returns: {
            chatid: string
            messages: Json
        }[]
    }
    fetch_complete_chat_with_messages: {
        Args: {
            p_chat_id: string
        }
        Returns: Json
    }
    fetch_messages: {
        Args: {
            pchatid: string
        }
        Returns: {
            chatId: string
            createdAt: string
            id: string
            index: number
            text: string
            role: string
        }[]
    }
    fetch_user_chats: {
        Args: {
            matrixid: string
        }
        Returns: {
            chatId: string
            chatTitle: string
            createdAt: string
            lastEdited: string
            matrixId: string
            metadata: Json
        }[]
    }
    start_new_chat: {
        Args: {
            user_matrix_id: string
            system_message: string
            user_message: string
        }
        Returns: {
            chatId: string
            chatTitle: string
            createdAt: string
            lastEdited: string
            matrixId: string
            metadata: Json
            messages: Json
        }[]
    }
    upsert_from_auth0: {
        Args: {
            p_auth0_id: string;
            p_auth0_sid: string;
            p_first_name: string;
            p_last_name: string;
            p_email: string;
            p_email_verified: boolean;
            p_full_name: string;
            p_nickname: string;
            p_picture: string;
            p_updated_at: string;
            p_phone: string;
            p_phone_verified: boolean;
        };
        Returns: {
            matrixId: string;
            auth0Id: string;
            auth0Sid: string;
            createdAt: string;
            firstName: string;
            lastName: string;
            nickname: string;
            fullName: string;
            picture: string;
            updatedAt: string;
            accountType: string;
            accountStatus: string;
            orgId: string;
            role: string;
            phone: string;
            phoneVerified: boolean;
            email: string;
            emailVerified: boolean;
            preferredPicture: string;
            lastLogin: string;
            lastActivity: string;
        }[];
    };
    upsert_user: {
        Args: {
            p_auth0_id: string;
            p_auth0_sid: string;
            p_first_name: string;
            p_last_name: string;
            p_email: string;
            p_email_verified: boolean;
            p_full_name: string;
            p_nickname: string;
            p_picture: string;
            p_updated_at: string;
            p_phone: string;
            p_phone_verified: boolean;
        };
        Returns: {
            matrixId: string;
            auth0Id: string;
            auth0Sid: string;
            createdAt: string;
            firstName: string;
            lastName: string;
            nickname: string;
            fullName: string;
            picture: string;
            updatedAt: string;
            accountType: string;
            accountStatus: string;
            orgId: string;
            role: string;
            phone: string;
            phoneVerified: boolean;
            email: string;
            emailVerified: boolean;
            preferredPicture: string;
            lastLogin: string;
            lastActivity: string;
        }[];
    };
    upsert_with_any_data: {
        Args: {
            p_matrix_id: string;
            p_updated_at: string;
            p_first_name?: string;
            p_last_name?: string;
            p_nickname?: string;
            p_full_name?: string;
            p_picture?: string;
            p_account_type?: string;
            p_account_status?: string;
            p_org_id?: string;
            p_role?: string;
            p_phone?: string;
            p_phone_verified?: boolean;
            p_email?: string;
            p_email_verified?: boolean;
            p_preferred_picture?: string;
            p_last_login?: string;
            p_last_activity?: string;
        };
        Returns: {
            matrixId: string;
            firstName: string;
            lastName: string;
            nickname: string;
            fullName: string;
            picture: string;
            updatedAt: string;
            accountType: string;
            accountStatus: string;
            orgId: string;
            role: string;
            phone: string;
            phoneVerified: boolean;
            email: string;
            emailVerified: boolean;
            preferredPicture: string;
            lastLogin: string;
            lastActivity: string;
        }[];
    };
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
        const transformedKey = customSnakeCaseMappings[key] || key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        acc[transformedKey] = params[key];
        return acc;
    }, {} as Dictionary);
}

// Function to transform object keys to camelCase, considering exceptions
function transformToCamelCase(obj: Dictionary): Dictionary {
    return Object.keys(obj).reduce((acc, key) => {
        const transformedKey = customCamelCaseMappings[key] || key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
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

type SupabaseOperation = keyof dbFunctions;
type args = keyof dbFunctions[SupabaseOperation]['Args'];

// A generic function to handle transformations for any table and operation
async function performDatabaseOperation(operation: SupabaseOperation, params: dbFunctions[SupabaseOperation][args]) {
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

export { fetchChatMessages, cloneAndEditChat, performDatabaseOperation, transformToSnakeCase, transformToCamelCase, ChatType, MessageType };
