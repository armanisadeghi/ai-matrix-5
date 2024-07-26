// File: useBufferedStream.ts

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { assistantTextStreamAtom } from '@/state/aiAtoms/aiChatAtoms';

const useBufferedStream = () => {
    const rawStream = useRecoilValue(assistantTextStreamAtom);
    const [bufferedStream, setBufferedStream] = useState('');
    const bufferRef = useRef('');
    const charCountRef = useRef(0);
    const chunkCountRef = useRef(0);
    const startTimeRef = useRef(0);

    const forceUpdate = useCallback(() => {
        setBufferedStream(prev => prev + bufferRef.current);
        console.log(`Forced update: ${bufferRef.current.length} chars added. Total: ${charCountRef.current} chars`);
        bufferRef.current = '';
    }, []);

    useEffect(() => {
        if (rawStream.length === 0) {
            setBufferedStream('');
            bufferRef.current = '';
            charCountRef.current = 0;
            chunkCountRef.current = 0;
            startTimeRef.current = Date.now();
            console.log('Stream started');
            return;
        }

        const newChars = rawStream.slice(charCountRef.current);
        if (newChars.length > 0) {
            bufferRef.current += newChars;
            charCountRef.current = rawStream.length;
            chunkCountRef.current++;

            console.log(`Received ${newChars.length} new chars. Total: ${charCountRef.current} chars`);

            // Force an update for every chunk received
            forceUpdate();
        }

        // Log completion
        if (charCountRef.current === rawStream.length && bufferRef.current.length === 0) {
            const duration = Date.now() - startTimeRef.current;
            console.log(`Stream complete: ${charCountRef.current} total characters, ${chunkCountRef.current} chunks, ${duration}ms`);
        }
    }, [rawStream, forceUpdate]);

    return bufferedStream;
};

export default useBufferedStream;
