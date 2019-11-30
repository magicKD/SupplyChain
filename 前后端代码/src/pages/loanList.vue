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
                      <el-form-item label="贷款账号">
                        <span>{{ props.row.claimerAddr }}</span>
                      </el-form-item>
                      <el-form-item label="贷款金额">
                        <span>{{ props.row.principleAmount }}</span>
                      </el-form-item>
                      <el-form-item label="贷款利息">
                        <span>{{ props.row.interestAmount }}</span>
                      </el-form-item>
                      <el-form-item label="已付金额">
                        <span>{{ props.row.paidAmount }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="贷款账号"
                  property="claimerAddr">
                </el-table-column>
                <el-table-column
                  label="贷款金额"
                  property="principleAmount">
                </el-table-column>
                <el-table-column
                  label="贷款利息"
                  property="interestAmount">
                </el-table-column>
                <el-table-column
                  label="已付金额"
                  property="paidAmount">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">更新</el-button>
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
            <el-dialog title="更新信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="贷款账号" label-width="100px">
                        <el-input v-model="selectTable.claimerAddr" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="贷款金额" label-width="100px">
                        <el-input v-model="selectTable.principleAmount" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="贷款利息" label-width="100px">
                        <el-input v-model="selectTable.interestAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="已付金额" label-width="100px">
                        <el-input v-model="selectTable.paidAmount"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateLoan">确 定</el-button>
              </div>
            </el-dialog>
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
                currentIndex: 0,
            }
        },
        activated(){
            this.getAllLoanInfos();
        },
        mounted(){
            this.getAllLoanInfos();
        },
    	components: {
    		headTop,
    	},
        methods: {
            getAllLoanInfos : function(){
                this.$http.get("/loan/getAllLoanInfos").then(
                    response => {
                        this.tableData = response.body.reverse();
                    }
                )
            },
            handleDelete: function(index, row) {
                this.currentIndex = index;
                console.log(index, row);
                this.$http.post("/data/deleteCompany", {id:index}).then(
                    response => {
                        this.$message({
                            type: "success",
                            messgae: "注销公司成功",
                        });
                        this.tableData.splice(index, 1);
                        this.dialogFormVisible = false;
                    }, 
                    response => {
                        this.$message.error("注销失败");
                        this.dialogFormVisible = false;
                    }
                );
            },
            updateLoan: function(){
                var LoanInfo = {
                    index : this.currentIndex,
                    interestAmount : this.selectTable.interestAmount,
                    paidAmount: this.selectTable.paidAmount
                };
                this.$http.post("/loan/updateLoanInfo", {
                    LoanInfo: LoanInfo
                }).then(
                    response => {
                        this.$message({
                            type: "success",
                            message: "更新信息成功",
                        });
                        this.dialogFormVisible = false;
                    }, 
                    response => {
                        this.$message.error("更新信息失败");
                        this.dialogFormVisible = false;
                    }
                );
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
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
