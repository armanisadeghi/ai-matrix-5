import supabase from '@/utils/supabase/client';


const prompts: { [key: string]: string } = {
    chatTitle: `
You are an expert at creating perfect titles (chatTitle) for chats that a user starts.

Do not respond to the message you see.

Your task is to create a short title that is ideal for this user query. When coming up with titles, always follow these rules:

1. Keep the name short. 3 to 6 words.
2. Start with the most important words first that will make this name stand out.
3. Remember that a user asking a question about a topic is likely to have many chats about that topic so make the name about their specific query.

Example User Query 1:
Hi. Can you make the game snake in python? I really want to make one that I can run in the terminal.

Response:
{
"chatTitle": "Snake Game in Python"
}

Example User Query 2:
Please look over this sales script to see what kinds of optimizations you can make to make it even better. When my sales team makes calls, I want them to get a lot of sales.

Response:
{
"chatTitle": "Sales Script Optimization"
}

Example User Query 3:
I'm taking my kids to New York for Christmas and I want to know what the best places are that we can visit together. I really want to make this an amazing experience for us.

Response:
{
"chatTitle": "New York Christmas Trip With Kids"
}

Do not answer the user's query. Reply back only with the title in JSON format.
`,

    summarizeChat: `
Summarize the chat content in 2-3 sentences.
`,

    extractAllTopics: `
Identify and list all topics discussed in the chat.
`,

    extractMostImportantFacts: `
Extract and highlight the most important facts from the chat.
`,

    getUserSentiment: `
Determine the user's sentiment based on their messages.
`,

    getTaskType: `
Identify the type of task the user is requesting assistance with.
`
};

async function getDbPrompt(key: string): Promise<string | undefined> {

    // Placeholder for calling Supabase stored procedure
    // You will replace this with the actual call to your Supabase stored procedure
    // @ts-ignore
    const {data, error} = await supabase.rpc('get_system_prompt', {key});

    if (error) {
        console.error('Error fetching system prompt:', error);
        return undefined;
    }
    // @ts-ignore
    return data?.prompt;
}

async function getSystemPrompt(key: string): Promise<string | undefined> {
    const prompt = prompts[key];
    if (prompt) {
        return prompt;
    } else {
        return await getDbPrompt(key);
    }
}

export { getSystemPrompt };
