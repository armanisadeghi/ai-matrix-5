import { useState, useEffect, useCallback } from 'react';

const useDeepgramStream = () => {
    const [status, setStatus] = useState('Not Connected');
    const [transcript, setTranscript] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const startListening = useCallback(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
                    'token',
                    process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ''
                ]);

                socket.onopen = () => {
                    setStatus('Connected');
                    mediaRecorder.addEventListener('dataavailable', event => {
                        if (event.data.size > 0 && socket.readyState == 1) {
                            socket.send(event.data);
                        }
                    });
                    mediaRecorder.start(250);
                };

                socket.onmessage = (message) => {
                    const received = JSON.parse(message.data);
                    const transcript = received.channel.alternatives[0].transcript;
                    if (transcript && received.is_final) {
                        setTranscript(prev => prev + ' ' + transcript);
                    }
                };

                socket.onclose = () => {
                    setStatus('Not Connected');
                };

                socket.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                    setStatus('Error');
                };

                setSocket(socket);
            })
            .catch(err => {
                console.error('Error accessing microphone:', err);
                setStatus('Error');
            });
        }
    }, []);

    const stopListening = useCallback(() => {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }, [socket]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    return { status, transcript, startListening, stopListening };
};

export default useDeepgramStream;
