import * as express from 'express';
import * as http from 'http'
import {Server} from "socket.io";
const app = express()
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=>{
    socket.on('join',(room)=>{
        socket.join(room.code)
        socket.emit('statusJoin', {room:room.code, userId:room.id})
    })

    socket.on('chat', ({message, id, date, server, time, key})=>{
        socket.to(server).emit('messages', {message, id, date, time, key})
    })

    socket.on('deleteMessage',({key, server})=>{
        socket.to(server).emit('deleteMessage', key)
    })
})


server.listen(process.env.PORT || 3333, () =>{
    console.log('Servidor iniciado! 😁')
})

