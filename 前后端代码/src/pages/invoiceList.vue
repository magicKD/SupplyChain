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
                        <span style="word-break:break-all">{{ props.row.payeeAddr }}</span>
                      </el-form-item>
                      <el-form-item label="付款账号">
                        <span style="word-break:break-all">{{ props.row.payerAddr }}</span>
                      </el-form-item>
                      <el-form-item label="时间戳">
                        <span>{{ props.row.timestamp }}</span>
                      </el-form-item>
                      <el-form-item label="发票 ID">
                        <span>{{ props.row.invoiceID }}</span>
                      </el-form-item>
                      <el-form-item label="备注">
                        <span>{{ props.row.remark }}</span>
                      </el-form-item>
                      <el-form-item label="分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="发票ID"
                  property="invoiceID">
                </el-table-column>
                <el-table-column
                  label="收款账号"
                  property="payeeAddr">
                </el-table-column>
                <el-table-column
                  label="付款账号"
                  property="payerAddr">
                </el-table-column>
                <el-table-column
                  label="金额"
                  property="amount">
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
            <el-dialog title="修改发票信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="收款账号" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-autocomplete
                          v-model="address.address"
                          placeholder="请输入地址"
                          style="width: 100%;"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="发票介绍" label-width="100px">
                        <el-input v-model="selectTable.timestamp"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="发票分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
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
            }
        },
        activated(){
            // this.getAllCompanies();
            this.getAllInvoices();
        },
        mounted(){
            // this.getAllCompanies();
        },
    	components: {
    		headTop,
    	},
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            getAllInvoices: function() {
              this.$http.get("/data/getAllInvoices").then(
                response => {
                  console.log(response.body);
                  this.tableData = response.body.reverse();
                }
              );
            },
            getAllCompanies : function(){
                this.$http.get("/data/getAllCompanies").then(
                    response => {
                        this.tableData = response.body.reverse();
                    }
                )
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
