<template>
    <div id="exTable">
         <el-row>
            <el-col :span="24" align="left">
                <span :style="`color:${_DateLabelColor};`">
                    {{_DateLabel}}
                </span>
                <el-date-picker
                    v-model="dateRange" type="daterange" align="right" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <el-button-group>
                    <el-button type="success" @click="pickDate(0)" plain>今日</el-button>
                    <el-button type="success" @click="pickDateLastDay" plain>昨日</el-button>
                    <el-button type="success" @click="pickDate(new Date().getDate()-1)" plain>当月</el-button>
                    <el-button type="success" @click="pickDateLastMonth" plain>前月</el-button>
                    <el-button type="success" @click="pickDate(2)" plain>近三日</el-button>
                    <el-button type="success" @click="pickDate(6)" plain>近七日</el-button>
                    <el-button type="success" @click="pickDate(29)" plain>近三十日</el-button>
                </el-button-group>
            </el-col>
        </el-row>

        <slot name='InputBlock'>
            
        </slot>

         <el-row style="margin-top:20px;margin-bottom:15px;">
            <el-col :span="24" align="right">
                <el-button style="margin-right:20px;" type="primary" icon="el-icon-search" @click="searchClick()">
                  {{_SearchLabel}}
                </el-button>
            </el-col>
        </el-row>

        <el-pagination v-if="_pageTotal!=-1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.current"
            :page-sizes="[20, 50, 100, 200, 400, 800]"
            :page-size="pager.pageSize"
            layout="slot, sizes, prev, pager, next, jumper"
            :total="pager.total" style="float:right">
            <span>目前显示第 {{ 1 + (pager.current - 1) * pager.pageSize | NumFormat }} 到第 {{ pager.current * pager.pageSize | NumFormat }} 项纪录，共 {{ pager.total | NumFormat }} 项</span>
        </el-pagination>

        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :summary-method="getSummaries" :show-summary="isShowSum">
            <el-table-column v-for="(it,index) in _titleData" :key='index'
                align="center"
                :prop="it.prop"
                :label="it.label"
                :width="typeof it.width!='undefined'?it.width:''"
                :sortable="typeof it.sortable!='undefined'?it.sortable:false">
                    <template slot-scope="scope">
                        <el-button v-if="typeof it.clickHandle!='undefined'?it.clickHandle:false"
                        @click.native.prevent="tableDataClickHandle(scope.$index,scope.row)"
                        type="text"
                        size="small">
                            {{scope['row'][it.prop]}}
                        </el-button>
                        <span v-else>
                            {{scope['row'][it.prop]}}
                        </span>
                    </template>
            </el-table-column>
        </el-table>

        <el-table
            v-if="_footerData.length!=0"
            class="footerTable"
            v-for="(it,index) in _footerData"
            :key='index'
            :data="it"
            style="width: 100%"
            border>
            <el-table-column v-for="(it,index) in _titleData" :key='index'
                align="center"
                :prop="it.prop"
                :label="it.label"
                :width="typeof it.width!='undefined'?it.width:''"
                :sortable="typeof it.sortable!='undefined'?it.sortable:false">
            </el-table-column>
        </el-table>

        <el-pagination  v-if="_pageTotal!=-1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.current"
            :page-sizes="[20, 50, 100, 200, 400, 800]"
            :page-size="pager.pageSize"
            layout="slot, sizes, prev, pager, next, jumper"
            :total="pager.total" style="float:right">
            <span>目前显示第 {{ 1 + (pager.current - 1) * pager.pageSize | NumFormat }} 到第 {{ pager.current * pager.pageSize | NumFormat }} 项纪录，共 {{ pager.total | NumFormat }} 项</span>
        </el-pagination>
    </div>
</template>


