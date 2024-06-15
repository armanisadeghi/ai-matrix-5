// app/api/redis/central/route.ts

import { NextRequest } from 'next/server';
import { getRedisClient } from '../client';
import { handleTextRequest, handleTextSubscription } from './textHandler';
import { handleDataRequest, handleDataSubscription } from './dataHandler';

const subscribe = async (channel: string, handler: (payload: string, controller: ReadableStreamDefaultController) => void, req: NextRequest) => {
    const client = await getRedisClient();
    const subscriber = client.duplicate();
    await subscriber.connect();

    const readableStream = new ReadableStream({
        start(controller) {
            subscriber.subscribe(channel, (payload: string) => {
                handler(payload, controller);
            });

            req.signal.addEventListener('abort', async () => {
                await subscriber.unsubscribe(channel);
                await subscriber.quit();
                controller.close();
            });
        },
    });

    return readableStream;
};

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const channel = searchParams.get('channel') || 'default-channel';
        const type = searchParams.get('type') || 'text';

        if (type === 'text') {
            const readableStream = await subscribe(channel, handleTextSubscription, req);
            const headers = new Headers({
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            });
            return new Response(readableStream, { headers });
        } else if (type === 'data') {
            const readableStream = await subscribe(channel, handleDataSubscription, req);
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            });
            return new Response(readableStream, { headers });
        } else {
            return new Response('Bad Request: Invalid type', { status: 400 });
        }
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type') || 'text';

        if (type === 'text') {
            return handleTextRequest(req);
        } else if (type === 'data') {
            return handleDataRequest(req);
        } else {
            return new Response('Bad Request: Invalid type', { status: 400 });
        }
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
