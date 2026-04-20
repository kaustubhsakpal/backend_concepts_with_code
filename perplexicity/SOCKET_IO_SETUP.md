# Socket.IO Setup Guide

Socket.IO has been successfully set up for real-time communication in your Perplexicity app!

## 📦 What's Installed
- **Backend**: `socket.io` v4+
- **Frontend**: `socket.io-client` v4+

## 🚀 How to Use

### 1. In Your Dashboard Component

```jsx
import { useSocketChat } from '../hook/useSocketChat.hook';

const Dashboard = () => {
  const currentChatId = useSelector(state => state?.chat.currentchatid);
  
  // Initialize Socket.IO chat with room ID
  const { isConnected, messages, sendMessage } = useSocketChat(currentChatId);

  const handleSendMessage = (messageText) => {
    sendMessage(messageText, 'Your Sender ID');
  };

  return (
    <div>
      {isConnected ? '✅ Connected' : '❌ Disconnected'}
      
      {/* Display messages */}
      {messages.map((msg, idx) => (
        <div key={idx}>{msg.message}</div>
      ))}

      {/* Send message form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage(input);
      }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
```

### 2. Backend Events

The Socket.IO server listens for:

- **`join-room`**: User joins a chat room
  ```js
  socket.emit('join-room', roomId);
  ```

- **`send-message`**: Send a message to a room
  ```js
  socket.emit('send-message', {
    roomId: 'chat-id',
    message: 'Hello',
    sender: 'userId'
  });
  ```

- **`leave-room`**: Leave a chat room
  ```js
  socket.emit('leave-room', roomId);
  ```

### 3. Frontend Services

#### `useSocket()` Hook
Basic Socket.IO connection hook
```js
const { socket, isConnected } = useSocket();
```

#### `useSocketChat(roomId)` Hook
Higher-level hook with message management
```js
const { isConnected, messages, sendMessage } = useSocketChat(roomId);
```

#### `socketService` 
Direct service for Socket.IO operations
```js
import { socketService } from '../service/socket.service';

socketService.joinRoom(socket, roomId);
socketService.sendMessage(socket, roomId, message, sender);
socketService.onMessageReceived(socket, (data) => {
  console.log('New message:', data);
});
```

## 🔧 Environment Variables

Add to your **frontend .env**:
```
VITE_SOCKET_URL=http://localhost:3000
```

## 📝 Backend Structure

**File**: `backend/server.js`

- Sets up HTTP server with Socket.IO
- Handles connection/disconnection
- Manages room joins/leaves
- Broadcasts messages to specific rooms

## ✅ Testing

1. Start backend: `npm run dev` (in backend folder)
2. Start frontend: `npm run dev` (in frontend folder)
3. Open browser console and check for connection message
4. Open multiple tabs to test real-time messaging

## 🔌 Architecture

```
Frontend Component
       ↓
useSocketChat Hook
       ↓
socket.service.js (Event handlers)
       ↓
useSocket Hook (Connection)
       ↓
Socket.IO Client
       ↓
─────────────── Network ─────────────
       ↓
Socket.IO Server (backend/server.js)
       ↓
Express Routes (for API calls)
```

## 📚 Files Created

- `frontend/src/features/dashbord/hook/socket.hook.js` - Base socket connection
- `frontend/src/features/dashbord/hook/useSocketChat.hook.js` - Chat-specific hook
- `frontend/src/features/dashbord/service/socket.service.js` - Socket events service
- `frontend/src/features/dashbord/component/SocketChatExample.jsx` - Example component

## ⚡ Next Steps

1. Integrate `useSocketChat` hook into your existing Dashbord.jsx
2. Replace REST API calls for real-time chat with Socket.IO events
3. Add user typing indicators (optional)
4. Add online user list (optional)

All set! Your Socket.IO connection is ready to go! 🎉
