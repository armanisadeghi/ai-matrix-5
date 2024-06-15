import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType> => {
    if (!redisClient) {
        redisClient = createClient({
            url: 'redis://localhost:6379'
        });

        redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));
        await redisClient.connect();
        console.log('Redis client connected');
    }
    return redisClient;
};
