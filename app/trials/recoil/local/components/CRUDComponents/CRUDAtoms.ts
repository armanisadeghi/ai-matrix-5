import { atom } from 'recoil';
import { CRUDDataItem, ModalMode } from './types';

export const currentCRUDItemAtom = atom<CRUDDataItem | null>({
    key: 'currentCRUDItemAtom',
    default: null,
});

export const modalModeAtom = atom<ModalMode>({
    key: 'modalModeAtom',
    default: 'none',
});
