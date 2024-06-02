// /types/user.ts

// IdType
export type IdType = string; // e.g., 'ab19aaff-e0cc-49a7-9570-d296f9d6a9fb'

// TokenType
export type TokenType = string; // e.g., '96822df4-a3de-45f4-befa-512226614005'

// AccountTypeType
export type AccountTypeType = string; // Needs OPTIONS

// OrganizationIdType
export type OrganizationIdType = string;

// FirstNameType
export type FirstNameType = string;

// LastNameType
export type LastNameType = string;

// EmailType
export type EmailType = string;

// PhoneType
export type PhoneType = string;

// RoleType
export type RoleType = string; // Needs OPTIONS

// StatusType
export type StatusType = string; // Needs OPTIONS

// CreatedAtType
export type CreatedAtType = string;

// UpdatedAtType
export type UpdatedAtType = string;

// LastLoginType
export type LastLoginType = string;

// LastActivityType
export type LastActivityType = string;

// User interface
export interface User {
    id: IdType;
    token: TokenType;
    accountType: AccountTypeType;
    organizationId: OrganizationIdType;
    firstName: FirstNameType;
    lastName: LastNameType;
    email: EmailType;
    phone: PhoneType;
    role: RoleType;
    status: StatusType;
    createdAt: CreatedAtType;
    updatedAt: UpdatedAtType;
    lastLogin: LastLoginType;
    lastActivity: LastActivityType;
}
