// /atoms/metadataAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Metadata } from '../types/metadata';
import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS, ROLE_TYPES } from '../config/aiRequestOptions';

// Atom for the entire metadata
export const metadataAtom = atom<Metadata | null>(null);

// Individual atoms for each property in Metadata
export const metadataRequestIdAtom = atom((get) => get(metadataAtom)?.requestId || '');
export const metadataSocketEventAtom = atom((get) => get(metadataAtom)?.socketEvent || SOCKET_EVENTS[0]);
export const metadataEventTaskAtom = atom((get) => get(metadataAtom)?.eventTask || EVENT_TASKS[0]);
export const metadataSourceAtom = atom((get) => get(metadataAtom)?.source || SOURCES[0]);
export const metadataIndexAtom = atom((get) => get(metadataAtom)?.index || 0);
export const metadataTimestampAtom = atom((get) => get(metadataAtom)?.timestamp || '');
export const metadataChannelAtom = atom((get) => get(metadataAtom)?.channel || CHANNELS[0]);

// Atom families for dynamic elements
export const socketEventAtomFamily = atomFamily((index: number) =>
    atom((get) => get(metadataSocketEventAtom) || SOCKET_EVENTS[index % SOCKET_EVENTS.length])
);

export const eventTaskAtomFamily = atomFamily((index: number) =>
    atom((get) => get(metadataEventTaskAtom) || EVENT_TASKS[index % EVENT_TASKS.length])
);

export const sourceAtomFamily = atomFamily((index: number) =>
    atom((get) => get(metadataSourceAtom) || SOURCES[index % SOURCES.length])
);

export const channelAtomFamily = atomFamily((index: number) =>
    atom((get) => get(metadataChannelAtom) || CHANNELS[index % CHANNELS.length])
);

// Derived atom for full Metadata
export const derivedMetadataAtom = atom<Metadata>((get) => ({
    requestId: get(metadataRequestIdAtom),
    socketEvent: get(metadataSocketEventAtom),
    eventTask: get(metadataEventTaskAtom),
    source: get(metadataSourceAtom),
    index: get(metadataIndexAtom),
    timestamp: get(metadataTimestampAtom),
    channel: get(metadataChannelAtom),
}));
