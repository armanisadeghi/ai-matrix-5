// /atoms/userAtoms.tsx

import { atom } from 'jotai';
import { User } from '../types/user';

// Individual atoms for each property in User
export const userIdAtom = atom<string>('');
export const userTokenAtom = atom<string>('');
export const userAccountTypeAtom = atom<string>('');
export const userOrganizationIdAtom = atom<string>('');
export const userFirstNameAtom = atom<string>('');
export const userLastNameAtom = atom<string>('');
export const userEmailAtom = atom<string>('');
export const userPhoneAtom = atom<string>('');
export const userRoleAtom = atom<string>('');
export const userStatusAtom = atom<string>('');
export const userCreatedAtAtom = atom<string>('');
export const userUpdatedAtAtom = atom<string>('');
export const userLastLoginAtom = atom<string>('');
export const userLastActivityAtom = atom<string>('');

// Derived atom for the entire user data
export const userAtom = atom(
    (get) => ({
        id: get(userIdAtom),
        token: get(userTokenAtom),
        accountType: get(userAccountTypeAtom),
        organizationId: get(userOrganizationIdAtom),
        firstName: get(userFirstNameAtom),
        lastName: get(userLastNameAtom),
        email: get(userEmailAtom),
        phone: get(userPhoneAtom),
        role: get(userRoleAtom),
        status: get(userStatusAtom),
        createdAt: get(userCreatedAtAtom),
        updatedAt: get(userUpdatedAtAtom),
        lastLogin: get(userLastLoginAtom),
        lastActivity: get(userLastActivityAtom),
    } as User)
);
