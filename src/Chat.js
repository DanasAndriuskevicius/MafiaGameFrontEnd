import React, { useState, useEffect } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Įkeliant komponentą, gauti žinutes iš localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Išvalyti žinutes iš localStorage paleidus aplikaciją
  useEffect(() => {
    localStorage.removeItem('chatMessages');
  }, []);

  // Siųsti žinutę
  const sendMessage = () => {
    if (currentMessage) {
      const updatedMessages = [...messages, currentMessage];
      setMessages(updatedMessages);
      setCurrentMessage('');

      // Įrašyti naujas žinutes į localStorage
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
