// /types/chatData.ts

import { ROLE_TYPES } from '@/utils/config/aiRequestOptions'

export type RoleType = (typeof ROLE_TYPES)[number]

// ID and Timestamp types
export type MessageIDType = string
export type TimestampType = number
export type ChatIDType = string

// BaseEntry interface to include common fields
interface BaseEntry {
    text: string
    role: RoleType
}

// SystemEntry interface
export interface SystemEntry extends BaseEntry {
    role: 'system'
}

// UserEntry interface
export interface UserEntry extends BaseEntry {
    role: 'user'
}

// AssistantEntry interface
export interface AssistantEntry extends BaseEntry {
    role: 'assistant'
}

// MessageEntry type (union type of all entry types)
export type MessageEntry = SystemEntry | UserEntry | AssistantEntry

// AllMessages type (array of MessageEntry)
export type AllMessages = MessageEntry[]

// Chat interface
export interface Chat {
    chatId: ChatIDType
    title: string
    messages: AllMessages
}

export interface ChatData {
    id: string // uuid generated by the frontend
    name: string // e.g., 'Hiring guidance'
    currentMessage: CurrentMessage
    chatHistory: ChatHistory[]
}

export interface CurrentMessage {
    promptMessage: PromptMessage
    formResponses: FormResponse[]
    customInputs: CustomInput[]
}

export interface PromptMessage {
    index: number // Always highest chatHistory index + 1
    roleType: (typeof ROLE_TYPES)[number] // Always 'user'
    message: string // e.g., 'Can you help me with travel tips?'
}

export interface FormResponse {
    index: number
    question: string // e.g., 'What type of travel plans are you looking for?'
    response: string // e.g., 'Information on things to do'
}

export interface CustomInput {
    index: number
    inputBroker: string // e.g., 'Any brokerId'
    inputValue: string // e.g., 'Some user input for this question'
}

export interface ChatHistory {
    index: number
    roleType: (typeof ROLE_TYPES)[number] // e.g., 'system', 'assistant', 'user'
    message: string // e.g., 'I'm taking my kids to New York. What are some fun things to do there?'
}

export interface preparedMessages {
    type: (typeof ROLE_TYPES)[number] // e.g., 'system', 'assistant', 'user'
    text: string // e.g., 'I'm taking my kids to New York. What are some fun things to do there?'
}

// SystemPromptType
export type SystemPromptType = string

// UserMessageType
export type UserMessageType = string

// AssistantResponseType
export type AssistantResponseType = string

// UserInputType
export type UserInputType = string
