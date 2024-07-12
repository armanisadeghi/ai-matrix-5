// File: useMicrophone.ts

import { microphoneBlobQueueState, microphoneOpenState, microphoneState, streamState } from '@/utils/speech/deepgram/audio/deepgramState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { useQueue } from "@uidotdev/usehooks";

export function useMicrophone() {
    const [microphone, setMicrophone] = useRecoilState(microphoneState);
    const [stream, setStream] = useRecoilState(streamState);
    const [microphoneOpen, setMicrophoneOpen] = useRecoilState(microphoneOpenState);
    const setBlobQueue = useSetRecoilState(microphoneBlobQueueState);

    const {
        add: enqueueBlob,
        remove: removeBlob,
        first: firstBlob,
        size: queueSize,
        queue,
    } = useQueue<Blob>([]);

    useEffect(() => {
        async function setupMicrophone() {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    noiseSuppression: true,
                    echoCancellation: true,
                },
            });

            setStream(stream);

            const microphone = new MediaRecorder(stream);

            setMicrophone(microphone);
        }

        if (!microphone) {
            setupMicrophone();
        }
    }, [setMicrophone, setStream, microphone]);

    useEffect(() => {
        if (!microphone) return;

        microphone.ondataavailable = (e) => {
            if (microphoneOpen) enqueueBlob(e.data);
        };

        return () => {
            microphone.ondataavailable = null;
        };
    }, [enqueueBlob, microphone, microphoneOpen]);

    const stopMicrophone = useCallback(() => {
        if (microphone?.state === "recording") microphone?.pause();
        setMicrophoneOpen(false);
    }, [microphone, setMicrophoneOpen]);

    const startMicrophone = useCallback(() => {
        if (microphone?.state === "paused") {
            microphone?.resume();
        } else {
            microphone?.start(250);
        }
        setMicrophoneOpen(true);
    }, [microphone, setMicrophoneOpen]);

    useEffect(() => {
        const eventer = () =>
            document.visibilityState !== "visible" && stopMicrophone();

        window.addEventListener("visibilitychange", eventer);

        return () => {
            window.removeEventListener("visibilitychange", eventer);
        };
    }, [stopMicrophone]);

    useEffect(() => {
        setBlobQueue(queue);
    }, [queue, setBlobQueue]);

    return {
        microphone,
        setMicrophone,
        startMicrophone,
        stopMicrophone,
        microphoneOpen,
        enqueueBlob,
        removeBlob,
        firstBlob,
        queueSize,
        queue,
        stream,
    };
}

