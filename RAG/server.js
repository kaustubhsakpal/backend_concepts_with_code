import "dotenv/config";
import fs from "fs";
import {  PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";
import { log } from "console";
let databuffer = fs.readFileSync("./kaustubhsakpalupdatescs.pdf");

const pdfparser = new PDFParse({
  data: databuffer,
});

const data = await pdfparser.getText();
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 0,
});

const texts = await splitter.splitText(data.text);
const embeeding = new MistralAIEmbeddings({
  apiKey: "QoSqKgsxJYUV1m7VG05xW28oVJ3okJLq",
  model: "mistral-embed",
});

const pc = new Pinecone({
  apiKey: process.env.PIECOAN_API_KEY,
});


const index = pc.index("perplexity");

// const docs = await Promise.all(
//   texts.map(async (chunk, i) => {
//     const vector = await embeeding.embedQuery(chunk); // single chunk

//     return {
//       id: `doc-${i}`,
//       values: vector,
//       metadata: {
//         text: chunk,
//       },
//     };
//   })
// );

// console.log(docs);

// await index.upsert({
//   records: docs,
// });






/// reponse side 

const embeding = await embeeding.embedQuery("tell me about experince ");

const result = await  index.query({
    vector:embeding,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(result));

 