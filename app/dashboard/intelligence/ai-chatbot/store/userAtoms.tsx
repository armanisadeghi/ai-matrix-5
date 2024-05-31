import { atom } from 'jotai';

interface User {
    userId: string;
    userToken: string;
    isAuthenticated: boolean;

}

export const userAtom = atom<User>({
    userId: '',
    userToken: '',
    isAuthenticated: false
});

