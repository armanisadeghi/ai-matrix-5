import openai from './oaiClient';

export interface OpenaiMessageEntry {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface OptionalParams {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string | string[];
}

export async function OpenAiStream(
    messages: OpenaiMessageEntry[],
    callback: (chunk: string) => void,
    model: string = "gpt-4o",
    options?: OptionalParams): Promise<void> {
    const requestParams: {
        model: string;
        messages: OpenaiMessageEntry[];
        stream: boolean;
        temperature?: number;
        max_tokens?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
        stop?: string | string[];
    } = {
        model,
        messages,
        stream: true,
    };

    if (options) {
        Object.assign(requestParams, options);
    }

    const stream = await openai.chat.completions.create(requestParams);

    // TypeScript doesn't know that `stream` is async iterable, so we need to assert its type
    if (!isAsyncIterable(stream)) {
        throw new Error("Expected stream to be an async iterable");
    }

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        callback(content);
    }
}

// TypeScript helper function to check if an object is an async iterable
function isAsyncIterable(obj: any): obj is AsyncIterable<any> {
    return obj != null && typeof obj[Symbol.asyncIterator] === 'function';
}
