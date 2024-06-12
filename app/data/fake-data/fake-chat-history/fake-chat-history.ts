// app/data/fake-data/fake-chat-history/fake-chat-history.ts
import { eRoleType } from "@/utils/types";
import { readMultipleFiles } from "../utils/serverUtils";

const sampleFiles = ["sample-1.txt", "sample-2.txt", "sample-3.txt", "sample-4.txt"];

interface Message {
    role: eRoleType;
    content: string;
}

interface Chat {
    chatId: string;
    msgArr: Message[];
}

interface ChatHistory {
    userId: string;
    chatHistory: Chat[];
}

async function initializeChatHistory(): Promise<ChatHistory[]> {
    const sampleFileContents = await readMultipleFiles(sampleFiles);

    return [
        {
            userId: "armaniuid",
            chatHistory: [
                {
                    chatId: "1001",
                    msgArr: [
                        { role: eRoleType.USER, content: "Hello. We're creating fake chat history." },
                        { role: eRoleType.ASSISTANT, content: "That's a bad idea. You should connect the db instead!" },
                        {
                            role: eRoleType.USER,
                            content:
                                "Can you give me a sample code for how I might get chat history for a user from MongoDB in a Next.js app that is set up using app router?",
                        },
                        { role: eRoleType.ASSISTANT, content: sampleFileContents["sample-1.txt"] },
                    ],
                },
                {
                    chatId: "1002",
                    msgArr: [
                        {
                            role: eRoleType.USER,
                            content:
                                "Give me 5 really great blog ideas for how to learn to use Next.js and learn the latest technologies. Make sure one covers Vercel and one covers Next.js 14 and one covers using 'app router' and the last one should be whatever you think would be best. For each blog, I want you to give me a structured response that shows who the target audience is (developers) but specifically what type.",
                        },
                        { role: eRoleType.ASSISTANT, content: sampleFileContents["sample-2.txt"] },
                    ],
                },
                {
                    chatId: "1003",
                    msgArr: [
                        {
                            role: eRoleType.USER,
                            content:
                                "I have a very important request. I need you to first give me a table that shows me the 5 biggest European cities, what country they are in, what primary language the people speak and what type of government system they have. Then, I want you to give me some sample Python code I could use as a totally separate thing for how I would call the weather service with a city and country to get the weather for that place.",
                        },
                        { role: eRoleType.ASSISTANT, content: sampleFileContents["sample-3.txt"] },
                        {
                            role: eRoleType.USER,
                            content:
                                'This is really great. Now, suppose I have this JSON in my React app and I want to use it to display this specific information for my users in a table. Can you create the UI and the TypeScript files I would need to show this in a table and then allow them to click on one and have the values show in some input fields that are disabled at first, but if they click the edit buttons, they become enabled and they can make changes and save? When they save, I want it to update the JSON file please. I also want to add a "notes" field to this that will be blank for now, but they can add their own notes.',
                        },
                        { role: eRoleType.ASSISTANT, content: sampleFileContents["sample-4.txt"] },
                    ],
                },
            ],
        },
        {
            userId: "natalieuid",
            chatHistory: [
                {
                    chatId: "1001",
                    msgArr: [
                        { role: eRoleType.USER, content: "Hi. What is your name?" },
                        {
                            role: eRoleType.ASSISTANT,
                            content:
                                "I do not have a name. I am an AI Model trained by the creators of AI Matrix Engine. How can I help you?",
                        },
                    ],
                },
                {
                    chatId: "1002",
                    msgArr: [
                        { role: eRoleType.USER, content: "Can you help me with a task?" },
                        { role: eRoleType.ASSISTANT, content: "Sure. What do you need help with?" },
                    ],
                },
                {
                    chatId: "1003",
                    msgArr: [
                        { role: eRoleType.USER, content: "I need help with a task." },
                        { role: eRoleType.ASSISTANT, content: "Sure. What do you need help with?" },
                    ],
                },
            ],
        },
    ];
}

async function loadChatHistory(): Promise<ChatHistory[]> {
    return await initializeChatHistory();
}

export default loadChatHistory;
