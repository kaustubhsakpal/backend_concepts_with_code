import { initializeSocketConnection } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";

import {
  chatmessage,
  chatwithid,
  allchats,
  allmessagedata,
  deletemessaage,
} from "../service/chats.api.js";
import {
  Setcurrentchat,
  Setmessages,
  Setchatid,
  Setcurrentchatid,
  Seterror,
  Setloading,
  Setallchatmessages,
  SetDelete
} from "../state/dashboard.slice.js";
export function useChat() {
  const dispatch = useDispatch();

  async function handelchatmessage({ message, chatid }) {        
    try {
      dispatch(Setloading(true));    
      const data = await chatmessage({ message, chatid });   
               const { usermessage, aimessage ,tittleresult } = data;
      // dispatch(Setchatid({}))
      dispatch(Setcurrentchat({chatId:usermessage.chat,tittle:tittleresult}))
      dispatch(Setmessages({chatId:usermessage.chat,content:usermessage.message,role:"user"}))
      dispatch(Setmessages({chatId:aimessage.chat,content:aimessage.message,role:"ai"}))
        // dispatch(Setcurrentchatid(usermessage.chat))
         return data;
    } catch (err) {
      console.log("error is ",err);
      
    }
    finally{
        dispatch(Setloading(false));
    }
  }

  async function getchat() {
    const data = await allchats();    
    const {chats} = data
    dispatch(Setchatid(chats.reduce((acc,chatdeatis)=>{
          acc[chatdeatis._id]={
            id:chatdeatis._id,
            title:chatdeatis.title,
            message:[],
            lastUpdate:chatdeatis.updatedAt
          }
          return acc
          
    },{})))
    
  }

 
  async function getmessagebyid(chatid) {
    const res= await allmessagedata(chatid)    
     const formating=res.chat.map((msg)=>({
       content:msg.message,
       role:msg.role
     }))
     
     dispatch(Setallchatmessages({
       chatid:chatid,
       message:formating
      }))      
  }

  async function deletechat(chatid){
    const deletes = await deletemessaage(chatid)
    dispatch(SetDelete(chatid))
    console.log(deletes);
  }

  return{
    initializeSocketConnection,
    handelchatmessage,
    getchat,
    getmessagebyid,
    deletechat
  }
}


