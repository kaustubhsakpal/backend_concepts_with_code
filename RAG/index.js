import "dotenv/config";
import readline from "readline/promises";
import {
  ChatMistralAI,
  MistralAI,
  MistralAIEmbeddings,
} from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { stdin } from "process";

  const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-small-latest",
  });

const bufferdata = fs.readFileSync("./kaustubhsakpalupdatescs.pdf");
const pdfparser = new PDFParse({
  data: bufferdata,
});

const pdf = await pdfparser.getText();

const splitter = await new RecursiveCharacterTextSplitter({
  chunkSize: 600,
  chunkOverlap: 0,
});

const text = await splitter.splitText(pdf.text);
const embeddings = new MistralAIEmbeddings({
  apiKey:  process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

const pc = new Pinecone({
  apiKey: process.env.PIECOAN_API_KEY,
});

const index = pc.index("perplexity");

// const docs = await Promise.all(
//   text.map(async (chunk, i) => {
//     const vector = await embeddings.embedQuery(chunk);

//     return {
//       id: `doc-${i}`,
//       values: vector,
//       metadata: {
//         text: chunk,
//       },
//     };
//   }),
// );

// const  finaldata = await index.upsert({
//     records:docs
// })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = await rl.question("Enter your question");
const input = await embeddings.embedQuery(question);
const result = await index.query({
  vector: input,
  topK: 2,
  includeMetadata: true,
});
if (!result.matches || result.matches.length === 0) {
  console.log("No matches found");
} else {
  const ans = result.matches.map(m => m.metadata?.text)
  .join("\n");

  const prompt = `
You are an AI assistant.

Context:
${ans}

Question:
${question}

Answer clearly based only on the context.
`;
  const res = await model.invoke(prompt);
  console.log(res.content);
}

// rl.close()