import { GroqOptions, GroqProps } from '@/services/groq/grogService';


type JsonFormat = {
    sysPromptKey: string;
    userPromptKey: string;
    schema: object;
};

const sentimentAnalysisJson: JsonFormat = {
    sysPromptKey: 'sentimentAnalysis',
    userPromptKey: 'sentimentAnalysis',
    schema: {
        properties: {
            sentiment_analysis: {
                type: 'object',
                properties: {
                    sentiment: {type: 'string'},
                    confidence_score: {type: 'number'}
                },
                required: ['sentiment', 'confidence_score']
            }
        },
        required: ['sentiment_analysis'],
        type: 'object',
        title: 'SentimentAnalysis'
    }
};

const chatTitleJson: JsonFormat = {
    sysPromptKey: 'chatTitle',
    userPromptKey: 'chatTitle',
    schema: {
        properties: {
            chatTitle: {
                type: 'string'
            }
        },
        required: ['chatTitle'],
        type: 'object',
        title: 'ChatTitle'
    }
};


const formatMap: { [key: string]: JsonFormat } = {
    sentimentAnalysis: sentimentAnalysisJson,
    chatTitle: chatTitleJson
};


function getJsonFormat(jsonFormatKey: string): JsonFormat | null {
    return formatMap[jsonFormatKey] || null;
}

export async function getCustomJson(
    groqProps: GroqProps,
    jsonFormatKey: string,
    userText: string,
    options?: GroqOptions
): Promise<any> {
    const format = getJsonFormat(jsonFormatKey);
    if (!format) {
        throw new Error(`Invalid JSON format key: ${jsonFormatKey}`);
    }

    const {schema, sysPromptKey, userPromptKey} = format;

    const updatedOptions = {
        ...options,
        temperature: 0,
        stream: false,
        response_format: {type: 'json_object'}
    };

    const callDetails = {userText, sysPromptKey, userPromptKey, options: updatedOptions};
    const responseJson = await groqProps.getGroq(callDetails);

    const data = JSON.parse(responseJson.choices[0].message.content);

    return data;
}
