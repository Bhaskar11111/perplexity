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
}
catch(err){
    console.log(err)
    throw err
}
})

module.exports=sendEmail