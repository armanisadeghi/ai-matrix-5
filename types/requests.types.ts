// types/requests.types.ts

import { MatrixUser } from "@/types/user.types";

export type RequestType = "webSocketText" | "webSocketData" | "socketIO" | "dbTask" | "restAPI" | "other" | undefined;

export interface TaskSpecs {
    class?: string;
    module?: string;
    function?: string;

    [key: string]: any; // Allow for additional properties
}

export interface Metadata {
    requestId: string;
    event?: string;
    task?: string;
    index?: string;
    taskSpecs?: TaskSpecs;
    timestamp?: string;
    source?: string;
    user?: MatrixUser | {};

    [key: string]: any; // Allow for additional properties
}

export interface RequestPayload {
    channel: RequestType;
    metadata: Metadata;
    data: Record<string, any>;
    settings?: Record<string, any>;
}

export interface WebSocketResponse {
    data: any;
    error?: string;
}
