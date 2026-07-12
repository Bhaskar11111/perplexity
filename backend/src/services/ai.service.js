require('dotenv').config()
const {ChatGoogleGenerativeAI}=require('@langchain/google-genai')
const {ChatMistralAI}=require('@langchain/mistralai')
const {HumanMessage,SystemMessage,AIMessage}=require('@langchain/core/messages')

const geminiModel=new ChatMistralAI({
    model:'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})
console.log(process.env.GEMINI_API_KEY)

const mistralModel=new ChatMistralAI({
    model:'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})

const generateResponse=(async(allMessages)=>
{
    const response=await geminiModel.invoke(allMessages.map((elem)=>
    {
        if(elem.role==="user"){
            return new HumanMessage(elem.content)
        }
        else if(elem.role==="ai"){
            return new AIMessage(elem.content)
        }
    }))
console.log(typeof allMessages);
    return (await response).content
})

const generateTitle=(async(message)=>
{
    const title=await mistralModel.invoke([
        new SystemMessage(`You are a chat title generator.

Your task is to generate a concise, descriptive title based ONLY on the user's first message.

Rules:
- Return ONLY the title. Do not add quotes, punctuation, explanations, markdown, or emojis.
- Keep the title between 2 and 6 words.
- Capture the main intent or topic.
- Use title case (capitalize major words).
- If the message is a question, summarize it instead of repeating it verbatim.
- If the message contains code, describe what the code is about.
- If the message is vague (e.g., "hi", "hello", "help"), return a generic title such as "New Conversation".
- Do not invent information that isn't present in the user's message.
- The output must be a single line.`),

        new HumanMessage(message)
    ])
    return (await title).content
})

module.exports={
    generateResponse,
    generateTitle
}