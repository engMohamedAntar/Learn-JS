const express= require('express');
const app= express();   //app is your Express application, which defines your routes, middleware, and other logic.
const {join}= require("path");
const http= require('http');
const {Server}= require('socket.io');
const cors= require('cors');
const { log } = require('console');

app.use(cors());    //your frontend served on http://127.0.0.1:8080 making requests to your backend on http://localhost:3000

const server= http.createServer(app);
const io= new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8080' //this is the url of our index.html (the client that will call our server) which exists in different origin from index.js
    }
});

io.on('connection', (socket)=>{     //socket represents the client that creted the connection
    console.log(`user ${socket.id} joined the chat`);
    
    socket.on('message',(msg)=>{    
        console.log(`hello ${msg}`);
        io.emit('send_message_to_all_users', msg); 
    })

    socket.on('typing' , ()=>{
        socket.broadcast.emit('show_typing_status');//socket.broadcast.emit means send an emit to all clients except this one
    })

    socket.on('not_typing' , ()=>{
        socket.broadcast.emit('remove_typing_status');//socket.broadcast.emit means send an emit to all clients except this one
    })
    socket.on('disconnect',()=>{
        console.log(`user ${socket.id} left the chat`);
        
    })
})

// app.get('/',(req,res)=>{
    // res.sendFile(join(__dirname, 'index.html'));
// })

server.listen(3000, ()=>{ //server.listen initializes both the HTTP and WebSocket servers properly while app.listen only start the Express server.
    console.log('listing on http://localhost:3000');
    
})


