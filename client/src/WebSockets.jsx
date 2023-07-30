import { useRef, useState } from "react";

export const WebSockets = () => {
  const [messages, setMessages] = useState([]);

  const socket = useRef(null);
  const [connected, setConnected] = useState(false);

  const [username, setUsername] = useState("");
  const onUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const [messageText, setMessageText] = useState("");
  const onMessageTextChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: messageText,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));

    setMessageText("");
  };

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Web socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Web socket ошибка");
    };
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={onUsernameChange}
          />
          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            placeholder="Введите сообщение"
            value={messageText}
            onChange={onMessageTextChange}
            type="text"
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages?.map((message) => (
            <div key={message.id}>
              {message.event === "connection" ? (
                <div className="connection-message">
                  Пользователь {message.username} подключился
                </div>
              ) : (
                <div className="message">
                  {message.username}: {message.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
