'use client';

import React from 'react';
import useDeepgramStream from '@/utils/speech/deepgram/useDeepgramStream';


const DeepgramTranscription: React.FC = () => {
    const { status, transcript, startListening, stopListening } = useDeepgramStream();

    return (
        <div>
            <h2>Deepgram Real-time Transcription</h2>
            <p>Status: {status}</p>
            <button onClick={startListening} disabled={status === 'Connected'}>
                Start Listening
            </button>
            <button onClick={stopListening} disabled={status !== 'Connected'}>
                Stop Listening
            </button>
            <div>
                <h3>Transcript:</h3>
                <p>{transcript}</p>
            </div>
        </div>
    );
};

export default DeepgramTranscription;
