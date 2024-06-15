// @/state/layoutAtoms.ts

import { atom } from 'recoil';

export interface WindowSize {
    width: number;
    height: number;
}

export interface BottomSectionState {
    isVisible: boolean;
    offset: number;
}

// State for tracking window size
export const windowSizeStateAtom = atom<WindowSize>({
    key: 'windowSizeStateAtom',
    default: {
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    },
});

// State for managing autoscroll
export const autoscrollStateAtom = atom<boolean>({
    key: 'autoscrollStateAtom',
    default: true,
});

// State for managing bottom section visibility and offset
export const bottomSectionStateAtom = atom<BottomSectionState>({
    key: 'bottomSectionStateAtom',
    default: {
        isVisible: false,
        offset: 15,
    },
});