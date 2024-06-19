// chat-app/AiContext/RequestMetadataContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
    RequestMetadata,
    RequestMetadataContextProps,
    RequestMetadataProviderProps
} from '@/types/chat'

const defaultRequestMetadata: RequestMetadata = {
    requestId: '',
    requestIndex: 0,
    uid: '',
    requestTimestamp: '',
    requestType: '',
    requestSource: '',
    requestChannel: ''
}

const RequestMetadataContext = createContext<RequestMetadataContextProps>({
    requestMetadata: defaultRequestMetadata,
    updateRequestMetadata: () => {}
})

export const RequestMetadataProvider: React.FC<RequestMetadataProviderProps> = ({ children }) => {
    const [requestMetadata, setRequestMetadata] = useState<RequestMetadata>(defaultRequestMetadata)

    const updateRequestMetadata = (metadata: Partial<RequestMetadata>) => {
        setRequestMetadata((prev) => ({ ...prev, ...metadata }))
    }

    return (
        <RequestMetadataContext.Provider value={{ requestMetadata, updateRequestMetadata }}>
            {children}
        </RequestMetadataContext.Provider>
    )
}

export const useRequestMetadata = () => useContext(RequestMetadataContext)
