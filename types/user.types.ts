// types/user.types.ts
import { Database } from '@/types/database.types';

export interface AuthProfile {
    email?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sub?: string | null;
    updated_at?: string | null;
    org_id?: string | null;
    given_name?: string;
    family_name?: string;
    sid?: string | null;
    phone?: string | null;
    phone_verified?: boolean | null;
    [key: string]: unknown;
}

export interface MatrixUser {
    matrixId: string; // Corresponds to "matrix_id" in the database
    auth0Id?: string | null; // Corresponds to "auth0_id" in the database
    auth0Sid?: string | null; // Corresponds to "auth0_sid" in the database
    createdAt?: string | null; // Corresponds to "created_at" in the database
    firstName?: string | null; // Corresponds to "first_name" in the database
    lastName?: string | null; // Corresponds to "last_name" in the database
    nickname?: string | null; // Corresponds to "nickname" in the database
    fullName?: string | null; // Corresponds to "full_name" in the database
    picture?: string | null; // Corresponds to "picture" in the database
    updatedAt: string; // Corresponds to "updated_at" in the database
    accountType?: string | null; // Corresponds to "account_type" in the database
    accountStatus?: string | null; // Corresponds to "account_status" in the database
    orgId?: string | null; // Corresponds to "org_id" in the database
    role?: string | null; // Corresponds to "role" in the database
    phone?: string | null; // Corresponds to "phone" in the database
    phoneVerified?: boolean | null; // Corresponds to "phone_verified" in the database
    email?: string | null; // Corresponds to "email" in the database
    emailVerified?: boolean | null; // Corresponds to "email_verified" in the database
    preferredPicture?: string | null; // Corresponds to "preferred_picture" in the database
    lastLogin?: string | null; // Corresponds to "last_login" in the database
    lastActivity?: string | null; // Corresponds to "last_activity" in the database
}



/*
export type MatrixUser = Omit<Database['public']['Tables']['user']['Row'], 'matrix_id'> & {
    matrix_id: string | undefined;
};
*/




/*

export interface MatrixUser {
    matrix_id: string | null;
    auth0_id?: string | null;
    auth0_sid?: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    email_verified: boolean | null;
    full_name: string | null;
    nickname: string | null;
    picture: string | null;
    preferred_picture: string | null;
    updated_at: string | null;
    account_type: string | null;
    account_status: string | null;
    org_id: string | null;
    phone: string | null;
    phone_verified: boolean | null;
    role: string | null;
    created_at: string | null;
    last_login: string | null;
    last_activity: string | null;
}

export const unknownUser: MatrixUser = {
    matrix_id: null,
    auth0_id: null,
    auth0_sid: null,
    first_name: null,
    last_name: null,
    email: null,
    email_verified: null,
    full_name: null,
    nickname: null,
    picture: null,
    preferred_picture: null,
    updated_at: null,
    account_type: null,
    account_status: null,
    org_id: null,
    phone: null,
    phone_verified: null,
    role: null,
    created_at: null,
    last_login: null,
    last_activity: null,
};

export const guestUserProfile: MatrixUser = {
    matrix_id: null,
    auth0_id: null,
    auth0_sid: null,
    first_name: 'Guest',
    last_name: 'User',
    email: null,
    email_verified: null,
    full_name: 'Guest User',
    nickname: 'guest',
    picture: null,
    preferred_picture: null,
    updated_at: null,
    account_type: null,
    account_status: null,
    org_id: null,
    phone: null,
    phone_verified: null,
    role: null,
    created_at: null,
    last_login: null,
    last_activity: null,
};
*/
