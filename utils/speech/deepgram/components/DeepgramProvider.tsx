// File: DeepgramProvider.tsx
import { ToastContainer } from '@/utils/speech/deepgram/components/ToastContainer';
import useDeepgram from '@/utils/speech/deepgram/dev/useDeepgram';
import React from 'react';

import { useMessageMetadata } from '@/utils/speech/deepgram/audio/useMessageMetadata';
import { useMicrophone } from '@/utils/speech/deepgram/audio/useMicrophone';

interface DeepgramProviderProps {
    children: React.ReactNode;
}

export function DeepgramProvider({ children }: DeepgramProviderProps) {
    useDeepgram();
    useMessageMetadata();
    useMicrophone();

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}
