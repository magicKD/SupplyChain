<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="address"
                  label="地址"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="userName"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="publicKey"
                  label="公钥">
                </el-table-column>
                <el-table-column
                  property="privateKey"
                  label="私钥">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
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
    // import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: null,
                // tableData: [{
                //   address: '2016-05-02',
                //   userName: '王小虎',
                //   publicKey: '上海市普陀区金沙江路 1518 弄',
                //   test:"guess"
                // }, {
                //   address: '2016-05-04',
                //   userName: '王小虎',
                //   publicKey: '上海市普陀区金沙江路 1517 弄aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                // }, {
                //   address: '2016-05-01',
                //   userName: '王小虎',
                //   publicKey: '上海市普陀区金沙江路 1519 弄'
                // }, {
                //   address: '2016-05-03',
                //   userName: '王小虎',
                //   publicKey: '上海市普陀区金沙江路 1516 弄'
                // }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.getUserInfo();
        },
        methods: {
            getUserInfo : function(){
                let _this = this;
                this.$http.get("/data/localKeyStores").then(
                    response => {
                        console.log(response.body.reverse());
                        this.tableData = response.body.reverse();
                    }
                );
            },
            // async initData(){
            //     try{
            //         const countData = await getUserCount();
            //         if (countData.status == 1) {
            //             this.count = countData.count;
            //         }else{
            //             throw new Error('获取数据失败');
            //         }
            //         this.getUsers();
            //     }catch(err){
            //         console.log('获取数据失败', err);
            //     }
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            // async getUsers(){
            //     const Users = await getUserList({offset: this.offset, limit: this.limit});
            //     this.tableData = [];
            //     Users.forEach(item => {
            //         const tableData = {};
            //         tableData.userName = item.userName;
            //         tableData.address = item.address;
            //         tableData.publicKey = item.publicKey;
            //         this.tableData.push(tableData);
            //     })
            // }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
