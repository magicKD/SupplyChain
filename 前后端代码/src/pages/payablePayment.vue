<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="收款账号">
                        <span>{{ props.row.owner }}</span>
                      </el-form-item>
                      <el-form-item label="应还时间">
                        <span>{{ props.row.dueTime }}</span>
                      </el-form-item>
                      <el-form-item label="金额">
                        <span>{{ props.row.amount }}</span>
                      </el-form-item>
                      <el-form-item label="账款ID">
                        <span>{{ props.row.paymentID }}</span>
                      </el-form-item>
                      <el-form-item label="付款账号">
                        <span>{{ props.row.payerAddr }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="收款账号"
                  property="owner">
                </el-table-column>
                <el-table-column
                  label="账款ID"
                  property="paymentID">
                </el-table-column>
                <el-table-column
                  label="金额"
                  property="amount">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="payForPayment(scope.$index, scope.row)">还款</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">打回</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {baseUrl, baseImgPath} from '@/config/env'
    // import {cityGuess, getResturants, getResturantsCount, foodCategory, updateResturant, searchplace, deleteResturant} from '@/api/getData'
    export default {
        data(){
            return {
                // baseUrl,
                // baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: null,
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        activated(){
            this.getAllPaymentRequests();
        },
        mounted(){
            this.getAllPaymentRequests();
        },
    	components: {
    		headTop,
    	},
        methods: {
            getAllPaymentRequests : function(){
                this.$http.get("/finance/getAllPaymentRequests").then(
                    response => {
                        this.tableData = response.body.reverse();
                    }
                )
            },
            payForPayment: function(index, row) {
                console.log(index, row);
                var obj = {
                    "toAddress" : row.owner,
                    "paymentID" : row.paymentID,
                    "amount"    : row.amount
                };
                this.$http.post("/finance/payForPaymentSchedule", {
                    paymentInfo:obj
                    }).then(
                    response => {
                        this.$message({
                            type: "success",
                            message: "还款成功",
                        });
                        // this.tableData.splice(index, 1);
                        this.handleDelete(index, row);
                    }, 
                    response => {
                        this.$message.error("还款失败")
                    }
                );
            },
            handleDelete: function(index, row) {
                console.log(index, row);
                this.$http.post("/finance/deletePaymentRequest", {index:index}).then(
                    response => {
                        this.$message({
                            type: "success",
                            message: "打回成功",
                        });
                        this.tableData.splice(index, 1);
                    }, 
                    response => {
                        this.$message.error("打回失败")
                    }
                );
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
