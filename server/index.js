const express=require('express');
const path=require('path');
const app=express();

const server=require('http').Server(app);
const io=require('socket.io')(server);

var chatList=[];
var userList=[];

//js extention
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//跨網域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
});

io.on('connection',(socket)=>{
    console.log(socket.id+" is connect.");
    socket.on('readyInit',(data)=>{
        socket.emit('init',chatList);
        io.emit('onlinePeople',userList);
    })

    socket.on('reConnect',(data)=>{
        socket.MyData={"userName":data};
        let userData={
            "userName":data,
        }
        userList.push(userData);
        io.emit('onlinePeople',userList);
    })

    socket.on('createUser',(data)=>{
        socket.MyData={"userName":data};
        let userData={
            "userName":data,
        }
        userList.push(userData);
        io.emit('onlinePeople',userList);
        io.emit('serverTalk',data+"已經加入了聊天室");
    })

    socket.on('sendMessage',(data)=>{
        let local;
        local=new Date();
        let hour = local.getHours().toString();
        let min = local.getMinutes().toString();
        min=min.length==1?"0"+min:min;
        let localTime =`${hour}:${min}`;
        data['sendTime']=localTime;
        chatList.push(data);
        socket.broadcast.emit('someOnePostMessage',data);
        socket.emit('SuccessSendMessage',data);
    })

    socket.on('disconnect',()=>{
        if(typeof socket['MyData']!='undefined')
        {
            for(let i=0;i<userList.length;i++)
            {
                if(socket.MyData.userName==userList[i].userName)
                {
                    userList.splice(i,1);
                    break;
                }
            }
            io.emit('onlinePeople',userList);
            console.log(socket.MyData.userName+" is disconnect");
        }
    });
})

server.listen(8786,()=>{
    console.log("server start");
});