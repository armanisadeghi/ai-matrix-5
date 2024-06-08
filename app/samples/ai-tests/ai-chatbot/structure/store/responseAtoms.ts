// responseAtoms.ts

import { RespondData } from '@/types/chat';


export const respondDataAtom = atom<RespondData | null>(null);
export const triggerResponseAtom = atom<boolean>(false);