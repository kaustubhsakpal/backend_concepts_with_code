import nodemailer from 'nodemailer';
const transport = nodemailer.createTransport({
  service:'gmail',
  auth:{
    type:"OAuth2",
    user:process.env.GOOGLE_USER,
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    refreshToken:process.env.GOOGLE_REFRESH_TOKEN
  }
})

transport.verify()
.then(()=>{
  console.log("email setup done");
})
.catch((err)=>{
console.log("error ",err);

})

export async function sendEmail ({to,subject,html,text}){

  const mailoption={
    from:process.env.GOOGLE_USER,
    to,subject,html,text
  }

  try{
    const maildetails=await transport.sendMail(mailoption);
    console.log(maildetails);
    return " mail send succesfully"
  }
  catch(err){
      throw err
    
  }
}