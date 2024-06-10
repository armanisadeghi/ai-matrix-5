// This file is marked as a server action module.
'use server';

// This works, but it cannot stream to the client

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function streamChatResponse(messages: any[]) {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        stream: true,
    });

    const chunks = [];
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        chunks.push(content);
    }

    return chunks;
}
