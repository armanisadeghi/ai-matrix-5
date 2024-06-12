// recoil/aiAtoms/userAtoms.ts
import { atom, selector } from 'recoil';
import { UserProfile, guestUserProfile } from '@/services/Users';

export const activeUserAtom = atom<UserProfile>({
    key: 'activeUserAtom',
    default: guestUserProfile,
});

export const userIdSelector = selector<string | null>({
    key: 'userIdSelector',
    get: ({ get }) => {
        const activeUser = get(activeUserAtom);
        return activeUser.sub || null;
    },
});

export const userTokenSelector = selector<string | null>({
    key: 'userTokenSelector',
    get: ({ get }) => {
        const activeUser = get(activeUserAtom);
        return activeUser.sid || null;
    },
});


