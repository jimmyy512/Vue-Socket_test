<template>
  <div class="hello">
    <div class="main">
      <el-row>
        <el-col :span="24">
          <input type="text" v-model="inputValue">
          <button @click="clickButton">發送</button>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      inputValue:null,
    }
  },
  created(){
  },
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      postMessage: function (data) {
          console.log("getMessage",data);
      }
  },
  methods: {
      clickButton: function () {
        this.$socket.emit('emit_method', "123")
      }
  }
}
</script>

<style lang="scss">
.HelloBackGround
{
  background:#000 url("../../assets/image/BG.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<style lang="scss" scoped>

</style>
