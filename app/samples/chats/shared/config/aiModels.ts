export interface AIModel {
    id: string;
    created: string;
    object: string;
    owned_by: string;
}

export const aiModels: AIModel[] = [
    {
        "id": "dall-e-3",
        "created": "1698785189",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4-1106-preview",
        "created": "1698957206",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "whisper-1",
        "created": "1677532384",
        "object": "model",
        "owned_by": "openai-internal"
    },
    {
        "id": "davinci-002",
        "created": "1692634301",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4-turbo-preview",
        "created": "1706037777",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4-0125-preview",
        "created": "1706037612",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "babbage-002",
        "created": "1692634615",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "dall-e-2",
        "created": "1698798177",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-16k",
        "created": "1683758102",
        "object": "model",
        "owned_by": "openai-internal"
    },
    {
        "id": "tts-1-hd-1106",
        "created": "1699053533",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "tts-1-hd",
        "created": "1699046015",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4",
        "created": "1687882411",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "gpt-4-0613",
        "created": "1686588896",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "gpt-3.5-turbo-1106",
        "created": "1698959748",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-instruct-0914",
        "created": "1694122472",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-instruct",
        "created": "1692901427",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "tts-1",
        "created": "1681940951",
        "object": "model",
        "owned_by": "openai-internal"
    },
    {
        "id": "gpt-3.5-turbo-0301",
        "created": "1677649963",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "tts-1-1106",
        "created": "1699053241",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-0125",
        "created": "1706048358",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "text-embedding-3-large",
        "created": "1705953180",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo",
        "created": "1677610602",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "gpt-4-turbo-2024-04-09",
        "created": "1712601677",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4-turbo",
        "created": "1712361441",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "text-embedding-3-small",
        "created": "1705948997",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-0613",
        "created": "1686587434",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "text-embedding-ada-002",
        "created": "1671217299",
        "object": "model",
        "owned_by": "openai-internal"
    },
    {
        "id": "gpt-4-1106-vision-preview",
        "created": "1711473033",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4-vision-preview",
        "created": "1698894917",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-3.5-turbo-16k-0613",
        "created": "1685474247",
        "object": "model",
        "owned_by": "openai"
    },
    {
        "id": "gpt-4o",
        "created": "1715367049",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "gpt-4o-2024-05-13",
        "created": "1715368132",
        "object": "model",
        "owned_by": "system"
    },
    {
        "id": "ft:gpt-3.5-turbo-0613:titanium::8bxZrvqi",
        "created": "1704057843",
        "object": "model",
        "owned_by": "titanium-17"
    },
    {
        "id": "ft:gpt-3.5-turbo-0613:titanium:matrix-ama:996BDtM4",
        "created": "1711955735",
        "object": "model",
        "owned_by": "titanium-17"
    }
];

export interface APIProvider {
    value: string;
    label: string;
}

export const apiProviders: APIProvider[] = [
    {
        value: 'local',
        label: 'Local AI Model'
    },
    {
        value: 'aimatrix',
        label: 'AI Matrix'
    },
    {
        value: 'oai',
        label: 'OpenAI'
    },
    {
        value: 'google',
        label: 'Google'
    },
    {
        value: 'claude',
        label: 'Claude'
    },
    {
        value: 'hugging',
        label: 'Hugging Face'
    },
    {
        value: 'Groq',
        label: 'Groq Cloud'
    },
    {
        value: 'xai',
        label: 'X AI'
    },
    {
        value: 'microsoft',
        label: 'Microsoft'
    },
];

export interface APIEndpoint {
    value: string;
    label: string;
}

export const apiEndpoints: APIEndpoint[] = [
    {
        value: 'chat',
        label: 'Chat Completion'
    },
    {
        value: 'images',
        label: 'Image Generations'
    },
    {
        value: 'assistant',
        label: 'Assistant'
    },
    {
        value: 'speech',
        label: 'Audio Speech'
    },
    {
        value: 'transcription',
        label: 'Audio Transcription'
    },
    {
        value: 'translation',
        label: 'Audio Translation'
    },
    {
        value: 'embeddings',
        label: 'Embeddings'
    },
    {
        value: 'fine-tuning',
        label: 'Fine-Tuning'
    },
    {
        value: 'batches',
        label: 'Batch Processing'
    },
    {
        value: 'files',
        label: 'Files'
    },
    {
        value: 'models',
        label: 'Models'
    },
    {
        value: 'moderation',
        label: 'Moderation'
    },
];
