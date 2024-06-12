import { atom, selector } from 'recoil';

import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '@/app/samples/chats/shared/config/aiRequestOptions';
import {
    ChannelType,
    EventTaskType,
    IndexType,
    RequestIdType,
    SocketEventType,
    SourceType,
    TimestampType,
    Metadata // Ensure Metadata is imported
} from "@/app/samples/chats/shared/types/metadata";

export const requestEventTaskAtom = atom<EventTaskType>({
    key: 'requestEventTaskAtom',
    default: 'openai_stream_request'
});

export const requestSocketEventAtom = atom<SocketEventType | null>({
    key: 'requestSocketEventAtom',
    default: null
});
export const requestIndexAtom = atom<IndexType>({
    key: 'requestIndexAtom',
    default: 0
});

export const requestSourceAtom = atom<SourceType>({
    key: 'requestSourceAtom',
    default: 'ai-tests'
});

export const requestRequestIdAtom = atom<RequestIdType>({
    key: 'requestRequestIdAtom',
    default: ''
});

export const requestTimestampAtom = atom<TimestampType>({
    key: 'requestTimestampAtom',
    default: ''
});

export const requestChannelAtom = atom<ChannelType>({
    key: 'requestChannelAtom',
    default: CHANNELS[0]
});

// Derived atom for full `metadata`
export const metadataAtom = atom<Metadata>({
    key: 'metadataAtom',
    default: selector<Metadata>({
        key: 'metadataAtom/selector',
        get: ({ get }) => ({
            requestId: get(requestRequestIdAtom),
            eventTask: get(requestEventTaskAtom),
            socketEvent: get(requestSocketEventAtom),
            source: get(requestSourceAtom),
            index: get(requestIndexAtom),
            timestamp: get(requestTimestampAtom),
            channel: get(requestChannelAtom),
        })
    })
});
