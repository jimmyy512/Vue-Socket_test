<template>
    <div id="ShowTable">
        <ex-table
            class="tableStyle"
            :_titleData="titleData"
            :_tableData="tableData"
            :_footerData="footerData"
            :_DateLabelColor="'white'"
            @TableClickHandle="tableClickHandle">

        </ex-table>
    </div>
</template>

<script>
import exTable from "@/components/exTable";
export default {
    components:{
        exTable,
    },
    data(){
        return{
            titleData:[
                {
                    prop:'date',
                    label:'時間',
                    sortable:true,
                },
                {
                    prop:'name',
                    label:'姓名',
                    clickHandle:true,
                },
                {
                    prop:'province',
                    label:'市區',
                },
                {
                    prop:'city',
                    label:'城市',
                },
                {
                    prop:'address',
                    label:'地址',
                },
                {
                    prop:'zip',
                    label:'郵編',
                    sortable:true,
                },
            ],
            tableData: [{
                date: '2016-05-03',
                name: '郭靖',
                province: '襄陽',
                city: '中國',
                address: '上海市普陀区金沙江路 1520 弄',
                zip: 200338,
            }, {
                date: '2016-05-02',
                name: '楊過',
                province: '絕情谷',
                city: '中國',
                address: '上海市普陀区金沙江路 1532 弄',
                zip: 200334
            }, {
                date: '2016-05-04',
                name: '小龍女',
                province: '絕情谷底',
                city: '台灣',
                address: '上海市普陀区金沙江路 1123 弄',
                zip: 200335
            }, {
                date: '2016-05-01',
                name: '令狐水中',
                province: '華山派',
                city: '香港',
                address: '上海市普陀区金沙江路 123 弄',
                zip: 200336
            }],
            footerData:[
            [{
                date: '當前頁面',
                name: '---',
                province: '---',
                city: '---',
                address: '---',
                zip: 9487
            }],
            [{
                date: '總頁面',
                name: '---',
                province: '---',
                city: '---',
                address: '---',
                zip: 94879487
            }],
            ]
        }
    },
    beforeCreate(){
        document.getElementsByTagName("body")[0].className="ShowTableBackGround";
    },
    beforeDestroy(){
        document.getElementsByTagName("body")[0].classList.remove("ShowTableBackGround");
    },
    methods:{
        tableClickHandle(index,row,originIndex)
        {
            console.log("ShowTable",index,row,originIndex);
        }
    }
}
</script>

<style lang="scss">
.ShowTableBackGround
{
  background:#000 url("../../assets/image/BG2.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<style lang="scss" lang="scss">
#ShowTable{
    padding:30px;
    .tableStyle{
        margin-top:20px;
    }
}
</style>


