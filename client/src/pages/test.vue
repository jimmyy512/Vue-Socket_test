<template>
    <div id="test">
        <div v-for="(it,index) in num" :key='index'>
            {{fuck+"正宏"}}
        </div>
        <button @click="buttonClick()">{{buttonName}}</button>
    </div>


</template>

<script>
export default {
    data(){
        return{
            fuck:"123",
            num:10,
            buttonName:"點我啊"
        }
    },
    methods:{
        buttonClick(){
            this.num=100;
            this.buttonName="點三小 幹"
        }
    }
}
</script>

<style>

</style>


