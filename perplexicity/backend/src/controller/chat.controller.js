import { ChatModel } from "../models/chat.model.js";
import { messagemodel } from "../models/messages.model.js";
import { genrateresponse, genreatetitle } from "../services/ai.service.js";

export async function sendmessagecontrolller(req, res) {
  try {
    const { message, chat: chatid } = req.body;

    if (chatid) {
      const chatexits = await ChatModel.findById(chatid);
      if (!chatexits) {
        return res.status(404).json({
          message: "chat id does not exits",
        });
      }
    }

    let chat = null;
    let tittleresult = null;

    if (!chatid) {
      tittleresult = await genreatetitle(message);
      chat = await ChatModel.create({
        user: req.user.id,
        title: tittleresult,
      });
    }
    const usermessage = await messagemodel.create({
      chat: chatid || chat._id,
      message: message,
      role: "user",
    });

    const choiceid = chatid || chat._id;
    console.log(choiceid);

    const allmessage = await messagemodel.find({ chat: choiceid });

    const result = await genrateresponse(allmessage);

    const aimessage = await messagemodel.create({
      chat: choiceid,
      message: result,
      role: "ai",
    });

    return res.status(200).json({
      tittleresult,
      usermessage,
      aimessage,
    });
  } catch (err) {
    error: err;
  }
}

export async function allchatscontroller(req,res){
  const chats = await ChatModel.find()
  res.status(200).json({
    chats
  })
}
export async function chatcontroller(req, res) {
  try {
    const { chatid } = req.params;
    if (!chatid) {
      return res.status(400).json({
        message: "chatid not found",
      });
    }
    const chatpresent = await ChatModel.findOne({ _id: chatid });

    if (!chatpresent) {
      return res.status(404).json({
        message: " chatid not found ",
      });
    }
    const chat = await ChatModel.findById(chatid);

    res.status(200).json({
      chat,
    });
  } 
  catch (err) {
    error: err;
  }
}

export async function messagescontroller(req, res) {
try{  const { chatid } = req.params;
  if (!chatid) {
    return res.status(400).json({
      message: "chatid not found",
    });
  }
  const chatpresent = await ChatModel.findById(chatid);
  if (!chatpresent) {
    return res.status(404).json({
      message: " chatid not found ",
    });
  }

  const chat = await messagemodel.find({ chat: chatid });
  // const mapping = chat.map((e) => {
  //   return `${e.role} : ${e.message}`;
  // });
  res.status(200).json({
    chat
    // mapping,
  });}
  catch(err){
    error:err
  }
}

export async function deletecontroller(req, res) {
  let chatid = req.params.chatid;
  if (!chatid) {
    return res.status(400).json({
      message: "chatid not found",
    });
  }
  const chatpresent = await ChatModel.findById(chatid);
  if (!chatpresent) {
    return res.status(404).json({
      message: " chatid not found ",
    });
  }

  const deletechat = await ChatModel.findByIdAndDelete(chatid);
  const deltemessage = await messagemodel.deleteMany({ chat: chatid });
  res.status(200).json({
    message: "deleted succesfully",
    deletechat,
    deltemessage,
  });
}
