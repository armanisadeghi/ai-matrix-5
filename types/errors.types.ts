// ApiResponse interface
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
    meta?: {
        timestamp: number;
    };
}

// API Error Codes
export enum ApiErrorCode {
    // General Errors
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",

    // Validation Errors
    VALIDATION_ERROR = "VALIDATION_ERROR",
    INVALID_INPUT = "INVALID_INPUT",
    MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",

    // Data Errors
    DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
    DATA_CONFLICT = "DATA_CONFLICT",
    RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",

    // Authentication/Authorization Errors
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    INVALID_TOKEN = "INVALID_TOKEN",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

    // Network Errors
    NETWORK_ERROR = "NETWORK_ERROR",
    TIMEOUT = "TIMEOUT",

    // Rate Limiting
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

    // File Operations
    FILE_TOO_LARGE = "FILE_TOO_LARGE",
    INVALID_FILE_TYPE = "INVALID_FILE_TYPE",

    // Business Logic Errors
    BUSINESS_RULE_VIOLATION = "BUSINESS_RULE_VIOLATION",
    INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",

    // Third-party Service Errors
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",

    // API-specific
    DEPRECATED_API = "DEPRECATED_API",
    UNSUPPORTED_API_VERSION = "UNSUPPORTED_API_VERSION",

    // Data Processing
    DATA_PROCESSING_ERROR = "DATA_PROCESSING_ERROR",
}

// Database Error Codes
export enum DbErrorCode {
    DATABASE_ERROR = "DATABASE_ERROR",
    QUERY_FAILED = "QUERY_FAILED",
    CONNECTION_ERROR = "CONNECTION_ERROR",
    TRANSACTION_ERROR = "TRANSACTION_ERROR",
    CONSTRAINT_VIOLATION = "CONSTRAINT_VIOLATION",
    DEADLOCK_DETECTED = "DEADLOCK_DETECTED",
    FOREIGN_KEY_VIOLATION = "FOREIGN_KEY_VIOLATION",
    UNIQUE_CONSTRAINT_VIOLATION = "UNIQUE_CONSTRAINT_VIOLATION",
    SERIALIZATION_FAILURE = "SERIALIZATION_FAILURE",
}

// Internal Error Codes (for backend-frontend communication)
export enum InternalErrorCode {
    INTERNAL_PROCESSING_ERROR = "INTERNAL_PROCESSING_ERROR",
    CACHE_ERROR = "CACHE_ERROR",
    CONFIG_ERROR = "CONFIG_ERROR",
    DEPENDENCY_ERROR = "DEPENDENCY_ERROR",
    UNEXPECTED_STATE = "UNEXPECTED_STATE",
    INVALID_OPERATION = "INVALID_OPERATION",
    RESOURCE_EXHAUSTED = "RESOURCE_EXHAUSTED",
    OPTIMISTIC_LOCK_ERROR = "OPTIMISTIC_LOCK_ERROR",
    TASK_CANCELLATION = "TASK_CANCELLATION",
    ASYNC_OPERATION_FAILURE = "ASYNC_OPERATION_FAILURE",
}