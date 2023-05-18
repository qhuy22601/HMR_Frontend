import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Tạo header cho yêu cầu WebSocket với JWT
const createWebSocketHeaders = () => {
  return {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  };
};

const socket = io('ws://localhost:8080/ws', createWebSocketHeaders()); // Thay đổi URL tương ứng với endpoint WebSocket của Spring Boot

const ChatWebSocket = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    socket.emit('register', { username: localStorage.getItem("UserName") });
  // Lắng nghe tin nhắn public
socket.on('publicMessage', (message) => {
  setChatMessages((prevMessages) => [...prevMessages, message]);
});

// Lắng nghe tin nhắn private
socket.on('privateMessage', (message) => {
  setChatMessages((prevMessages) => [...prevMessages, message]);
});

return () => {
  // Gỡ bỏ event listener khi component unmount
  socket.off('publicMessage');
  socket.off('privateMessage');
};
}, []);

const handlePublicMessageSubmit = () => {
const messageObj = {
sender: localStorage.getItem("UserName"), // Thay đổi YOUR_USERNAME thành tên đăng nhập của người dùng
content: message,
};
// Gửi tin nhắn public
socket.emit('publicMessage', messageObj);

setMessage('');
};

const handlePrivateMessageSubmit = () => {
const messageObj = {
sender: localStorage.getItem("UserName"), // Thay đổi YOUR_USERNAME thành tên đăng nhập của người dùng
recipient,
content: message,
};
// Gửi tin nhắn private
socket.emit('privateMessage', messageObj);

setMessage('');
};

return (
  <div>
    <h2>Public Chat</h2>
    <div>
      {chatMessages.map((message, index) => (
      <p key={index}>{`${message.sender}: ${message.content}`}</p>
      ))}
    </div>
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={handlePublicMessageSubmit}>Send</button>
      <h2>Private Chat</h2>
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <div>
          {chatMessages.map((message, index) => (
            <p key={index}>{`${message.sender} (Private): ${message.content}`}</p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handlePrivateMessageSubmit}>Send</button>
  </div>
);
};

export default ChatWebSocket;