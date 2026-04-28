type allai={
    COHERE_API_KEY:string,
    MISTRAL_API_KEY:string,
    GOOGLE_API_KEY:string
}

function getenv(key:string){
    const value = process.env[key];
    if(!value){
        throw Error("api key messing")
    }
    return value
}
const aienv :allai=({
    COHERE_API_KEY:getenv("COHERE_API_KEY"),
    MISTRAL_API_KEY:getenv("MISTRAL_API_KEY"),
    GOOGLE_API_KEY:getenv("GOOGLE_API_KEY")
})

export default aienv