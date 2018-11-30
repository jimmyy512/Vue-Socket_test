<template>
    <div id="exTable">
        <el-table
            class="TableContent"
            :data="tableData"
            border
            style="width: 100%"
            highlight-current-row>
            <el-table-column v-for="(it,index) in _titleData" :key='index'
                align="center"
                :prop="it.prop"
                :label="it.label"
                :width="typeof it.width!='undefined'?it.width:''"
                :sortable="typeof it.sortable!='undefined'?it.sortable:false">
                    <template slot-scope="scope">
                        
                        <span v-if="typeof it.title!='undefined'">
                            {{it.title}}    
                        </span>

                        <el-input v-if="it.type=='input'"
                        :style="`width:${it.eleWidth};`"
                        :placeholder="it.placeholder"
                        v-model="scope['row'][it.prop]"
                        type="text"
                        size="small"
                        @blur="InputOnKeyUp(scope,it)">
                        </el-input>
                        <span v-if="it.type=='input'">
                            {{scope['row'][it.prop]}}
                        </span>

                        <el-select v-if="it.type=='select'"
                            v-model="scope['row'][it.prop]" 
                            :placeholder="it.placeholder"
                            :style="`width:${it.eleWidth};`">
                            <el-option
                            v-for="item in it.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-if="it.type=='select'">
                            {{it['options'][scope['row'][it.prop]]['label']}}
                        </span>

                        <!-- <el-switch  
                        v-if="it.type=='switch'"
                        v-model="eleData[scope.$index][index]"
                        active-color="#13ce66" inactive-color="#ff4949"
                        active-value="1" inactive-value="0">
                        </el-switch> -->
                        <el-switch  
                        v-if="it.type=='switch'"
                        v-model="scope['row'][it.prop]"
                        active-color="#13ce66" inactive-color="#ff4949"
                        active-value="1" inactive-value="0">
                        </el-switch>

                        <el-button type="primary" round
                            v-if="it.type=='button'"
                            @click="EventHandle(scope.$index,index,scope.row)">
                            {{scope['row'][it.prop]}}
                        </el-button>

                        <span v-if="it.type=='default'">
                            {{scope['row'][it.prop]}}
                        </span>

                    </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>

export default {
    props:{
        //table標題定義
        /**
            _titleData:
            [{
                prop:'game_code',
                @description :
                    對應_tableData中的Key,決定資料顯示在哪一個欄位
                label:'彩种代码',
                @description :
                    Title裡面的內容
                sortable:true,  
                @description :
                    如果填true 欄位擁有排序功能,不填則無
                clickHandle:true, 
                @description :
                    如果填true 欄位可監聽TableClickHandle點擊事件,不填則無
            },],
        */
        _titleData:{
            type:Array,
        },
        

        //table內容定義，此欄位資料會被排序。
        /**
           _tableData:
            [{
                game_code: 'cqssc',
                game_name: '重庆时时彩',
                coin: 'CNY'
            },]
        */
        _tableData:{
            type:Array,
        },
    },
    data(){
        return{
            tableData:this._tableData,
            eleData:[],
        }
    },
    created(){
        this.tableDataAddOriginRowIndex();
    },
    watch:{
        _tableData()
        {
            this.tableDataAddOriginRowIndex();
        },
    },
    methods:{
        //過濾html tag 防止惡意程式注入
        InputOnKeyUp(scope,it){
            if(typeof scope['row'][it.prop]!="string")
                return;
            scope['row'][it.prop]=scope['row'][it.prop].replace(/<[^>]+>/ig,'');
        },
        EventHandle(rowIndex,columnIndex,rowData){
            this.$emit("EventHandle",rowIndex,columnIndex,rowData.__OriginRowIndex,rowData);
        },
        tableDataAddOriginRowIndex(){
            if(this._tableData.length==0)
            {
                this.tableData=this._tableData;
                this.tableData=this.tableData.slice();
                return;
            }
            if(typeof this._tableData[0]['__OriginRowIndex']!='undefined')
            {
                throw "_tableData '__OriginRowIndex' is Key Word,please change Name."
                return;
            }
            this.tableData=this._tableData;
            for(let i=0;i<this.tableData.length;i++)
                this.tableData[i]['__OriginRowIndex']=i;
        },
    }
}
</script>


<style lang="scss">
#exTable
{
    .TableContent .el-input,
    .TableContent .el-select{
        display: none;
    }
    .TableContent .current-row .el-input ,
    .TableContent .current-row .el-select {
        display: inline-block;
    }
    .TableContent .current-row .el-input+span,
    .TableContent .current-row .el-select+span {
        display: none;
    }

    .el-table__body tr.current-row>td{
        background-color: rgba(230, 162, 60, 0.45)!important;
    }
   
    .el-table--border
    {
        border-right: 1px solid!important;
        border-bottom: 1px solid!important;
    }
    .el-table--border,
    .el-table td, .el-table th.is-leaf
    {
        border-color:rgb(192, 196, 204) !important;
    }
    .el-table th{
        color: rgba(0, 0, 0, 0.84);
    }
    .el-table tr{
        color: rgba(0, 0, 0, 0.81);
    }
    .TableContent tr{
        background-color: rgb(245, 227, 180)!important;
    }
    .TableContent .el-table__body tr:hover>td{
        background-color: rgba(230, 162, 60, 0.45)!important;
    }
    .el-button-group{
        margin-top:-2.5px;
    }
}
</style>