<script>
//事件列表
/** 
 * @name TimeSelecHandle
 * 回傳頁面選擇的時間範圍  
 * @return  {Array} timeRange  
 * timeRange[0]:toTime 
 * timeRange[1]:fromTime
*/
/** 
 * @name PagerHandle
 * 回傳頁面狀態
 * @return  {Number,Number} curPage  pageSize
 * curPage:當前選擇第幾頁 
 * pageSize:一頁顯示幾筆
*/
/** 
 * @name SearchHandle
 * 當點擊"查找"按鈕的回調
*/
/** 
 * @name TableClickHandle
 * Table內容點擊回調事件
 * @return  {Number,Object,Number} curIndex  rowData originIndex
 * curIndex:選中的row Index,依據排序後的Index 
 * rowData :選中的row 所有資料
 * originIndex:選中的row Index,依據'未排序前'的Index
*/
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

        /** table底部Row欄位，此欄位資料不會被排序。
            footerData:[
                [{
                    date: '當前頁面',
                    name: '---',
                    province: '---',
                    city: '---',
                    address: '---',
                    zip: 9487
                }],
            ]
        */
        _footerData:{
            type:Array,
            default:[],
        },

        /** 幫table欄位內容做加總
           _SumData:
            [{
                title:"本页总结",
                prop:["bet_count","order_money","win_lose","bonus","back_lottery"],
            },]
        */
        _SumData:{
            type:Object,
            default:()=>{ return {} }
        },

        //*傳入資料總筆數,不傳入的話不會顯示頁面選項
        _pageTotal:{
            type:Number,
            default:-1
        },

        //*傳入一頁顯示幾筆,不傳入的話預設為20筆
        _pageSize:{
            type:Number,
            default:20,
        },

        //*選擇日期組件前面的Label
        _DateLabel:{
            type:String,
            default:'时间范围: '  
        },
        
        //*選擇日期組件前面的Label顏色
        _DateLabelColor:{
            type:String,
            default:'black'
        },

        //*搜寻按鈕上的文字
        _SearchLabel:{
            type:String,
            default:'搜寻'  
        },

    },
    data(){
        return{
            tableData:this._tableData,
            isShowSum:false,
            dateRange:null,
            wjorderId:"",
            pager: {
                pageSize: this._pageSize,
                current: 1,
                total: 0
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: "今日",
                        onClick(picker) {
                            picker.$emit("pick", [new Date(), new Date()]);
                        }
                    },
                    {
                        text: "昨日",
                        onClick(picker) {
                            var d = new Date().getTime() - 86400 * 1000;
                            picker.$emit("pick", [d, d]);
                        }
                    },
                    {
                        text: "当月",
                        onClick(picker) {
                            picker.$emit("pick", [new Date().setDate(1), new Date()]);
                        }
                    },
                    {
                        text: "前月",
                        onClick(picker) {
                        var now = new Date();
                        var last = new Date(now.getTime() - 86400 * 1000 * now.getDate());
                            picker.$emit("pick", [new Date(last).setDate(1), last]);
                        }
                    },
                    {
                        text: "近三日",
                        onClick(picker) {
                            picker.$emit("pick", [
                                new Date().getTime() - 86400 * 1000 * 2,
                                new Date()
                            ]);
                        }
                    },
                    {
                        text: "近七日",
                        onClick(picker) {
                        picker.$emit("pick", [
                            new Date().getTime() - 86400 * 1000 * 6,
                            new Date()
                        ]);
                        }
                    },
                    {
                        text: "近三十月",
                        onClick(picker) {
                        picker.$emit("pick", [
                            new Date().getTime() - 86400 * 1000 * 29,
                            new Date()
                        ]);
                        }
                    }
                ]
            },
        }
    },
    watch:{
        dateRange(dateRange){
            this.$emit("TimeSelecHandle",this.dateRange);
        },
        _SumData(){
            this.isShowSumJudge();
        },
        _pageTotal(){
            this.pagerJudge();
        },
        _tableData()
        {
           this.tableDataAddOriginRowIndex();
        }
    },
    created(){
        this.isShowSumJudge();
        this.pagerJudge();
        this.tableDataAddOriginRowIndex();
    },
    filters: {
        NumFormat: function(val) {
            return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
        }
    },
    methods:{
        tableDataAddOriginRowIndex(){
            if(typeof this._tableData[0]['__OriginRowIndex']!='undefined')
            {
                throw "_tableData '__OriginRowIndex' is Key Word,please change Name."
                return;
            }
            this.tableData=this._tableData;
            for(let i=0;i<this.tableData.length;i++)
                this.tableData[i]['__OriginRowIndex']=i;
        },
        tableDataClickHandle(index,rowData)
        {
             this.$emit("TableClickHandle",index,rowData,rowData.__OriginRowIndex);
        },
        searchClick(){
            this.$emit("SearchHandle");
        },
        pagerJudge(){
            if(this._pageTotal==0)
                return;
            this.pager.total=this._pageTotal;
        },
        isShowSumJudge(){
            if(Object.keys(this._SumData).length==0)
                this.isShowSum=false;
            else
                this.isShowSum=true;
        },
        pickDate(last) {
            this.dateRange = [
                new Date().getTime() - 86400 * 1000 * last,
                new Date()
            ];
            this.$emit("TimeSelecHandle",this.dateRange);
        },
        pickDateLastDay() {
            var d = new Date().getTime() - 86400 * 1000;
            this.dateRange = [d, d];
            this.$emit("TimeSelecHandle",this.dateRange);
        },
        pickDateLastMonth() {
            var now = new Date();
            var last = new Date(now.getTime() - 86400 * 1000 * now.getDate());
            this.dateRange = [new Date(last).setDate(1), last];
            this.$emit("TimeSelecHandle",this.dateRange);
        },
        getSummaries(param) {
            if(Object.keys(this._SumData).length==0)
                return;
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                let prop=column.property;
                if(this._titleData[0]['prop']==prop)
                {
                    sums[index] = this._SumData['title'];
                }
                if(this._SumData.prop.indexOf(prop)!=-1)
                {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) return prev + curr;
                            else return prev;
                        }, 0);
                        sums[index] = sums[index].toFixed(3);
                    }
                }
            });
            return sums;
        },
        handleSizeChange(val) {
            this.pager.pageSize = val;
            this.$emit("PagerHandle",this.pager.current,this.pager.pageSize);
        },
        handleCurrentChange(val) {
            this.pager.current = val;
            this.$emit("PagerHandle",this.pager.current,this.pager.pageSize);
        }
    }
}
</script>


<style lang="scss">
#exTable
{
    .el-button-group{
        margin-top:-2.5px;
    }
    .footerTable
    {
        .el-table__header-wrapper
        {
            display: none;
        }
        .el-table__row
        {
            background-color: #f5f7fa;
        }
    }
}
</style>

