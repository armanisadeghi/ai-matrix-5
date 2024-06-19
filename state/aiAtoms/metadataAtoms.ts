import { atom, selector } from 'recoil'

import { SOCKET_EVENTS, EVENT_TASKS, SOURCES, CHANNELS } from '@/utils/config/aiRequestOptions'
import {
    ChannelType,
    EventTaskType,
    IndexType,
    RequestIdType,
    SocketEventType,
    SourceType,
    TimestampType,
    Metadata // Ensure Metadata is imported
} from '@/app/samples/chats/shared/types/metadata'
import {
    aiModelAtom,
    frequencyPenaltyAtom,
    maxTokensAtom,
    stopSequenceAtom,
    temperatureAtom,
    topPAtom
} from '@/state/aiAtoms/settingsAtoms'

export const requestEventTaskAtom = atom<EventTaskType>({
    key: 'requestEventTaskAtom',
    default: 'openai_stream_request'
})

export const requestSocketEventAtom = atom<SocketEventType | null>({
    key: 'requestSocketEventAtom',
    default: 'matrix_chat'
})
export const requestIndexAtom = atom<IndexType>({
    key: 'requestIndexAtom',
    default: 0
})

export const requestSourceAtom = atom<SourceType>({
    key: 'requestSourceAtom',
    default: 'ai-tests'
})

export const requestRequestIdAtom = atom<RequestIdType>({
    key: 'requestRequestIdAtom',
    default: ''
})

export const requestTimestampAtom = atom<TimestampType>({
    key: 'requestTimestampAtom',
    default: ''
})

export const requestChannelAtom = atom<ChannelType>({
    key: 'requestChannelAtom',
    default: CHANNELS[0]
})

export const allMetadataSelector = selector<Metadata>({
    key: 'allMetadataSelector',
    get: ({ get }) => {
        return {
            requestId: get(requestRequestIdAtom),
            eventTask: get(requestEventTaskAtom),
            socketEvent: get(requestSocketEventAtom),
            source: get(requestSourceAtom),
            index: get(requestIndexAtom),
            timestamp: get(requestTimestampAtom),
            channel: get(requestChannelAtom)
        }
    }
})
