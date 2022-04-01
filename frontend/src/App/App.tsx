import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './App.module.scss';


function App() {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value)
  }

  const handleRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value)
  } 

  const handleJoin = () => {
    console.log('click')
  }

  return (
    <div className={styles.App}>
      <h1>Welcome to the CHAT</h1>
      <input type="text" className={styles.Input} placeholder="Username" onChange={handleUser} value={user}/>
      <input type="text" className={styles.Input} placeholder="Room name" onChange={handleRoom} value={room}/>
      <Link to={`/chat/${room}/${user}`}><button className={styles.Button} onClick={handleJoin}>Join</button></Link>

    </div>
  );
}

export default App;
