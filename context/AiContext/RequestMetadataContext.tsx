// chat-app/AiContext/RequestMetadataContext.tsx
"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface RequestMetadata {
    requestId: string;
    requestIndex: number;
    uid: string;
    requestTimestamp: string;
    requestType: string;
    requestSource: string;
    requestChannel: string;
}

const defaultRequestMetadata: RequestMetadata = {
    requestId: "",
    requestIndex: 0,
    uid: "",
    requestTimestamp: "",
    requestType: "",
    requestSource: "",
    requestChannel: "",
};

interface RequestMetadataContextProps {
    requestMetadata: RequestMetadata;
    updateRequestMetadata: (metadata: Partial<RequestMetadata>) => void;
}

const RequestMetadataContext = createContext<RequestMetadataContextProps>({
    requestMetadata: defaultRequestMetadata,
    updateRequestMetadata: () => {},
});

interface RequestMetadataContextProviderProps {
    children: ReactNode;
}

export const RequestMetadataProvider: React.FC<RequestMetadataContextProviderProps> = ({ children }) => {
    const [requestMetadata, setRequestMetadata] = useState<RequestMetadata>(defaultRequestMetadata);

    const updateRequestMetadata = (metadata: Partial<RequestMetadata>) => {
        setRequestMetadata((prev) => ({ ...prev, ...metadata }));
    };

    return (
        <RequestMetadataContext.Provider value={{ requestMetadata, updateRequestMetadata }}>
            {children}
        </RequestMetadataContext.Provider>
    );
};

export const useRequestMetadata = () => useContext(RequestMetadataContext);
