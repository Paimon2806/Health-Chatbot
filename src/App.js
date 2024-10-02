import React, { useState } from 'react';
import './App.css';

const API_URL = "https://elastic-newton-sad.lemme.cloud/api/api-postman";

function App() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setChats((prevChats) => [...prevChats, { role: 'user', content: message }]);
    setMessage("");

    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const
          data = await response.json();

      if (data.status === 'OK') {
        const botReply = data.res.reply;
        setChats((prevChats) => [...prevChats,  { role: 'bot', content: botReply }]);
      } else {
        console.error("Error fetching from API:", data);
        setChats([...chats, { role: 'bot', content: "I couldn't get a response from the API. Please try again later." }]);
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
      setChats([...chats, { role: 'bot', content: "I couldn't get a response from the API. Please try again later." }]);
    }

    setIsTyping(false);
  };

  return (
      <div className="App">
        <div className="healthcare-theme">
          <h1>Healthcare Chatbot</h1>

          {/* Chats */}
          <div className="chats-container">
            <div className="chats">
            <div className="chat left">
              <div className="avatar">
                <img src="https://img.freepik.com/premium-vector/illustration-medical-robot-character-vector-technology_680355-128.jpg" alt="Bot" />
              </div>
              <div className="message">How can I assist you today?</div>
            </div>
              {chats.map((chat, index) => (
                  <div key={index} className={`chat ${chat.role === 'user' ? 'right' : 'left'}`}>
                    <div className="avatar">
                      {chat.role === 'user' ? (
                          <img src="https://cdn-icons-png.flaticon.com/512/6097/6097946.png" alt="User" />
                      ) : (
                          <img src="https://img.freepik.com/premium-vector/illustration-medical-robot-character-vector-technology_680355-128.jpg" alt="Bot" />
                      )}
                    </div>
                    <div className="message">{chat.content}</div>
                  </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                  <div className="chat left">
 
                    <div className="avatar">
                      <img src="https://img.freepik.com/premium-vector/illustration-medical-robot-character-vector-technology_680355-128.jpg" alt="Bot" />
                    </div>
                    
                    <div className="message">Typing...</div>
                  </div>
              )}
            </div>
          </div>

          {/* Message Input Area */}
          <div className="input-area">
            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
              />
              <input type="submit" value="Send" />
            </form>
          </div>

          {/* Help Bubble */}
          <div className="help-bubble">
            <img
                src="https://th.bing.com/th/id/OIP.NgAWNMYY6-JKqp0IynbpHQHaHa?rs=1&pid=ImgDetMain"
                alt="Help"
                style={{ borderRadius: '25px' }}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
