import { deepgram } from '@/utils/speech/deepgram/client';
import { useState, useCallback } from 'react';

interface TTSOptions {
    model?: string;
    voice?: string;
}

export const useDeepgram = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const generateSpeech = useCallback(async (text: string, options: TTSOptions = {}) => {
        if (!deepgram) {
            setError('Deepgram client is not initialized');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAudioUrl(null);

        try {
            const { result } = await deepgram.speak.request({ text }, { model: "aura-asteria-en" });
            console.log('Deepgram result:', result)
            //@ts-ignore
            if (result && result.audio_url) {
                //@ts-ignore
                setAudioUrl(result.audio_url);
            } else {
                throw new Error('No audio URL received from Deepgram');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        generateSpeech,
        isLoading,
        error,
        audioUrl,
    };
};

export default useDeepgram;
