import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export async function OpenAiStream(
    messages: ChatMessage[],
    callback: (chunk: string) => void
): Promise<void> {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        stream: true,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        callback(content);
        console.log('Chunk received:', content);
    }
}
