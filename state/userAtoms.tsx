// recoil/aiAtoms/userAtoms.ts
import { atom } from 'recoil';
import { UserProfile, guestUserProfile } from '@/services/Users';

export const activeUserAtom = atom<UserProfile>({
    key: 'activeUserAtom',
    default: guestUserProfile,
});


export const activeUserIdAtom = atom<string | undefined>({
    key: 'activeUserIdAtom',
    default: undefined,
});

export const activeUserTokenAtom = atom<string | null | undefined>({
    key: 'activeUserTokenAtom',
    default: undefined,
});

