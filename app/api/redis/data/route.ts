import { getRedisClient } from '../client';
import { NextRequest } from 'next/server';

type DataPayload = {
    channel: string;
    data?: Record<string, any>;
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
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        const readableStream = new ReadableStream({
            start(controller) {
                subscriber.subscribe(channel, (payload: string) => {
                    try {
                        console.log('Payload received:', payload);
                        const data = JSON.stringify({ data: JSON.parse(payload) });
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
        const { channel, data }: DataPayload = await req.json();

        if (!channel || !data) {
            console.log('Bad Request: Missing channel or data');
            return new Response('Bad Request', { status: 400 });
        }

        const payload = JSON.stringify(data);
        console.log(`Publishing payload to channel ${channel}: ${payload}`);
        await client.publish(channel, payload);
        console.log(`Payload published to channel ${channel}: ${payload}`);

        return new Response('Payload sent', { status: 200 });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
