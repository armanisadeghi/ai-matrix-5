// /atoms/userAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { User } from '../types/user';

// Atom for the entire user data
export const userAtom = atom<User | null>(null);

// Individual atoms for each property in User
export const userIdAtom = atom((get) => get(userAtom)?.id || '');
export const userTokenAtom = atom((get) => get(userAtom)?.token || '');
export const userAccountTypeAtom = atom((get) => get(userAtom)?.accountType || '');
export const userOrganizationIdAtom = atom((get) => get(userAtom)?.organizationId || '');
export const userFirstNameAtom = atom((get) => get(userAtom)?.firstName || '');
export const userLastNameAtom = atom((get) => get(userAtom)?.lastName || '');
export const userEmailAtom = atom((get) => get(userAtom)?.email || '');
export const userPhoneAtom = atom((get) => get(userAtom)?.phone || '');
export const userRoleAtom = atom((get) => get(userAtom)?.role || '');
export const userStatusAtom = atom((get) => get(userAtom)?.status || '');
export const userCreatedAtAtom = atom((get) => get(userAtom)?.createdAt || '');
export const userUpdatedAtAtom = atom((get) => get(userAtom)?.updatedAt || '');
export const userLastLoginAtom = atom((get) => get(userAtom)?.lastLogin || '');
export const userLastActivityAtom = atom((get) => get(userAtom)?.lastActivity || '');

// Derived atom for full User
export const derivedUserAtom = atom<User>((get) => ({
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
}));
