import { createOpenAI } from '@ai-sdk/openai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { vertex } from '@ai-sdk/google-vertex';
import { mistral } from '@ai-sdk/mistral';
import { ollama } from 'ollama-ai-provider';
import { streamText } from 'ai';

// Create groq instance
const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const reformatMessages = (messages) => {
    return messages.map((message) => ({
        role: message.role,
        content: message.text,
    }));
};

const reformatOptions = (options, provider) => {
    switch (provider) {
        case 'openai':
            return {
                model: openai(options.model),
                options,
            };
        case 'anthropic':
            return {
                model: anthropic(options.model),
                options,
            };
        case 'google':
            return {
                model: google(options.model),
                options,
            };
        case 'vertex':
            return {
                model: vertex(options.model),
                options,
            };
        case 'ollama':
            return {
                model: ollama(options.model),
                options,
            };
        default:
            throw new Error('Unsupported provider');
    }
};

export async function POST(req) {
    const {
        messages,
        modelOption = 'default',
        options = {},
        maxRetries = 2,
        abortSignal,
        onFinish,
        ...settings
    } = await req.json();

    const defaultModel = groq('llama3-8b-8192');

    const modelMap = {
        'c75268d8-7091-4873-b62e-add46494c5fa': groq('llama3-8b-8192'),
        '04d555f7-4306-48a6-b513-494bb102f583': groq('llama3-8b-8192'),
        'f5c115b9-25c4-4f8d-a77c-72341f476a13': groq('llama3-8b-8192'),
        'dead6e75-b49b-4a58-a300-9dbd92f2adea': groq('llama3-8b-8192'),
        '10ad31c1-d8b4-4726-905a-ee7703b9a200': openai('gpt-4o'),
        '41855653-7fbb-40c5-878f-ff0100d9beba': openai('gpt-4-turbo'),
        '1b670edb-afe2-473e-aa8a-e083e1307b4a': openai('gpt-4'),
        '10d0425e-7b44-4036-8601-193e4302b440': openai('gpt-3.5-turbo'),
        '4c6186c6-355a-4b85-995f-b578ff8edfef': google('models/gemini-pro'),
        '189cc821-5aa2-429d-811f-69448440b4a3': ollama('phi3'),
    };

    const model = modelOption === 'default' ? defaultModel : modelMap[modelOption];
    if (!model) {
        throw new Error('Invalid model option provided');
    }

    const reformattedMessages = reformatMessages(messages);
    const reformattedOptions = options.model ? reformatOptions(options, model.provider) : options;

    const result = await streamText({
        model: model,
        messages: reformattedMessages,
        maxRetries,
        abortSignal,
        onFinish,
        ...settings,
    });

    return result.toAIStreamResponse();
}



/*
import { createOpenAI } from '@ai-sdk/openai';

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/',
});

const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? '',
  baseURL: 'https://api.fireworks.ai/inference/v1',
});

 */
