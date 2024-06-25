// types/user.ts

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
    first_name: "Guest",
    last_name: "User",
    email: null,
    email_verified: null,
    full_name: "Public User",
    nickname: "guest",
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
