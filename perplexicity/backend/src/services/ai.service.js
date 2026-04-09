import {  SystemMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const geminimodel =  new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMENI_API_KEY,
});



const Mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0,
});

// **************functions*******************




export async function genrateresponse(message) {  
  const response = await Mistralmodel.invoke(message);  
  return response.content;

}

export async function genreatetitle(message) {
  const res = await Mistralmodel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise titles for user messages. The title should be 2-5 words long and capture the essence of the message without any extra text.`),
    new HumanMessage(` Generate a concise, clear title in 2–5 words. No extra text ${message}`),
  ]);
  return res.content;
}
