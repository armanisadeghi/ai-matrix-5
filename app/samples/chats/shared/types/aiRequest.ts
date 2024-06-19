// /org/types/aiRequest.ts

import { Metadata } from './metadata'
import { User } from './user'
import { Recipe } from './recipe'
import { ChatData, preparedMessages } from './chatData'

import { Settings } from './settings'

export interface aiRequest {
    metadata: Metadata // Provides the core basics for the request to the backend.
    user: User // Provides the user's ID and token. (used for authentication and for proper storage and retrieval of chat history, user preferences, and other user or company-specific data)
    chatData: ChatData // The core request to the AI Model. This includes the user's message and the history of the conversation.
    preparedMessages: preparedMessages // The core request to the AI Model. This includes the user's message and the history of the conversation.
    recipe: Recipe // The recipe or Agent information that will be used to process the request.
    settings: Settings // Specific settings that will impact many aspects of the AI interaction. (A highly nested structure where many of the details for complex tasks are stored)
}
