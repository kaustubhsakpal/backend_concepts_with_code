import nodemailer from "nodemailer";
import  "dotenv/config";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transport.verify()
  .then(() => {
    console.log("email transport is ready");
  })
  .catch((err) => {
    console.error(err);
  });

  export async function sendemail({to,subject,html,text}) {
     
    const mailoption={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    const maildetails = await transport.sendMail(mailoption)
    console.log("mail send",maildetails);
    return "mail send successfully"    
  }