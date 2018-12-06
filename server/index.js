const express=require('express');
const path=require('path');
const app=express();

const server=require('http').Server(app);
const io=require('socket.io')(server);

var chatList=[];
// 修改這一部分
app.get('/', (req, res) => {
    // let resolvePath=path.resolve("./client/index.html");
    // res.sendFile(resolvePath);
});

io.on('connection',(socket)=>{
    console.log(socket.id+" is connect.");

    socket.on('readyInit',(data)=>{
        socket.emit('init',chatList);
    })

    socket.on('sendMessage',(data)=>{
        let local;
        local=new Date();
        let hour = local.getHours().toString();
        let min = local.getMinutes().toString();
        let localTime =`${hour}:${min}`;
        data['sendTime']=localTime;
        chatList.push(data);
        io.emit('someOnePostMessage',data);
    })

    socket.on('disconnect',()=>{
        console.log("Bye~");
    });
})

server.listen(8787,()=>{
    console.log("server start");
});