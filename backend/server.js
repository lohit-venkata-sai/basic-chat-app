import express from 'express'
import { Server } from 'socket.io'
import {createServer} from 'http'


const httpServer  = createServer();
// const app = express()
const io = new Server(httpServer);

io.on('connection',(socket)=>{
    console.log('what is socket',socket);
  socket.on('onMsgSent',(payload)=>{
    console.log('this is payload',payload);
    io.emit('onMsgSent',payload);
  })
})

httpServer.listen(3000 , ()=>{
    console.log('http server is running....');
})