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
                    <svg-icon icon-class="user" class="userIcon" />
                    <div class='userNum'>6</div>
                    <svg-icon icon-class="note" class="noteIcon" />
                    <svg-icon icon-class="search" class="searchIcon" />
                </div>
            </div>
        </div>
        <div class="content">

        </div>
        <div class="textArea">
            <div class="topBlock">
                <svg-icon icon-class="emoji" class="emojiIcon" />
            </div>
            <div class="bottomBlock">
                <textarea class="textArea"
                    v-model="textInput">

                </textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            textInput:null,
        }
    },
    watch:{
        textInput()
        {
            this.textInput=this.textInput.replace(/<[^>]+>/ig,'');
        }
    }
}
</script>

<style lang="scss">
#Chat{
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
    
    .content{
        width:100%;
        height:calc(100% - 240px);
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
            height:100px;
            .textArea{
                resize : none;
                width: 100%;
                height:100%;
                border: 0px;
            }
        }
    }
}
</style>

