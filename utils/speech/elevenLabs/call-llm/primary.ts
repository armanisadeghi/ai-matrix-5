import express, { Response } from "express";
import { Llm } from "./llm";
import { Stream } from "./stream";
import { TextToSpeech } from "./text-to-speech";

/*
import ExpressWs from 'express-ws';
import { WebSocket } from 'ws';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { ElevenLabsAlpha } from 'elevenlabs-alpha';
*/

// @ts-ignore
const primary = ExpressWs(express()).app;
const PORT: number = parseInt(process.env.PORT || "5000");

// @ts-ignore
const elevenlabs = new ElevenLabsAlpha();

export const startApp = () => {
    // @ts-ignore
    primary.post("/call/incoming", (_, res: Response) => {
        // @ts-ignore

        const twiml = new VoiceResponse();

        twiml.connect().stream({
            url: `wss://${process.env.SERVER_DOMAIN}/call/connection`,
        });

        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    });

    primary.ws("/call/connection", (ws: WebSocket | any) => {
        // @ts-ignore
        console.log("Twilio -> Connection opened".underline.green);

        // @ts-ignore
        ws.on("error", console.error);

        const llm = new Llm();
        const stream = new Stream(ws);
        const textToSpeech = new TextToSpeech();

        let streamSid: string;
        let callSid: string;
        let marks: string[] = [];

        elevenlabs.speechToText.connect({
            onTranscription: (data: string) => {
                // @ts-ignore
                console.log(`Transcription – STT -> LLM: ${data}`.yellow);
                llm.completion(data);
            },
            onUtterance: (data: string) => {
                if (marks.length > 0 && data?.length > 5) {
                    // @ts-ignore
                    console.log("Interruption, Clearing stream".red);

                    ws.send(
                        JSON.stringify({
                            streamSid,
                            event: "clear",
                        }),
                    );
                }
            },
        });

        // Incoming from MediaStream
        // @ts-ignore
        ws.on("message", (data: string) => {
            const message: {
                event: string;
                start?: { streamSid: string; callSid: string };
                media?: { payload: string };
                mark?: { name: string };
                sequenceNumber?: number;
            } = JSON.parse(data);

            if (message.event === "start" && message.start) {
                streamSid = message.start.streamSid;
                callSid = message.start.callSid;
                stream.setStreamSid(streamSid);
                llm.setCallSid(callSid);
                console.log(
                    // @ts-ignore
                    `Twilio -> Starting Media Stream for ${streamSid}`.underline.red,
                );
                textToSpeech.generate({
                    partialResponseIndex: null,
                    partialResponse: "Hi, my name is Eleven. How can I help you?",
                });
            } else if (message.event === "media" && message.media) {
                if (elevenlabs.speechToText.isOpen) {
                    elevenlabs.speechToText.send({
                        event: "audio",
                        data: message.media.payload,
                    });
                }
            } else if (message.event === "mark" && message.mark) {
                const label: string = message.mark.name;

                console.log(
                    // @ts-ignore
                    `Twilio -> Audio completed mark (${message.sequenceNumber}): ${label}`.red,
                );

                marks = marks.filter((m: string) => m !== message.mark?.name);
            } else if (message.event === "stop") {
                // @ts-ignore
                console.log(`Twilio -> Media stream ${streamSid} ended.`.underline.red);
            }
        });

        llm.on("llmreply", async (llmReply: { partialResponse: string }) => {
            // @ts-ignore
            console.log(`LLM -> TTS: ${llmReply.partialResponse}`.green);
            textToSpeech.generate(llmReply);
        });

        textToSpeech.on("speech", (responseIndex: number, audio: string, label: string) => {
            // @ts-ignore
            console.log(`TTS -> TWILIO: ${label}`.blue);

            stream.buffer(responseIndex, audio);
        });

        stream.on("audiosent", (markLabel: string) => {
            marks.push(markLabel);
        });
    });

    primary.listen(PORT, () => {
        console.log(`Local: http://localhost:${PORT}`);
        console.log(`Remote: https://${process.env.SERVER_DOMAIN}`);
    });
};
