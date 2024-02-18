import React, { useState, useEffect } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('chatMessages');
  }, []);

  const sendMessage = () => {
    if (currentMessage) {
      const updatedMessages = [...messages, currentMessage];
      setMessages(updatedMessages);
      setCurrentMessage('');

      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    }
  };

  return (
    <div className="App">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
