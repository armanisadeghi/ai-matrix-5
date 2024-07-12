import { SharedEvent, UniqueEvent } from '@/app/trials/nested/types';
import { atom, atomFamily } from 'recoil';


export const clickCountState = atom({
    key: 'clickCountState',
    default: 0,
});


export const sharedEventAtom = atom<SharedEvent>({
    key: 'sharedEventAtom',
    default: null,
});

export const eventTriggerFamily = atomFamily<UniqueEvent, string>({
    key: 'eventTriggerFamily',
    default: null,
});
