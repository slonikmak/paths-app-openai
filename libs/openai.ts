import {OpenAI} from 'openai';


export const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true
});