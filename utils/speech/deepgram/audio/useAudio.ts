// File: useAudioStore.ts

import { AudioPacket, audioStoreState } from '@/utils/speech/deepgram/audio/deepgramState';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Hook to get the audio store
export function useAudioStore() {
    return useRecoilValue(audioStoreState);
}

// Hook to add audio to the store
export function useAddAudio() {
    const setAudioStore = useSetRecoilState(audioStoreState);

    return (queueItem: AudioPacket) => {
        setAudioStore((currentStore) => [...currentStore, queueItem]);
    };
}

// Combined hook for both reading and writing
export function useAudioStoreWithAdd() {
    const audioStore = useAudioStore();
    const addAudio = useAddAudio();

    return { audioStore, addAudio };
}
