import { atom, selector } from 'recoil';
import { LiveClient, LiveSchema, SpeakSchema } from "@deepgram/sdk";
import { MessageMetadata } from "../lib/types";

export interface AudioPacket {
    id: string;
    blob: Blob;
    latency: number;
    networkLatency: number;
    model: string;
}

export const DEFAULT_TTS_MODEL = 'aura-asteria-en';
export const DEFAULT_STT_MODEL = 'nova-2';

export const defaultTtsOptions = {
    model: DEFAULT_TTS_MODEL
}

export const defaultSttsOptions = {
    model: DEFAULT_STT_MODEL,
    interim_results: true,
    smart_format: true,
    endpointing: 550,
    utterance_end_ms: 1500,
    filler_words: true,
}
export const voiceMap = (model: string) => {
    return voices[model];
};


export const voices: {
    [key: string]: {
        name: string;
        avatar: string;
        language: string;
        accent: string;
    };
} = {
    [DEFAULT_TTS_MODEL]: {
        name: "Asteria",
        avatar: "/aura-asteria-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-luna-en": {
        name: "Luna",
        avatar: "/aura-luna-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-stella-en": {
        name: "Stella",
        avatar: "/aura-stella-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-athena-en": {
        name: "Athena",
        avatar: "/aura-athena-en.svg",
        language: "English",
        accent: "UK",
    },
    "aura-hera-en": {
        name: "Hera",
        avatar: "/aura-hera-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-orion-en": {
        name: "Orion",
        avatar: "/aura-orion-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-arcas-en": {
        name: "Arcas",
        avatar: "/aura-arcas-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-perseus-en": {
        name: "Perseus",
        avatar: "/aura-perseus-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-angus-en": {
        name: "Angus",
        avatar: "/aura-angus-en.svg",
        language: "English",
        accent: "Ireland",
    },
    "aura-orpheus-en": {
        name: "Orpheus",
        avatar: "/aura-orpheus-en.svg",
        language: "English",
        accent: "US",
    },
    "aura-helios-en": {
        name: "Helios",
        avatar: "/aura-helios-en.svg",
        language: "English",
        accent: "UK",
    },
    "aura-zeus-en": {
        name: "Zeus",
        avatar: "/aura-zeus-en.svg",
        language: "English",
        accent: "US",
    },
};



export const audioStoreState = atom<AudioPacket[]>({
    key: 'audioStoreState',
    default: [],
});

export const audioStoreSelector = selector({
    key: 'audioStoreSelector',
    get: ({get}) => get(audioStoreState),
});

export const messageMetadataState = atom<MessageMetadata[]>({
    key: 'messageMetadataState',
    default: [],
});

export const microphoneState = atom<MediaRecorder | undefined>({
    key: 'microphoneState',
    default: undefined,
});

export const streamState = atom<MediaStream | undefined>({
    key: 'streamState',
    default: undefined,
});

export const microphoneOpenState = atom<boolean>({
    key: 'microphoneOpenState',
    default: false,
});

export const microphoneBlobQueueState = atom<Blob[]>({
    key: 'microphoneBlobQueueState',
    default: [],
});






export const connectionState = atom<LiveClient | undefined>({
    key: 'connectionState',
    default: undefined,
});

export const connectionReadyState = atom<boolean>({
    key: 'connectionReadyState',
    default: false,
});

