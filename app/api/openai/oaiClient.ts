import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

// const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
// });

export default openai;
