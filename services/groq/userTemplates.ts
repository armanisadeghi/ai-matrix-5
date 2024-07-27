import supabase from '@/utils/supabase/client';

const userTemplates: { [key: string]: string } = {
    chatTitle: `
The following is the user message. Your job is to create a chatTitle for it in JSON format. Do not answer the request.

{{user_message}}

Create a title in JSON format.
`,

    summarizeChat: `
Summarize the chat content in 2-3 sentences.
{{user_message}}
`,

    extractAllTopics: `
Identify and list all topics discussed in the chat.
{{user_message}}
`,

    extractMostImportantFacts: `
Extract and highlight the most important facts from the chat.
{{user_message}}
`,

    getUserSentiment: `
Determine the user's sentiment based on their messages.
{{user_message}}
`,

    getTaskType: `
Identify the type of task the user is requesting assistance with.
{{user_message}}
`
};

async function getDbPrompt(userPromptKey: string): Promise<string | undefined> {
    try {
        // @ts-ignore
        const { data, error } = await supabase.rpc('get_user_prompt', { key: userPromptKey });

        if (error) {
            console.error(`ERROR! fetching system prompt: ${error.message}`);
            return undefined;
        }
        // @ts-ignore
        return data?.prompt;
    } catch (e) {
        console.error(`ERROR! Exception fetching system prompt: ${e.message}`);
        return undefined;
    }
}

async function formatUserMessage(userText: string, userPromptKey?: string): Promise<string> {
    try {
        if (!userPromptKey || userPromptKey === 'none') {
            return userText;
        }

        const template = userTemplates[userPromptKey];
        if (template) {
            return template.replace('{{user_message}}', userText);
        } else {
            const dbPrompt = await getDbPrompt(userPromptKey);
            if (dbPrompt) {
                return dbPrompt.replace('{{user_message}}', userText);
            } else {
                console.error(`ERROR! No prompt found for key: ${userPromptKey}`);
                return userText;
            }
        }
    } catch (e) {
        console.error(`ERROR! Exception in getUserPrompt: ${e.message}`);
        return userText;
    }
}

export { formatUserMessage };
