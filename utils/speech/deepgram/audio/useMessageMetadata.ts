// File: useMessageMetadata.ts

import { messageMetadataState } from '@/utils/speech/deepgram/audio/deepgramState';
import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { MessageMetadata } from "../lib/types";

export function useMessageMetadata() {
    const [messageData, setMessageData] = useRecoilState(messageMetadataState);

    const addMessageData = useCallback((queueItem: MessageMetadata): void => {
        setMessageData((prevData) => [...prevData, queueItem]);
    }, [setMessageData]);

    return {
        messageData,
        setMessageData,
        addMessageData,
    };
}
