import { createSlice } from '@reduxjs/toolkit'

const dashbordSclice = createSlice({
  name: "chat",
  initialState: {
    chatid: {},
    currentchatid: null,
    loading: false,
    error: null,
  },
  reducers: {
    Setallchatmessages: (state, action) => {
      const { chatid, message } = action.payload;

      if (!state.chatid[chatid]) return;

      state.chatid[chatid].message = message || [];
    },
    Setcurrentchat: (state, action) => {
      const { chatId, tittle } = action.payload;

      if (!state.chatid[chatId]) {
        state.chatid[chatId] = {
          id: chatId,
          tittle,
          message: [],
          lastUpdated: new Date().toISOString()
        };
      }
    },
    Setmessages: (state, action) => {
      const { chatId, content, role } = action.payload;

      if (!state.chatid[chatId]) {
        state.chatid[chatId] = {
          id: chatId,
          tittle: "New Chat",
          message: [],
          lastUpdated: new Date().toISOString()
        };
      }

      if (!Array.isArray(state.chatid[chatId].message)) {
        state.chatid[chatId].message = [];
      }

      state.chatid[chatId].message.push({ content, role });
    },
    SetDelete:(state,action)=>{
      const chatId = action.payload
         delete state.chatid[chatId];
         if(state.currentchatid==chatId){
               state.currentchatid=null
         }
    },
    Setchatid: (state, action) => {
      state.chatid = action.payload;
    },
    Setcurrentchatid: (state, action) => {
      state.currentchatid = action.payload;
    },
    Setloading: (state, action) => {
      state.loading = action.payload;
    },
    Seterror: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  Setchatid,
  Setcurrentchatid,
  Setloading,
  Seterror,
  Setcurrentchat,
  Setmessages,
  Setallchatmessages,
  SetDelete
} = dashbordSclice.actions;


export default dashbordSclice.reducer;