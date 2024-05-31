// /org/types/aiRequest.ts

import { Metadata } from '@/org/types/metadata';
import { User } from '@/org/types/user';
import { Recipe } from '@/org/types/recipe';
import { ChatData, preparedMessages } from '@/org/types/chatData';

import { Settings } from '@/org/types/settings';

export interface AIRequest {
    metadata: Metadata;  // Provides the core basics for the request to the backend.
    user: User;  // Provides the user's ID and token. (used for authentication and for proper storage and retrieval of chat history, user preferences, and other user or company-specific data)
    chatData: ChatData;  // The core request to the AI Model. This includes the user's message and the history of the conversation.
    preparedMessages: preparedMessages;  // The core request to the AI Model. This includes the user's message and the history of the conversation.
    recipe: Recipe;  // The recipe or Agent information that will be used to process the request.
    settings: Settings;  // Specific settings that will impact many aspects of the AI interaction. (A highly nested structure where many of the details for complex tasks are stored)
}
