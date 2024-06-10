// recoil/aiAtoms/userAtoms.ts

import { atom, selector } from 'recoil';
import { User, UserManager } from '@/services/Users';

const userManagerPromise = UserManager.getInstance();

export const activeUserSelector = selector<User | undefined>({
    key: 'activeUserSelector',
    get: async ({ get }) => {
        const userManager = await userManagerPromise; // Ensure the promise is awaited correctly
        const activeUser = await userManager.getActiveUser();
        return activeUser ?? undefined; // Return undefined if activeUser is null
    }
});


export const activeUserIdAtom = atom<string | undefined>({
    key: 'activeUserIdAtom',
    default: undefined,
});

export const activeUserTokenAtom = atom<string | null | undefined>({
    key: 'activeUserTokenAtom',
    default: undefined,
});


export const ForcedUserIdAtom = atom<string>({
    key: 'ForcedUserIdAtom',
    default: "a048d457-c058-481b-a9a1-7d821b6435d5",
});




export const activeUserAtom = atom<User | undefined>({
    key: 'activeUserAtom',
    default: undefined,
});

export const allUsersAtom = atom<User[]>({
    key: 'allUsersAtom',
    default: (async () => {
        const userManager = await userManagerPromise;
        return userManager.getAllUsers();
    })(),
});

export const activeUserIdSelector = selector<string | undefined>({
    key: 'activeUserIdSelector',
    get: ({ get }) => {
        const activeUser = get(activeUserAtom);
        return activeUser ? activeUser.id : undefined;
    },
});

export const activeUserTokenSelector = selector<string | null | undefined>({
    key: 'activeUserTokenSelector',
    get: ({ get }) => {
        const activeUser = get(activeUserAtom);
        return activeUser ? activeUser.token : undefined;
    },
});
