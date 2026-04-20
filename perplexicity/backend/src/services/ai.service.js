import {  AIMessage, createAgent, tool } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage ,SystemMessage } from "langchain";
import * as z from 'zod'
import { tavilyairesponse } from "./internet.service.js";

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// const geminimodel =  new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: process.env.GEMENI_API_KEY,
// });



const Mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0,
});

// **************functions*******************
 const realdatatool =tool(
   tavilyairesponse,   
  {
    name:"getrealdata",
    description:"to genrate the real world data ",
    schema:z.object({
      query:z.string().describe("search the quer on the internet and provide latest data"),
    })
  }
 )

 

 const agent = createAgent({
  model:Mistralmodel,
  tools:[realdatatool]
  
 })

export async function genrateresponse(allmessage) {  
  const response = await agent.invoke({
    messages:[
       new SystemMessage("You MUST use the getrealdata tool for any real-time or current information like gold price, weather, news etc.Do NOT answer from your own knowledge."),
      ...allmessage.map(msg=>{
   if(msg.role=="user"){
     return  new HumanMessage(msg.message)
    }
    if(msg.role=="ai"){      
      return new AIMessage(msg.message)
    }
  })]
  });  
    
 return response.messages[response.messages.length - 1].content;

}

export async function genreatetitle(message) {
  const res = await Mistralmodel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise titles for user messages. The title should be 2-5 words long and capture the essence of the message without any extra text.`),
    new HumanMessage(` Generate a concise, clear title in 2–5 words. No extra text ${message}`),
  ]);
  return res.content;
}
