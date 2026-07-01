require('dotenv').config()
const {ChatGoogleGenerativeAI}=require('@langchain/google-genai')

const{ChatMistralAI}=require('@langchain/mistralai')

const{HumanMessage,SystemMessage}=require('langchain')

const geminiModel=new ChatGoogleGenerativeAI({
    model:'gemini-2.5-flash-lite',
    apiKey:process.env.GEMINI_API_KEY
})

const mistralModel=new ChatMistralAI({
    model:'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})

const generateResponse=(async(message)=>
{
    const response=geminiModel.invoke([
        new HumanMessage(message)
    ])

    return (await response).content
})

const generateChatTitle=(async(message)=>
{
    const response=mistralModel.invoke([
        new SystemMessage(`
            You are a chat title generator.

Your task is to generate a concise, descriptive title based ONLY on the user's first message.

Rules:
- Return ONLY the title. Do not add quotes, punctuation, explanations, markdown, or emojis.
- Keep the title between 2 and 4 words.
- Capture the main intent or topic.
- Use title case (capitalize major words).
- If the message is a question, summarize it instead of repeating it verbatim.
- If the message contains code, describe what the code is about.
- If the message is vague (e.g., "hi", "hello", "help"), return a generic title such as "New Conversation".
- Do not invent information that isn't present in the user's message.
- The output must be a single line.
`),
        new HumanMessage(message)

    ])

    return (await response).content
})


module.exports={
    generateResponse,
    generateChatTitle
}