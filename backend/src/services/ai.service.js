require('dotenv').config()
const {ChatGoogleGenerativeAI}=require('@langchain/google-genai')
const {ChatMistralAI}=require('@langchain/mistralai')
const {HumanMessage,SystemMessage,AIMessage}=require('@langchain/core/messages')
const {tool}=require('@langchain/core/tools')
const{createAgent}=require('langchain')
const {z}=require('zod')
const serachInternet = require('./internet.service')
const sendEmail = require('./mail.service')

const chatMistralModel=new ChatMistralAI({
    model:'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})

const titleMistralModel=new ChatMistralAI({
    model:'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})

const serachInternetTool=tool(
    serachInternet,
    {
        name:"searchInternet",
        description:"Use this tool to get the latest information from the internet.",
        schema:z.object({
            query:z.string().describe("The search query to look up on the internet")
        })
    }
)

const sendEmailTool=tool(
    sendEmail,
    {
        name:"sendEmailtool",
        description:"This tool can send personalized emails",
        schema:z.object({
            to:z.string().describe("This is the recipient's email"),

            subject:z.string().describe("It contains the subject of an email"),

            html:z.string().describe("The main body of an email")
        })
    }
)

const agent=createAgent({
    model:chatMistralModel,
    tools:[serachInternetTool,sendEmailTool]
})

const generateResponse=(async(allMessages)=>
{
    const response=await agent.invoke({
        messages:allMessages.map((elem)=>
    {
        if(elem.role==="user"){
            return new HumanMessage(elem.content)
        }
        else if(elem.role==="ai"){
            return new AIMessage(elem.content)
        }
    }).filter(Boolean)
    })

    return response.messages[response.messages.length-1].content
})

const generateTitle=(async(message)=>
{
    const title=await titleMistralModel.invoke([
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
