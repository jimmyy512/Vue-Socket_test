const express=require('express');
const path=require('path');
const app=express();

const server=require('http').Server(app);
const io=require('socket.io')(server);

// 修改這一部分
app.get('/', (req, res) => {
    // let resolvePath=path.resolve("./client/index.html");
    // res.sendFile(resolvePath);
});

io.on('connection',(socket)=>{
    console.log("Hello!");
    socket.on('emit_method',(data)=>{
        console.log("get postMessage",data);
        io.emit('postMessage',data);
        io.border
    })




    socket.on('disconnect',()=>{
        console.log("Bye~");
    });
})

server.listen(3000,()=>{
    console.log("server start");
});