import { UserConnection } from './Connection';
import { UsersDb } from '@/utils/supabase/UsersDb';
import { atom, RecoilState } from 'recoil';
// this.users = [...this.users, user]; // Create a new array with the new user to ensure mutability - save.



export class User {
    id: string;
    token: string | null;
    accountType: string | null;
    organizationId: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    role: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    lastLogin: Date | null;
    lastActivity: Date | null;

    constructor(
        id: string,
        token: string | null,
        accountType: string | null,
        firstName: string | null,
        lastName: string | null,
        role: string | null,
        status: string | null,
        organizationId: string | null,
        email: string | null,
        phone: string | null,
        lastLogin: Date | null,
        lastActivity: Date | null,
    ) {
        this.id = id;
        this.token = token;
        this.accountType = accountType;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.status = status;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.lastLogin = lastLogin;
        this.lastActivity = lastActivity;
    }
}

export class UserManager {
    private static instance: UserManager | null = null;
    supabaseService: UsersDb = new UsersDb();
    userConnection: UserConnection = new UserConnection();
    users: User[] = [];
    activeUser: User | null = null;
    static ActiveUser: RecoilState<User | null> = atom<User | null>({
        key: 'ActiveUser',
        default: null,
    });

    private isProcessing: boolean = false;
    private requestQueue: (() => Promise<void>)[] = [];

    private constructor() {}

    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    private async fetchUserById(userId: string): Promise<User | null> {
        try {
            const user = await this.supabaseService.getUserById(userId);
            if (user) {
                return new User(
                    user.id,
                    user.token,
                    user.accountType,
                    user.firstName,
                    user.lastName,
                    user.role,
                    user.status,
                    user.organizationId,
                    user.email,
                    user.phone,
                    user.lastLogin,
                    user.lastActivity
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

    private async handleUserRequest(userId?: string): Promise<User> {
        let user: User | null = null;

        if (userId) {
            user = await this.fetchUserById(userId);
        }

        if (!user) {
            const hardcodedUserId = 'a048d457-c058-481b-a9a1-7d821b6435d5';
            user = await this.fetchUserById(hardcodedUserId);
        }

        if (user) {
            this.users = [...this.users, user]; // Create a new array with the new user to ensure mutability
            if (!this.activeUser) {
                this.activeUser = user;
            }
            return user;
        } else {
            throw new Error('Unable to fetch user or hardcoded user.');
        }
    }

    private enqueueRequest(fn: () => Promise<void>): void {
        this.requestQueue.push(fn);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    private async processQueue(): Promise<void> {
        if (this.requestQueue.length > 0) {
            this.isProcessing = true;
            const fn = this.requestQueue.shift();
            if (fn) {
                await fn();
            }
            this.isProcessing = false;
            this.processQueue();
        }
    }

    public async getActiveUser(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.enqueueRequest(async () => {
                try {
                    if (!this.activeUser) {
                        await this.handleUserRequest();
                    }
                    resolve(this.activeUser);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async getActiveUserId(): Promise<string | null> {
        const activeUser = await this.getActiveUser();
        return activeUser ? activeUser.id : null;
    }

    public async getActiveUserToken(): Promise<string | null> {
        const activeUser = await this.getActiveUser();
        return activeUser ? activeUser.token : null;
    }

    public async getAllUsers(): Promise<User[]> {
        if (this.users.length === 0) {
            await this.handleUserRequest();
        }
        return this.users;
    }

    public async loadUserById(userId: string): Promise<User> {
        return this.handleUserRequest(userId);
    }
}
