// TypeScript type for message_type
import supabase from '@/utils/supabase/client';


export type MessageType = {
    chatId: string;
    createdAt: string;
    id: string;
    index: number;
    text: string;
    role: string;
};

// TypeScript type for simple_message_type
export type SimpleMessageType = {
    index: number;
    text: string;
    role: string;
};

// TypeScript type for chat_type
export type ChatType = {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: any;
};

// TypeScript type for chat_messages_response_type
export type ChatMessagesResponseType = {
    chatId: string;
    messages: MessageType[];
};

// TypeScript type for the response of start_new_chat
export type StartNewChatResponse = {
    chatId: string;
    chatTitle: string;
    createdAt: string;
    lastEdited: string;
    matrixId: string;
    metadata: any;
    messages: {
        chatId: string;
        createdAt: string;
        id: string;
        index: number;
        text: string;
        role: string;
    }[];
};

// TypeScript type for the request parameters of start_new_chat
export type StartNewChatRequest = {
    userMatrixId: string;
    systemMessage: string;
    userMessage: string;
};


async function startNewChat(request: StartNewChatRequest): Promise<StartNewChatResponse> {
    const { data, error } = await supabase
    .rpc('start_new_chat', {
        user_matrix_id: request.userMatrixId,
        system_message: request.systemMessage,
        user_message: request.userMessage
    });

    if (error) {
        console.error('Error starting new chat:', error);
        throw error;
    } else {
        if (Array.isArray(data) && data.length > 0) {
            return data[0] as StartNewChatResponse;
        } else {
            throw new Error('Unexpected response format');
        }
    }
}


