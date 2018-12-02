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

                </div>
            </div>
        </div>
        <div class="content">

        </div>
        <div class="textArea">
            
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
#Chat{
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
            }
        }
    }
}
</style>

