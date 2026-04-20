import { tavily } from "@tavily/core";

const client = tavily({
  apikey: process.env.TAVILY_API_KEY,
});

console.log("i am client",client);

export async function tavilyairesponse({query}) {
 console.log("i am query",query);
 
  const res = await client.search(query, {
      maxResults: 5,
      includeAnswer: "basic",
      searchDepth: "basic",
    })
  console.log("res of telivy",res);
  return JSON.stringify(res)
} 
