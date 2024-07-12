import { MessageType } from '@/types';
type AsyncStreamerCallback = (chunk: string) => void;

const asyncStreamer = async (messageArray: MessageType[], callback: AsyncStreamerCallback): Promise<void> => {
    if (messageArray.length === 0) throw new Error('Message array is empty');

    const chunks = ['This ', 'is ', 'a ', 'simulated ', 'stream ', 'of ', 'text ', 'chunks ', 'from ', 'the ', 'API ', 'or ', 'Socket.'];

    for (let i = 0; i < chunks.length; i++) {
        await new Promise<void>(resolve => setTimeout(() => {
            callback(chunks[i]);
            resolve();
        }, 100));
    }
};

export default asyncStreamer;
