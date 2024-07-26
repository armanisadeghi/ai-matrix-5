'use client';

import { groq } from '@/services/groq/client';
import { getSystemPrompt } from '@/services/groq/systemTemplates';
import { formatUserMessage } from '@/services/groq/userTemplates';

export interface GroqMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface GroqOptions {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    stop?: string | string[] | null;
    stream?: boolean;
}

export interface GroqConfig extends GroqOptions {
    messages: GroqMessage[];
}

export interface GroqCallDetails {
    messages: GroqMessage[];
    options?: GroqOptions;
    onChunk?: (chunk: any) => void;
}


export interface GroqProps {
    getGroq: (callDetails: {
        userText: string;
        sysPromptKey: string;
        userPromptKey?: string;
        options?: GroqOptions;
        onChunk?: (chunk: any) => void;
    }) => Promise<any>;
    getGroqChat: (callDetails: GroqCallDetails) => Promise<any>;
}

const mapConfigs = (options: Partial<GroqConfig>): GroqConfig => {
    return {
        messages: options.messages || [],
        model: options.model || 'llama3-8b-8192',
        temperature: options.temperature ?? 0.5,
        max_tokens: options.max_tokens ?? 1024,
        top_p: options.top_p ?? 1,
        stop: options.stop ?? null,
        stream: options.stream ?? false,
    };
};

const createMessages = (systemMessage: string, userMessage: string): GroqMessage[] => {
    return [
        {role: 'system', content: systemMessage},
        {role: 'user', content: userMessage},
    ];
};

export const getGroq = async (callDetails: {
    userText: string,
    sysPromptKey: string,
    userPromptKey?: string,
    options?: GroqOptions,
    onChunk?: (chunk: any) => void
}) => {
    const {sysPromptKey, userText, userPromptKey, options, onChunk} = callDetails;

    const systemMessage = await getSystemPrompt(sysPromptKey) || 'You are a helpful assistant.';
    const userMessage = await formatUserMessage(userText, userPromptKey);
    const messages = createMessages(systemMessage, userMessage);
    const configOptions = mapConfigs({
        messages,
        ...options,
        stream: !!onChunk
    });

    return executeGroqCall(configOptions, onChunk);
};

export const getGroqChat = async (callDetails: GroqCallDetails) => {
    const {messages, options, onChunk} = callDetails;

    const configOptions = mapConfigs({
        messages,
        ...options,
        stream: !!onChunk
    });

    return executeGroqCall(configOptions, onChunk);
};

const executeGroqCall = (configOptions: GroqConfig, onChunk?: (chunk: any) => void) => {
    if (configOptions.stream) {
        return new Promise((resolve, reject) => {
            let fullContent = '';
            const stopSequences = Array.isArray(configOptions.stop) ? configOptions.stop : (configOptions.stop ? [configOptions.stop] : []);

            groq.chat.completions.create(configOptions as any).then((response: any) => {
                response.on('data', (chunk: any) => {
                    const parsedChunk = JSON.parse(chunk.toString());
                    const content = parsedChunk.choices[0]?.delta?.content || '';
                    fullContent += content;

                    onChunk?.(parsedChunk);

                    // Fixed TypeScript error by explicitly typing 'seq'
                    if (stopSequences.some((seq: string) => seq && fullContent.endsWith(seq))) {
                        response.destroy(); // This should stop the stream
                        resolve(null);
                    }
                });
                response.on('end', () => {
                    resolve(null);
                });
            }).catch(reject);
        });
    } else {
        return groq.chat.completions.create(configOptions as any);
    }
};





// Example usage for getGroq:
// const response = await getGroq({
//     userText: "Start at 1 and count to 10. Separate each number with a comma and a space",
//     sysPromptKey: "default",
//     options: { temperature: 0.7, stop: ", 6" }
// });

// Example usage for getGroqChat:
// const response = await getGroqChat({
//     messages: [
//         {role: 'system', content: 'You are a helpful assistant.'},
//         {role: 'user', content: 'Start at 1 and count to 10. Separate each number with a comma and a space'}
//     ],
//     options: { temperature: 0.7, stop: ", 6" }
// });

// For streaming (both functions):
// onChunk: (chunk) => console.log(chunk.choices[0]?.delta?.content || "")
