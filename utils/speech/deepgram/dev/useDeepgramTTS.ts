import { getDeepgramAudio, setupDeepgramWebSocket, transcribeAudio } from '@/utils/speech/deepgram/dev/deepgramClient';
import { useRef, useState } from 'react';


const useDeepgramTTS = (apiKey: string) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    const speakText = async (text: string, model: string = 'aura-asteria-en') => {
        setIsSpeaking(true);

        try {
            const audioBlob = await getDeepgramAudio(apiKey, text, model);
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);
            audio.play();
            audio.onended = () => setIsSpeaking(false);
        }
        catch (error) {
            console.error('Error:', error);
            setIsSpeaking(false);
        }
    };

    const startTranscription = () => {
        socketRef.current = setupDeepgramWebSocket(apiKey, (transcript) => {
            setTranscription(transcript);
        });
    };

    const stopTranscription = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    const transcribeAndSetText = async (audioBlob: Blob) => {
        try {
            const result = await transcribeAudio(apiKey, audioBlob);
            const transcript = result.results.channels[0].alternatives[0].transcript;
            setTranscription(transcript);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return {isSpeaking, speakText, transcription, transcribeAndSetText, summary, startTranscription, stopTranscription};
};

export default useDeepgramTTS;
