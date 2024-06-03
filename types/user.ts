// types/user.ts

export interface User {
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
}
