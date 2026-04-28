import { HumanMessage } from "@langchain/core/messages";
import {createAgent, providerStrategy } from 'langchain'
import {  Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { z} from 'zod'
import { cohore, google, mistral } from "./ai.service.js";
import { raw } from "express";
const State = Annotation.Root({
  messages: Annotation<any[]>(),
  solution_1:Annotation<string>({
    reducer:(current,next) =>next,
    default:()=> ""
  }),
  solution_2:Annotation<string>({
    reducer:(current,next)=> next,
    default:()=>""
  }),
  jugerecomndation:Annotation<object>({
    reducer:(current,next) => next,
    default:()=>({
        solution_1:0,
        solution_2:0
    })
  })
});

const solution = async(state: any)=>{
const [mistral_solution,google_solution]= await Promise.all([
    await mistral.invoke(state.messages[0].text),
    await google.invoke(state.messages[0].text)
])
    return{
            solution_1:mistral_solution,
            solution_2:google_solution
    }
}

const juged = async (state: any) => {
  const { solution_1, solution_2 } = state;

  const agent = await createAgent({
    model: google,
    tools: [],
  });
  const result = await agent.invoke({
   messages: [new HumanMessage(`You are a strict judge.AI 1 Response: ${solution_1}AI 2 Response: ${solution_2}Give output ONLY in JSON:{"solution_1_score": number (1-10),"solution_2_score": number (1-10),"winner": "solution_1" | "solution_2"}`)],
});

const aiMessage = result.messages[result.messages.length - 1]; // last message
const rawOutput = aiMessage?.text;
if (!rawOutput) {
  throw new Error("AI response text is missing");
}
const clean = rawOutput.replace(/```json/g, "").replace(/```/g, "").trim();
const finalanswer = JSON.parse(clean);
let winnerresponse;
if(finalanswer.winner=="solution_1"){
  winnerresponse= solution_1.content
  console.log("Winner Response: ",winnerresponse);
  
}else{
  winnerresponse= solution_2.content
  console.log("Winner Response: ",winnerresponse);
}


  return {
    judgeRecommendation: winnerresponse,
  };
};



const graph  = new StateGraph(State)
             .addNode("solution",solution)
             .addNode("juge",juged)
             .addEdge(START,"solution")
             .addEdge("solution","juge")
             .addEdge("juge",END)
             .compile()

export default async function (usermessage:string) {
    const result = await graph .invoke({
        messages:[
            new HumanMessage(usermessage)
        ]
    })
    return   result.messages
}