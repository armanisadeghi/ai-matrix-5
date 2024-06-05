// /types/metadata.ts

import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '../config/aiRequestOptions';

// RequestIdType
export type RequestIdType = string; // DEFAULT: '', CHOICES: 'uuid', EXAMPLES: '0b9728d7-a0eb-407c-9519-b657240f0ec3'

// SocketEventType
export type SocketEventType = typeof SOCKET_EVENTS[number] | null; // Update to include `null`

// EventTaskType
export type EventTaskType = typeof EVENT_TASKS[number]; // DEFAULT: '', CHOICES: 'many options', EXAMPLES: 'simple_chat', 'playground_stream', 'run_recipe', 'validation', 'workflow'


// IndexType
export type IndexType = number; // DEFAULT: 0, CHOICES: 'n/a', EXAMPLES: 0, 1, 2

// TimestampType
export type TimestampType = string; // DEFAULT: '', CHOICES: 'n/a', EXAMPLES: '2024-05-25T12:00:00Z'

// SourceType
export type SourceType = typeof SOURCES[number]; // DEFAULT: 'null', CHOICES: 'n/a', EXAMPLES: 'simpleChat', 'matrixChat', 'quickChat', 'sidebarChat', 'playground', 'wordpress', 'shopify', 'thirdParty'

// ChannelType
export type ChannelType = typeof CHANNELS[number]; // DEFAULT: 'text', CHOICES: 'text, voice, video, image', EXAMPLES: 'image'

// Metadata interface
export interface Metadata {
    requestId: RequestIdType;
    socketEvent: SocketEventType;
    eventTask: EventTaskType;
    index: IndexType;
    timestamp: TimestampType;
    source: SourceType;
    channel: ChannelType;
}
