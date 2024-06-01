// /atoms/metadataAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Metadata, RequestIdType, SocketEventType, EventTaskType, IndexType, TimestampType, SourceType, ChannelType } from '../types/metadata';
import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '../config/aiRequestOptions';

// Primitive atoms for the properties of `metadata`
export const metadataRequestIdAtom = atom<RequestIdType>('');
export const metadataSocketEventAtom = atom<SocketEventType>(SOCKET_EVENTS[0]);
export const metadataEventTaskAtom = atom<EventTaskType>(EVENT_TASKS[0]);
export const metadataSourceAtom = atom<SourceType>(SOURCES[0]);
export const metadataIndexAtom = atom<IndexType>(0);
export const metadataTimestampAtom = atom<TimestampType>('');
export const metadataChannelAtom = atom<ChannelType>(CHANNELS[0]);

// Atom families for dynamic elements
export const socketEventAtomFamily = atomFamily((index: number) =>
    atom<SocketEventType>(SOCKET_EVENTS[index % SOCKET_EVENTS.length])
);

export const eventTaskAtomFamily = atomFamily((index: number) =>
    atom<EventTaskType>(EVENT_TASKS[index % EVENT_TASKS.length])
);

export const sourceAtomFamily = atomFamily((index: number) =>
    atom<SourceType>(SOURCES[index % SOURCES.length])
);

export const channelAtomFamily = atomFamily((index: number) =>
    atom<ChannelType>(CHANNELS[index % CHANNELS.length])
);

// Derived atom for full `metadata`
export const metadataAtom = atom<Metadata>((get) => ({
    requestId: get(metadataRequestIdAtom),
    socketEvent: get(metadataSocketEventAtom),
    eventTask: get(metadataEventTaskAtom),
    source: get(metadataSourceAtom),
    index: get(metadataIndexAtom),
    timestamp: get(metadataTimestampAtom),
    channel: get(metadataChannelAtom),
}));
