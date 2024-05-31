// /org/types/user.ts

export interface User {
    id: string; // e.g., 'ab19aaff-e0cc-49a7-9570-d296f9d6a9fb'
    token: string; // e.g., '96822df4-a3de-45f4-befa-512226614005'
    accountType: string; // Needs OPTIONS
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string; // Needs OPTIONS
    status: string; // Needs OPTIONS
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    lastActivity: string;
}
