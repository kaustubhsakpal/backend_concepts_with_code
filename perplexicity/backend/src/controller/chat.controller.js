import { ChatModel } from "../models/chat.model.js";
import { messagemodel } from "../models/messages.model.js";
import { genrateresponse, genreatetitle } from "../services/ai.service.js";

export  async function sendmessagecontrolller(req,res){
    const {message} = req.body;
    const  tittleresult = await genreatetitle(message)
   const result =await  genrateresponse(message)

  
   

   const chat = await ChatModel.create({
    user:req.user.id,
    title:tittleresult
   })

   console.log(chat._id);
   

   const aimessage =await messagemodel.create({
       chat:chat._id,
       message:result,
       role:"ai"
   })
   return res.status(200).json({
       chat,
       aimessage
   })

}