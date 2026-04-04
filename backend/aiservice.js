import 'dotenv/config'
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from 'langchain'
import readline from 'readline/promises'

const model = new ChatMistralAI({
apiKey: process.env.MISTRAL_APIKEY,
model: "mistral-small-latest",
temperature: 0
});


const rl =readline.createInterface({
      input: process.stdin,
  output: process.stdout
})

console.log(process.env.MISTRAL_APIKEY);
const array =[]

while(true){
     const userInput = await rl.question("\x1b[32myou\x1b[0m :")
     console.log(userInput);
     array.push(new HumanMessage(userInput))
     
    const response =await model.invoke(array)
    console.log(`\x1b[34m[AI]:\x1b[0m ${response.content}`);
    
}

