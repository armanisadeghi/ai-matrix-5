import { getRedisClient } from '../client';
import { NextRequest } from 'next/server';

type TextPayload = {
    channel: string;
    message?: string;
};

export const GET = async (req: NextRequest) => {
    try {
        const client = await getRedisClient();
        console.log('Client retrieved');

        const { searchParams } = new URL(req.url);
        const channel = searchParams.get('channel') || 'default-channel';

        console.log('Channel:', channel);
        const subscriber = client.duplicate();
        await subscriber.connect();
        console.log('Subscriber connected');

        const headers = new Headers({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        const readableStream = new ReadableStream({
            start(controller) {
                subscriber.subscribe(channel, (message: string) => {
                    try {
                        console.log('Message received:', message);
                        const data = `data: ${message}\n\n`;
                        controller.enqueue(new TextEncoder().encode(data));
                    } catch (error) {
                        console.error('Error in subscriber:', error);
                        controller.error(error);
                    }
                });

                req.signal.addEventListener('abort', async () => {
                    try {
                        console.log('Connection closed');
                        await subscriber.unsubscribe(channel);
                        await subscriber.quit();
                        controller.close();
                    } catch (error) {
                        console.error('Error on close:', error);
                        controller.error(error);
                    }
                });
            },
        });

        console.log(`Subscribed to channel ${channel}`);
        return new Response(readableStream, { headers });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const client = await getRedisClient();
        const { channel, message }: TextPayload = await req.json();

        if (!channel || !message) {
            console.log('Bad Request: Missing channel or message');
            return new Response('Bad Request', { status: 400 });
        }

        console.log(`Publishing message to channel ${channel}: ${message}`);
        await client.publish(channel, message);
        console.log(`Message published to channel ${channel}: ${message}`);

        return new Response('Message sent', { status: 200 });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
