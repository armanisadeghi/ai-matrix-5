"use client";

import { defaultSttsOptions } from '@/utils/speech/deepgram/audio/deepgramState';
import { useAddAudio } from '@/utils/speech/deepgram/audio/useAudio';
import { Message } from "ai/react";
import { useNowPlaying } from "react-nowplaying";
import { useState, useCallback } from "react";

export function useTTS() {
    const addAudio = useAddAudio();
    const { play: startAudio } = useNowPlaying();

    const [llmNewLatency, setLlmNewLatency] = useState<{
        start: number;
        response: number;
    }>();

    const requestTtsAudio = useCallback(
        async (message: Message) => {
            const start = Date.now();
            const model = defaultSttsOptions.model;

            const res = await fetch(`/api/speak?model=${model}`, {
                cache: "no-store",
                method: "POST",
                body: JSON.stringify(message),
            });

            const headers = res.headers;
            const blob = await res.blob();

            startAudio(blob, "audio/mp3", message.id).then(() => {
                addAudio({
                    id: message.id,
                    blob,
                    latency: Number(headers.get("X-DG-Latency")) ?? Date.now() - start,
                    networkLatency: Date.now() - start,
                    model,
                });
            });
        },
        [defaultSttsOptions.model, startAudio, addAudio]
    );

    return { requestTtsAudio, llmNewLatency, setLlmNewLatency };
}
