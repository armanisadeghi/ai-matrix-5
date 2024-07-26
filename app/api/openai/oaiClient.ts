const apiKey='sk-proj-zzLXZDKLdMnNyM94MJdpT3BlbkFJqXJbkY5UIYyXYleWqxmN';

import OpenAI from "openai";


const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default openai;

