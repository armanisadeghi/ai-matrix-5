// lib/ai-chat/redis.ts

import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL });
client.connect();

export async function getFromCache(key: string) {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
}

export async function setInCache(key: string, value: any) {
    await client.set(key, JSON.stringify(value));
}

export async function deleteFromCache(key: string) {
    await client.del(key);
}

export async function updateCache(key: string, value: any) {
    // Check if the key exists
    const exists = await client.exists(key);
    if (exists) {
        await setInCache(key, value);
    } else {
        console.log(`Key ${key} not found in cache. No update performed.`);
    }
}

export async function clearCache() {
    await client.flushAll();
}
