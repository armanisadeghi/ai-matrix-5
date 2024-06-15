// app/api/redis/central/textHandler.ts

import { NextRequest } from 'next/server';
import { getRedisClient } from '../client';

export const handleTextRequest = async (req: NextRequest) => {
    try {
        const client = await getRedisClient();
        const { channel, message } = await req.json();

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

export const handleTextSubscription = (message: string, controller: ReadableStreamDefaultController) => {
    try {
        console.log('Message received:', message);
        const data = `data: ${message}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
    } catch (error) {
        console.error('Error in subscription handler:', error);
        controller.error(error);
    }
};
