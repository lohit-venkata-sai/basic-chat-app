import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
import './App.css';
const userID = nanoid(5);
const socket  = io.connect('http://localhost:3000/');
function App() {
  const  [msg, setMsg] = useState('');
  const [data,setData] = useState([]);
  const sendMsg = (e)=>{
    e.preventDefault();
    socket.emit('onMsgSent',{msg,userID});
    setMsg('');
  };
  useEffect(()=>{
    socket.on('onMsgSent',(payload)=>{
      setData([...data,payload]);
    })
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App-v0.1</h1>
        {
          data?.map((val,index)=>{
            return <p key={index}>{val.msg} &nbsp;&nbsp;<span>{val.userID}</span></p>
          })
        }
        <form onSubmit={(e)=>{sendMsg(e)}}>
          <input value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='start writing....'/>
          <button type='submit'>send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
