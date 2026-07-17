require('dotenv').config()

const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS) || 15000,
  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS) || 10000,
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS) || 20000,
});

transporter.verify()
.then(()=>
{
    console.log('Tranporter is ready to establish communication b/w Web server & SMTP sever')
})
.catch((err)=>
{
    console.log(err)
})


const sendEmail=(async({to,from,subject,text,html})=>
{   

    const mailOptions={
        from:process.env.GOOGLE_USER,
        to,
        // replyTo:,
        subject,
        text,
        html
    }
    try{
        const details=await transporter.sendMail(mailOptions)

    console.log("Email sent",details)
    return details
}
catch(err){
    console.log(err)
    throw err
}
})

module.exports=sendEmail
