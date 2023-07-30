import axios from "axios";
import { useEffect, useState } from "react";

export const EventSourcing = () => {
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState("");
  const onMessageTextChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
  };

  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");

    eventSource.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prev) => [message, ...prev]);
    };
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-message", {
      message: messageText,
      id: Date.now(),
    });
    setMessageText("");
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={messageText} onChange={onMessageTextChange} type="text" />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages?.map((message) => (
            <div key={message.id} className="message">
              {message.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
