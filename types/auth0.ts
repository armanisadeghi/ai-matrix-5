// types/auth0.ts
export interface UserProfile {
    email?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sub?: string | null;
    updated_at?: string | null;
    org_id?: string | null;
    [key: string]: unknown;
}

export type UserContext = {
    user?: UserProfile;
    error?: Error;
    isLoading: boolean;
    checkSession: () => Promise<void>;
};
