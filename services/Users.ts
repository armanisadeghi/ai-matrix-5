/*
// services/Users.ts

import { UsersDb } from '@/utils/supabase/UsersDb';

export interface AuthProfile {
    given_name?: string;
    family_name?: string;
    nickname?: string | null;
    name?: string | null;
    picture?: string | null;
    updated_at?: string | null;
    sub?: string | null;
    sid?: string;
    email?: string | null;
    email_verified?: boolean | null;
    org_id?: string | null;
    phone?: string | null;
    phone_verified?: boolean | null;
    [key: string]: unknown;
}

export const guestUserProfile: AuthProfile = {
    given_name: 'Public',
    family_name: 'User',
    email: null,
    email_verified: null,
    name: 'Public User',
    nickname: 'guest',
    picture: null,
    sub: null,
    updated_at: null,
    org_id: null,
    sid: undefined,
    phone: null,
    phone_verified: null,
};

// MatrixProfile extending AuthProfile with additional custom fields
export interface MatrixProfile extends AuthProfile {
    matrix_id?: string | null;
    auth0_id?: string | null;
    auth0_sub?: string | null;
    full_name?: string | null;
    preferred_picture?: string | null;
    account_type?: string | null;
    account_status?: string | null;
    created_at?: string | null;
    last_login?: string | null;
    last_activity?: string | null;
    role?: string | null;
}

// MatrixUser class implementing MatrixProfile with internal naming conventions
export class MatrixUser implements MatrixProfile {
    matrix_id?: string | null;
    auth0_id?: string | null;
    auth0_sub?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    email_verified?: boolean | null;
    full_name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    preferred_picture?: string | null;
    updated_at?: string;
    account_type?: string | null;
    account_status?: string | null;
    org_id?: string | null;
    phone?: string | null;
    phone_verified?: boolean | null;
    role?: string | null;
    created_at?: string | null;
    last_login?: string | null;
    last_activity?: string | null;
    [key: string]: unknown;

    constructor(user: AuthProfile, additionalFields: Partial<MatrixProfile> = {}) {
        this.matrix_id = additionalFields.matrix_id ?? null;
        this.auth0_id = user.sub;
        this.auth0_sub = user.sub;
        this.first_name = user.given_name;
        this.last_name = user.family_name;
        this.email = user.email;
        this.email_verified = user.email_verified;
        this.full_name = user.name;
        this.nickname = user.nickname;
        this.picture = user.picture;
        this.preferred_picture = additionalFields.preferred_picture ?? null;
        this.updated_at = user.updated_at ?? new Date().toISOString();
        this.account_type = additionalFields.account_type ?? null;
        this.account_status = additionalFields.account_status ?? null;
        this.org_id = user.org_id;
        this.phone = user.phone;
        this.phone_verified = user.phone_verified;
        this.role = additionalFields.role ?? null;
        this.created_at = additionalFields.created_at ?? new Date().toISOString();
        this.last_login = additionalFields.last_login ?? null;
        this.last_activity = additionalFields.last_activity ?? null;
    }

    updateDetails(details: Partial<MatrixProfile>) {
        Object.assign(this, details);
        this.updated_at = new Date().toISOString();
    }
}










export class UserManager {
    private static instance: UserManager | null = null;
    private supabaseService: UsersDb;
    private activeUser: MatrixUser | null = null;

    private constructor(supabaseService: UsersDb) {
        this.supabaseService = supabaseService;
    }

    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            const supabaseService = new UsersDb();
            UserManager.instance = new UserManager(supabaseService);
        }
        return UserManager.instance;
    }

    public static async initialize(authUser: AuthProfile): Promise<MatrixUser> {
        const userManager = UserManager.getInstance();






        return await userManager.processUserLogin(authUser);
    }

    private async processUserLogin(authUser: AuthProfile): Promise<MatrixUser> {
        const matrixUser = new MatrixUser(authUser);

        // Use upsert to ensure user is created or updated
        await this.upsertUserInSupabase(matrixUser);

        // Fetch the full user details after upsert to get the non-Auth0 fields
        const fullUser = await this.fetchUserByAuth0Id(matrixUser.auth0_id!);
        if (fullUser) {
            this.activeUser = fullUser;
            return fullUser;
        } else {
            throw new Error('User was upserted but could not be fetched afterward.');
        }
    }

    public getActiveUser(): MatrixUser | null {
        return this.activeUser;
    }

    private async fetchUserByAuth0Id(auth0Id: string): Promise<MatrixUser | null> {
        try {
            const user = await this.supabaseService.getUserByAuth0Id(auth0Id);
            if (user) {
                return new MatrixUser(user);
            } else {
                console.log('User not found in the database.');
                return null;
            }
        } catch (error) {
            console.log('Error fetching user by auth0_id:', error);
            return null;
        }
    }

    private async upsertUserInSupabase(matrixUser: MatrixUser): Promise<void> {
        try {
            await this.supabaseService.upsertUser(matrixUser);
        } catch (error) {
            console.error('Error upserting user in Supabase:', error);
        }
    }
}
*/
