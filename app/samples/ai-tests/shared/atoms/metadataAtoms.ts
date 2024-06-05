import { atom, selector } from 'recoil';

import { Metadata, RequestIdType, SocketEventType, EventTaskType, IndexType, TimestampType, SourceType, ChannelType } from '@/app/samples/ai-tests/shared/types/metadata';
import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '@/app/samples/ai-tests/shared/config/aiRequestOptions';

export const requestEventTaskAtom = atom<EventTaskType>({
    key: 'requestEventTaskAtom',
    default: 'openai_stream_request'
});

export const requestSocketEventAtom = atom<SocketEventType>({
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
    default: selector({
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
