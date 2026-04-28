import { ChatMistralAI } from '@langchain/mistralai';
import config from '../config/ai.config.js'
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from '@langchain/cohere';

export const google= new ChatGoogle({
 apiKey:config.GOOGLE_API_KEY,
 model:"gemini-2.5-flash"
})

export const mistral = new ChatMistralAI({
    apiKey:config.MISTRAL_API_KEY,
    model:"mistral-medium-latest",
    temperature:0
})

export const cohore = new ChatCohere({
    apiKey:config.COHERE_API_KEY,
    model:"embed-english-v3"
})
