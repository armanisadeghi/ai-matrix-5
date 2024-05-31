// /org/types/metadata.ts
import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '../config/aiRequestOptions';

export interface Metadata {
    requestId: string; // e.g., '0b9728d7-a0eb-407c-9519-b657240f0ec3'
    socketEvent: typeof SOCKET_EVENTS[number]; // e.g., 'matrix_chat' - The specific event that Socket.io is listening for
    eventTask: typeof EVENT_TASKS[number]; // e.g., 'simple_chat' - This is a sub-event and it's how the backend will 'divert' the request to the correct handler
    source: typeof SOURCES[number]; // e.g., 'simpleChat', 'matrixChat', etc. - Represents the specific page making the request.
    index: number; // e.g., 0, 1, 2 (Represents the index for simultaneous streaming chat requests for the same user and socketEvent)
    timestamp: string; // e.g., '2024-05-25T12:00:00Z'
    channel: typeof CHANNELS[number]; // e.g., 'text', 'voice', 'video', 'image'
}
