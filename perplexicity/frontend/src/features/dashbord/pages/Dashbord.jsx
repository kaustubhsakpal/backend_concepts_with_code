import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Brain } from "lucide-react";
import "./dashbord.css";
import { useChat } from "../hook/chat.hook.js";
import { Setcurrentchatid } from "../state/dashboard.slice.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
const Dashboard = () => {
  const {
    handelchatmessage,
    initializeSocketConnection,
    getchat,
    getmessagebyid,
    deletechat
  } = useChat();

  const dispatch = useDispatch();
  //  Redux
  const user = useSelector((state) => state?.Auth?.user);
  const currentchid = useSelector((state) => state?.chat.currentchatid);
  const chats = useSelector((state) => state?.chat?.chatid);
  
  //  Local state
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const displayName = user?.name || user?.email?.split("@")[0] || "User";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const handlesumbit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  console.log("i am current chat id ",currentchid);
  
  let chatId = currentchid;

  if (!chatId) {
    const newChat = await handelchatmessage({
      message: input,
      chatid: null,
    });
    
    chatId = newChat?.chatid || newChat?.id;


    dispatch(Setcurrentchatid(chatId));
  } else {
    await handelchatmessage({
      message: input,
      chatid: chatId,
    });
  }

  

  setInput("");
  
  await getchat(); 
  await getmessagebyid(chatId)
};
  //selectchat
  const optionselcted = async (chatid) => {
    dispatch(Setcurrentchatid(chatid));
    await getmessagebyid(chatid);
  };

  const newchathandel = async () => {
    dispatch(Setcurrentchatid(null));
  };

  // delete 
  const handelDelete=async (chatid)=>{    
     deletechat(chatid)
     dispatch(Setcurrentchatid(null))
  }

  useEffect(() => {
    initializeSocketConnection();
    getchat();
  }, []);

  const currentChat = chats?.[currentchid];
  return (
    <div className="flex h-screen bg-[#0f0f13] text-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside className="w-64 bg-[#13131a] border-r border-white/10 flex flex-col p-4 gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Kaush AI</span>
          </div>

          {/* New Chat */}
          <button
            onClick={newchathandel}
            className="bg-indigo-500/20 border cursor-pointer active:scale-95 border-indigo-400/30 text-indigo-400 rounded-lg px-3 py-2 text-sm"
          >
            + New Chat
          </button>

          {/*  ALL CHATS */}
          <div className=" flex  flex-col flex-1 overflow-y-auto">
            {Object.values(chats || {}).map((chat, i) => (
              <button
                key={i}
                onClick={(e) => {
                  optionselcted(chat.id);
                }}
                className="p-2 text-left flex items-center justify-between rounded-lg hover:bg-[#1f1f2e] cursor-pointer text-sm text-gray-300"
              >
                {chat.title}
                <img  className="w-4 h-4 ml-2 cursor-pointer"
                onClick={(e)=>{
                   e.stopPropagation();
                   handelDelete(chat.id)
                }}
                src="./assets/delete.png"/>
              </button>
              
            ))}
          </div>

          {/* User */}
          <div className="border-t border-white/10 pt-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <div>
              <div className="text-sm">{displayName}</div>
              <div className="text-xs text-gray-500">Free plan</div>
            </div>
          </div>
        </aside>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-14 flex items-center px-5 border-b border-white/10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <span className="ml-3 text-gray-400">
            {currentChat?.tittle || "New conversation"}
          </span>
        </header>

        {/*  MESSAGES */}
        <div className=" messages flex-1 overflow-y-auto px-5 pt-8">
          <div className="max-w-3xl mx-auto">
            {Array.isArray(currentChat?.message) &&
              currentChat.message.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 mb-5 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${
                      msg.role === "user"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500"
                    }`}
                  >
                    {msg.role === "user" ? initials : "AI"}
                  </div>

                  {/* Message  role user*/}

                  <div
                    className={` prose prose-invert max-w-none px-4 py-3 text-sm rounded-2xl rounded-tl-none  ${
                      msg.role === "user"
                        ? "bg-[#1e1e30] border-indigo-500/20"
                        : "bg-[#16161f] border-white/10"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* INPUT */}
        <div className="p-4">
          <div className="max-w-3xl mx-auto bg-[#1a1a24] border border-white/10 rounded-2xl flex items-center gap-2 p-3">
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handlesumbit(e);
                }
              }}
            />

            <button
              className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center"
              onClick={(e) => {
                handlesumbit(e);
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
