import axios from 'axios';

const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URI,
    withCredentials:true
})

export async function chatmessage({message,chatid}) {
  const chat =chatid
  const data = await api.post('/api/chats/message',{message,chat})
        return data.data 
} 

export async function allchats() {
  const data = await api.post('/api/chats')
  return data.data
}
// a single chat with an id 
export async function chatwithid({chatid}) {
  const data = await api.post(`/api/chats/${chatid}`)
    return data.data 
}

export async function allmessagedata(chatid) {
  const data = await api.post(`/api/chats/message/${chatid}`) 
    return data.data 
}
export async function deletemessaage(chatid) {
  console.log(`/api/chats/delete/${chatid}`);
  
  const data = await api.delete(`/api/chats/delete/${chatid}`)
    return data.data 
}

