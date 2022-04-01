import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './Chat.module.scss';

function Chat() {
  const { room, user } = useParams();

  const [message, setMessage] = useState('');

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log('sent');
    setMessage('');
  };

  return (
    <div className={styles.Chat}>
      <h1>Welcome {user}!</h1>
      <h2>Room: {room}</h2>

      <div className={styles.Messages}>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p className={styles.Left}>{message}</p>
      </div>

      <div className={styles.Typing}>
        <textarea
          value={message}
          onChange={handleMessage}
          onKeyDownCapture={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
