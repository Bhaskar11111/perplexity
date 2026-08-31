require('dotenv').config()
const {tavily}=require('@tavily/core')

const tvly=tavily({
    apiKey:process.env.TAVILY_API_KEY
})

const serachInternet = (async({query})=>
{
    const results=await tvly.search(query,{
        maxResults:5,
        searchDepth:"advanced"
    })

    return JSON.stringify(results)
})

module.exports=serachInternet