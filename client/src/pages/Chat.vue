<template>
    <div id="Chat">
        <div class="title clearf">
            <div class="logoBlock">
                <img class="chatLogo" src="assets/image/ChatLogo.jpg">
            </div>
            <div class="ChatInfoBlock">
                <div class="topBlock">
                    <div class="text">
                        莊鈞于政虹彩家號嘉良個泰偉柏(佑)益
                    </div>
                </div>
                <div class="bottomBlock">
                    <div  @click="showUserList=true">
                    <svg-icon icon-class="user" class="userIcon"/>

                    <div class='userNum'>
                        {{userList.length}}
                    </div>
                    </div>
                    <!-- <svg-icon icon-class="note" class="noteIcon" />
                    <svg-icon icon-class="search" class="searchIcon" /> -->
                </div>
            </div>
        </div>

        <div class="chatView clearf" ref="chatView">
            <div class="chatContent clearf">
                <div class="chatBlock clearf" v-for="(it,index) in chatList" :key="index">
                    <template v-if="it.isServerTalk==true">
                        <div class="ServerTalk">
                            {{it.text}}
                        </div>
                    </template>

                    <template v-else>
                        <template v-if="it.isMe==true">
                            <div class="stickerRight">
                                <svg-icon icon-class="user" class="UserIcon"></svg-icon>
                            </div>
                            <div class="talkBlockRight">
                                <div class="userName">
                                    {{it.user}}
                                </div>
                                <div class="TextBlock">
                                    {{it.text}}
                                    <div class="talkTimeRight">
                                        {{it.sendTime}}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="sticker">
                                <svg-icon icon-class="user" class="UserIcon"></svg-icon>
                            </div>
                            <div class="talkBlock">
                                <div class="userName">
                                    {{it.user}}
                                </div>
                                <div class="TextBlock">
                                    {{it.text}}
                                    <div class="talkTime">
                                        {{it.sendTime}}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>

        <div class="textArea">
            <div class="topBlock">
                <svg-icon icon-class="emoji" class="emojiIcon" />
            </div>
            <div class="bottomBlock clearf">
                <el-input class="textInput" v-model="textInput" placeholder="Send Message...">
                </el-input>

                <span @click="sendMessage()">
                    <svg-icon icon-class="send" class="sendIcon" />
                </span>
            </div>
        </div>

        <el-dialog
        title="輸入聊天室名字"
        :visible.sync="inputNameDialog"
        width="80%"
        :before-close="handleClose"
        center>
        <el-input v-model="userName" placeholder="請輸入..."></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitNameClick()">
                确 定
            </el-button>
        </span>
        </el-dialog>
        
        <el-dialog
            title="聊天室成員"
            :visible.sync="showUserList"
            width="80%"
            :before-close="handleClose"
            center>
            <div v-for="(it,index) in userList" :key="index" style="text-align:center;">
                {{it.userName}}
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showUserList=false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import utils from "src/lib/utils";
export default {
    data(){
        return{
            textInput:null,
            userName:null,
            chatList:[],
            randId:utils.makeId(),
            inputNameDialog:true,
            originHtmlTitleName:document.title,
            showUserList:false,
            userList:[],
        }
    },
    created(){
        window.addEventListener('visibilitychange',this.visibilityChangeFunc);
    },
    destroyed(){
        window.removeEventListener('visibilitychange', this.visibilityChangeFunc);
        document.onkeydown = null;
    },
    watch:{
        userName(){
            this.userName=this.userName.replace(/<[^>]+>/ig,'');
        }
    },
    mounted(){
        this.readyInit();
    },
    sockets: {
      connect: ()=> {
        console.log('socket connected')
        if(this.userName!=null)
            this.$socket.emit('reConnect',userName);
      },
      init(data){
        this.chatList=data;
        this.scrollBottom();
      },
      someOnePostMessage(data){
        data["isMe"]=false;
        this.chatList.push(data);
        //當在使用其他視窗時 通知新訊息
        console.log(document.hidden);
        if(document.hidden)
            document.title=this.originHtmlTitleName+" *新訊息*";
        this.scrollBottom();
      },
      SuccessSendMessage(data){
        data["isMe"]=true;
        this.chatList.push(data);
        this.scrollBottom();
      },
      serverTalk(data)
      {
        let tmpObj={
            "isServerTalk":true,
            "text":data
        }
        this.chatList.push(tmpObj);
        this.scrollBottom();
      },
      onlinePeople(data){
        this.userList=data;
      },
    },
    watch:{
        textInput()
        {
            if(this.textInput==null)
                return;
            this.textInput=this.textInput.replace(/<[^>]+>/ig,'');
        }
    },
    methods:{
        visibilityChangeFunc(){
            if (!document.hidden) {
                // 切換螢幕回來時
                document.title=this.originHtmlTitleName;
            }
        },
        handleClose(done) {
            return;
        },
        readyInit(){
            this.$socket.emit('readyInit');
        },
        sendMessage(){
            if(this.userName=="" || this.userName==null)
            {
                this.$message({
                    message: '于政鴻 你以為這種漏洞我會沒想到嗎?',
                    type: 'warning'
                });
                return;
            }
            if(this.textInput=="" || this.textInput==null)
            {
                this.$message({
                    message: '聊天內容為空,請再次確認!',
                    type: 'warning'
                });
                return;
            }
            let obj={};
            obj['user']=this.userName;
            obj['text']=this.textInput;
            this.$socket.emit('sendMessage', obj);
            this.textInput=null;
        },
        scrollBottom(){
            this.$nextTick(() => {
                this.$refs.chatView.scrollTo(0,99999);
            });
        },
        submitNameClick(){
            if(this.userName=="" || this.userName==null)
            {
                this.$message({
                    message: '名字輸入為空,請再次確認!',
                    type: 'warning'
                });
                return;
            }
            this.$socket.emit('createUser',this.userName);
            this.inputNameDialog = false;
            document.onkeydown=
            (e)=>{
                if(window.event.keyCode==13)
                {
                    this.sendMessage();
                }
            }
        }
    }
}
</script>

