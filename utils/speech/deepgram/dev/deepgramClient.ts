const API_BASE_URL = 'https://api.deepgram.com/v1';

export const getDeepgramAudio = async (apiKey: string, text: string, model: string = 'aura-asteria-en'): Promise<Blob> => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({ text, model }),
    };

    const response = await fetch(`${API_BASE_URL}/tts`, options);
    if (!response.ok) {
        throw new Error('Failed to fetch audio from Deepgram');
    }

    return await response.blob();
};



export const transcribeAudio = async (apiKey: string, audioBlob: Blob): Promise<any> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    const response = await fetch(`${API_BASE_URL}/listen`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${apiKey}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to transcribe audio');
    }

    return await response.json();
};

export const setupDeepgramWebSocket = (apiKey: string, onTranscript: (transcript: string) => void) => {
    const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`, ['token', apiKey]);

    socket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript && received.is_final) {
            onTranscript(transcript);
        }
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};


export const summarizeText = async (apiKey: string, text: string): Promise<string> => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
    };

    const response = await fetch(`${API_BASE_URL}/summarize`, options);
    if (!response.ok) {
        throw new Error('Failed to summarize text');
    }

    const data = await response.json();
    return data.summary;
};
