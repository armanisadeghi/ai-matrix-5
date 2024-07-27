// @/utils/speech/deepgram/client.js
import { createClient, CreateProjectKeyResponse, LiveClient, CallbackUrl, LiveSchema, LiveTranscriptionEvents, SpeakSchema } from '@deepgram/sdk';


const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

const getApiKey = async (): Promise<string> => {
    const result: CreateProjectKeyResponse = await (
        await fetch("/api/authenticate", { cache: "no-store" })
    ).json();

    return result.key;
};

export { deepgram, getApiKey, LiveClient };