<style lang="scss">
#Chat{
    .el-dialog
    {
        max-width: 350px;
    }
    .el-dialog__headerbtn{
        display:none;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(102, 210, 254, 0.68);
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(102, 210, 254, 0.1);
    }

    min-width: 250px;
    height:100%;
    .title{
        width:100%;
        height:100px;
        background-color:#464e66;
        padding:20px;
        .logoBlock
        {
            width:80px;
            float:left;
            .chatLogo{
                border-radius: 50%;
                border: 5px solid #fff;
                width: 60px;
            }
        }
        .ChatInfoBlock{
            float:left;
            width:calc(100% - 80px);
            height:100%;
            .topBlock{
                width:100%;
                height:50%;
                .text{
                    color:white;
                    font-weight: bolder;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space : nowrap;
                    letter-spacing: 1px;
                    line-height:30px;
                }
            }
            .bottomBlock{
                width:100%;
                height:50%;
                padding:5px 0px 5px 0px;
                $textColor:#92a8ce;
                .userIcon,
                .noteIcon,
                .searchIcon{
                    float:left;
                    color: $textColor;
                    width: 20px;
                    height: 20px;
                }
                .noteIcon{
                    margin-right:8px;
                }
                .searchIcon{
                    width:16px;
                    height:16px;
                    margin-top: 2px;
                }
                .userNum{
                    float:left;
                    color: $textColor;
                    line-height: 20px;
                    font-weight:bold;
                    margin-right:8px;
                }
            }
        }
    }
    
    .chatView{
        overflow: auto;
        width:100%;
        height:calc(100% - 180px);
        background:#000 url("../../assets/image/chatBG.jpeg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        .chatContent{
            .chatBlock{
                padding:10px;
                %stickerCommon{
                    width:50px;
                    height:50px;
                    background-color:#f5f7fa;
                    float:left;
                    border-radius:50%;
                    .UserIcon{
                        color:gray;
                        width:80%;
                        height:80%;
                        margin: 7px auto;
                        display: block;
                    }
                }
                .ServerTalk{
                    background-color: rgba(128, 128, 128, 0.32);
                    width: 80%;
                    text-align: center;
                    margin: 0 auto;
                    padding: 5px;
                    font-weight: bold;
                    border-radius: 20px;
                }
                .sticker{
                    @extend %stickerCommon;
                }
                .stickerRight{
                    @extend %stickerCommon;
                    float:right;
                }
                %talkBlockCommon{
                    float:left;
                    height:100%;
                    max-width: calc(100% - 100px);
                    .userName{
                        height: 25px;
                        line-height: 25px;
                    }
                    .TextBlock{
                        word-break: break-all;
                        border-radius:0px 10px 10px 10px;
                        padding:10px;
                        background: rgba(0, 0, 0, 0.1);
                        position:relative;
                        .talkTime{
                            position: absolute;
                            bottom:0;
                            right:-40px;
                        }
                        .talkTimeRight{
                            position: absolute;
                            bottom:0;
                            left:-40px;
                        }
                    }
                }
                .talkBlock{
                    @extend %talkBlockCommon;
                    margin-left:10px;
                }
                .talkBlockRight{
                    @extend %talkBlockCommon;
                    margin-right:10px;
                    float:right;
                    .userName{
                        text-align: right;
                    }
                    .TextBlock{
                        border-radius:10px 0px 10px 10px;
                        text-align: right;
                    }
                }
            }
        }
    }

    .textArea{
        .topBlock{
            width:100%;
            height:40px;
            background-color:#f6f6f6;
            border-top:#e6e6e6 2px solid;
            box-shadow: 0px 2px 1px #c3c2c2;
            padding:5px;
            .emojiIcon{
                width: 30px;
                height: 30px;
                color:#a5a1a1;
            }
        }
        .bottomBlock{
            width:100%;
            height:40px;
            .textInput{
                float:left;
                width: calc(100% - 45px);
            }
            .sendIcon{
                color:#459ce6;
                margin-left:5px;
                margin-right:5px;
                float:left;
                width: 35px;
                height:35px;
            }
        }
    }
}
</style>

