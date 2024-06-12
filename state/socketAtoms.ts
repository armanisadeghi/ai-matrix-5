// state/socketAtoms.ts
import { atom, selector } from 'recoil';


export const realTimeDataState = atom<string[]>({
    key: 'realTimeDataState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const streamBufferState = atom<string>({
    key: 'streamBufferState',
    default: '',
});

export const realTimeDataAtom = atom<string>({
    key: 'realTimeDataAtom',
    default: '',
});

export const streamBufferAtom = atom<string>({
    key: 'streamBufferAtom',
    default: '',
});

export const handleRealTimeDataSelector = selector<void>({
    key: 'handleRealTimeDataSelector',
    get: ({ get }) => {
        // Implement logic if needed
    },
    set: ({ set }, newValue) => {
        if (typeof newValue === 'string') {
            set(realTimeDataAtom, newValue);
        }
    },
});

export const onStreamEndSelector = selector<void>({
    key: 'onStreamEndSelector',
    get: ({ get }) => {
        // Implement logic if needed
    },
    set: ({ set }, newValue) => {
        if (typeof newValue === 'string') {
            set(streamBufferAtom, newValue);
        }
    },
});
