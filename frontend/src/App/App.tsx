import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';

function App({ socket }: any) {

  let navigate = useNavigate()

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  const handleJoin = () => {
    socket.emit('joinRoom', {username: user, roomName: room})
  };

  return (
    <div className={styles.App}>
      <h1>Welcome to the CHAT</h1>
      <input
        type="text"
        className={styles.Input}
        placeholder="Username"
        onChange={handleUser}
        value={user}
      />
      <input
        type="text"
        className={styles.Input}
        placeholder="Room name"
        onChange={handleRoom}
        value={room}
        onKeyDownCapture={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleJoin();
            navigate(`/chat/${room}/${user}`)
          }
        }}
      />
      <Link to={`/chat/${room}/${user}`}>
        <button
          className={styles.Button}
          onClick={handleJoin}
          disabled={!user || !room}
        >
          Join
        </button>
      </Link>
    </div>
  );
}

export default App;
