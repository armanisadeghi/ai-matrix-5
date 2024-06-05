import OpenAI from 'openai';

const openai = new OpenAI({
});

interface chatMessages {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

async function openAiStream(messages: chatMessages[], onData: (chunk: string) => void) {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        stream: true,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        onData(content);
    }
}

export default openAiStream;
