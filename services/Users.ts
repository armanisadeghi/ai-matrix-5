// services/Users.ts
'use client';

import { atom, RecoilState } from 'recoil';
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserConnection } from './UserConnection';
import { UsersDb } from '@/utils/supabase/UsersDb';

// Auth0 UserProfile interface with additional fields
export interface UserProfile {
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
    sid?: string;
    [key: string]: unknown;
}

export const guestUserProfile: UserProfile = {
    email: null,
    email_verified: null,
    name: 'Guest User',
    nickname: 'guest',
    picture: null,
    sub: null,
    updated_at: null,
    org_id: null,
    given_name: 'Guest',
    family_name: 'User',
    sid: undefined,
};

// MatrixUserProfile extending UserProfile with additional custom fields
export interface MatrixUserProfile extends UserProfile {
    token?: string | null;
    account_type?: string | null;
    org_id?: string | null;
    phone?: string | null;
    role?: string | null;
    status?: string | null;
    created_at?: string | null;
    last_login?: string | null;
    last_activity?: string | null;
}

// MatrixUser class implementing MatrixUserProfile with internal naming conventions
export class MatrixUser implements MatrixUserProfile {
    user_id?: string | null;
    auth0_id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    updated_at?: string;
    token?: string | null;
    account_type?: string | null;
    org_id?: string | null;
    phone?: string | null;
    role?: string | null;
    status?: string | null;
    created_at?: string | null;
    last_login?: string | null;
    last_activity?: string | null;
    [key: string]: unknown;

    constructor(user: UserProfile, additionalFields: Partial<MatrixUserProfile> = {}) {
        this.user_id = user.sub;
        this.auth0_id = user.sub;
        this.email = user.email;
        this.name = user.name;
        this.nickname = user.nickname;
        this.picture = user.picture;
        this.updated_at = user.updated_at ?? new Date().toISOString();
        this.token = additionalFields.token;
        this.account_type = additionalFields.account_type;
        this.org_id = user.org_id;
        this.phone = additionalFields.phone;
        this.role = additionalFields.role;
        this.status = additionalFields.status;
        this.created_at = additionalFields.created_at ?? new Date().toISOString();
        this.last_login = additionalFields.last_login;
        this.last_activity = additionalFields.last_activity;
    }

    updateDetails(details: Partial<MatrixUserProfile>) {
        Object.assign(this, details);
        this.updated_at = new Date().toISOString();
    }
}

// UserManager class to manage MatrixUser instances
export class UserManager {
    private static instance: UserManager | null = null;
    supabaseService: UsersDb;
    userConnection?: UserConnection;

    users: MatrixUser[] = [];
    activeUser: MatrixUser | null = null;

    static ActiveUserAtom: RecoilState<MatrixUser | null> = atom<MatrixUser | null>({
        key: 'ActiveUser',
        default: null,
    });

    private isProcessing: boolean = false;
    private requestQueue: (() => Promise<void>)[] = [];

    private constructor(supabaseService: UsersDb, userConnection: UserConnection) {
        this.supabaseService = supabaseService;
        this.userConnection = userConnection;
    }

    public static getInstance(supabaseService?: UsersDb, userConnection?: UserConnection): UserManager {
        if (!UserManager.instance) {
            if (!supabaseService || !userConnection) {
                throw new Error('SupabaseService and UserConnection are required for initialization');
            }
            UserManager.instance = new UserManager(supabaseService, userConnection);
        }
        return UserManager.instance!;
    }

    public initializeActiveUser() {
        const { user, error, isLoading } = useUser();
        if (isLoading) {
            console.log('Loading user data...');
            return;
        }
        if (error) {
            console.log('Error loading user:', error);
            return;
        }
        if (user) {
            this.activeUser = new MatrixUser(user);
        }
    }

    public updateActiveUserDetails(details: Partial<MatrixUserProfile>) {
        if (this.activeUser) {
            this.activeUser.updateDetails(details);
        }
    }

    private async fetchUserById(userId: string): Promise<MatrixUser | null> {
        try {
            if (!this.supabaseService) {
                throw new Error('SupabaseService is not initialized');
            }
            const user = await this.supabaseService.getUserById(userId);
            if (user) {
                return new MatrixUser(
                    user,
                    {
                        token: user.token,
                        account_type: user.account_type,
                        org_id: user.org_id,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        status: user.status,
                        created_at: user.created_at,
                        last_login: user.last_login,
                        last_activity: user.last_activity
                    }
                );
            } else {
                console.log('User not found in the database.');
                return null;
            }
        } catch (error) {
            console.log('Error fetching user by id:', error);
            return null;
        }
    }
}
