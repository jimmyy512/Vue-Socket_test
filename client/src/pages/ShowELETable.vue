<template>
    <div id="ShowElETable">
        <ele-table
            :_titleData="testTitleData"
            :_tableData="testTableData"
            @EventHandle="testTableEvent">
        </ele-table>
    </div>
</template>

<script>
import eleTable from "@/components/eleTable";
export default {
    components:{
        eleTable,
    },
    data(){
        return{
            //tableTitle
            testTitleData:[{
                prop:'username',
                label:'用戶名',
                title:'名字:',
                sortable:true,
                eleWidth:'150px',
                width:250,
                placeholder:"請輸入用戶名",
                type:"input" 
            },
            {
                prop:'uname',
                label:'用戶簡稱',
                sortable:true,
                eleWidth:'150px',
                width:100,
                type:"default" 
            },
            {
                prop:'group',
                label:'派彩分类',
                eleWidth:'100px',
                type:"select",
                sortable:true,
                options:[{
                    value: '0',
                    label: '官方开彩',
                }, 
                {
                    value: '1',
                    label: '電子开彩',
                },
                {
                    value: '2',
                    label: '视頻开彩',
                }]
            },
            {
                prop:'StopBetInterval',
                label:'停止投注间隔',
                eleWidth:'100px',
                type:"input",
                sortable:true,
            },
            {
                prop:'isOpen',
                label:'开启/关闭',
                eleWidth:'100px',
                type:"switch",
                sortable:true,
            },
            {
                prop:'sort',
                label:'排序',
                eleWidth:'50px',
                type:"input",
                sortable:true,
            },
            {
                prop:'operation',
                label:'操作',
                type:"button",
            }],
            //tableData
            testTableData:[{
                username:"jim",
                uname:"Gti",
                group:"0",
                StopBetInterval:60,
                isOpen:"1",
                sort:1,
                operation:"保存修改",
            },
            {
                username:"Majitoo",
                uname:"Stronger",
                group:"0",
                StopBetInterval:70,
                isOpen:"0",
                sort:3,
                operation:"保存修改",
            },
            {
                username:"Teemo",
                uname:"",
                group:"0",
                StopBetInterval:40,
                isOpen:"1",
                sort:2,
                operation:"保存修改",
            }],
        }
    },
    beforeCreate(){
        document.getElementsByTagName("body")[0].className="ShowElETableBackGround";
    },
    beforeDestroy(){
        document.getElementsByTagName("body")[0].classList.remove("ShowElETableBackGround");
    },
    methods:{
        testTableEvent(rowIndex,columnIndex,originIndex,rowData){
            console.log("testTableEvent",rowIndex,columnIndex,originIndex,rowData);
        },
    }
}
</script>

<style lang="scss">
.ShowElETableBackGround
{
  background:#000 url("../../assets/image/BG2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<style lang="scss" lang="scss">
#ShowElETable{
    padding:30px;
    .tableStyle{
        margin-top:20px;
    }
}
</style>


