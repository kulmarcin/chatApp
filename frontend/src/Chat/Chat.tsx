import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Chat.module.scss';

function Chat({ socket }: any) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const systemMessagesRef = useRef<HTMLDivElement>(null);

  const { room, user } = useParams();

  const [userMessage, setUserMessage] = useState('');

  interface message {
    userId: string;
    username: string;
    text: string;
  }
  const [messages, setMessages] = useState<message[]>([]);
  const [systemMessages, setSystemMessages] = useState<message[]>([]);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSend = () => {
    if (userMessage !== '') {
      socket.emit('chat', userMessage);
    }
    setUserMessage('');
  };

  useEffect(() => {
    socket.on('message', (data: message) => {
      let temp: message[] = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text
      });
      setMessages([...temp]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on('joining', (data: message) => {
      let temp: message[] = systemMessages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text
      });
      setSystemMessages([...temp]);
    });

    socket.on('welcome', (data: message) => {
      let temp: message[] = systemMessages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text
      });
      setSystemMessages([...temp]);
    });

    socket.on('leave', (data: message) => {
      let temp: message[] = systemMessages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text
      });
      setSystemMessages([...temp]);
    });
  }, [socket, systemMessages]);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollIntoView({ behavior: 'smooth' });

    if (systemMessagesRef.current)
      systemMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, systemMessages]);

  return (
    <div className={styles.Chat}>
      <h1>Welcome {user}!</h1>
      <h2>Room: {room}</h2>

      <div className={styles.Container}>
        <div className={styles.UserMessages}>
          {messages.map((el, index) => {
            if (el.username === user) {
              return (
                <div className={styles.Left} key={index}>
                  <p className={styles.User}>{el.username}:</p>
                  <p>{el.text}</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <p className={styles.User}>{el.username}:</p>
                  <p>{el.text}</p>
                </div>
              );
            }
          })}
          <div ref={messagesRef}></div>
        </div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Typing}>
          <textarea
            autoFocus
            value={userMessage}
            onChange={handleMessage}
            onKeyDownCapture={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button onClick={handleSend}>Send</button>
        </div>

        <div className={styles.SystemContainer}>
          {systemMessages.map((el, index) => (
            <div className={styles.SystemMessage} key={index}>
              <p>{el.text}</p>
            </div>
          ))}
          <div ref={systemMessagesRef}></div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
