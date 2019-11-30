<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
						<el-menu-item index="companyList">公司列表</el-menu-item>
						<el-menu-item index="invoiceList">发票列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addShop">添加公司</el-menu-item>
						<el-menu-item index="addInvoice">添加发票</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>银行业务</template>
						<el-menu-item index="distributeToken">代币分发</el-menu-item>
						<el-menu-item index="moneyBusiness">存款/取款</el-menu-item>
						<el-menu-item index="loanRequestList">贷款请求处理</el-menu-item>
						<el-menu-item index="loanList">贷款列表</el-menu-item>
						<el-menu-item index="assetManagement">入池质押</el-menu-item>
						<el-menu-item index="assetList">资产列表</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-menu"></i>资金管理</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="wallet">现有资产</el-menu-item>
						<el-menu-item index="receivablePayement">应收账款</el-menu-item>
						<el-menu-item index="createPayment">创建应收账款</el-menu-item>
						<el-menu-item index="transferPayment">转移应收账款</el-menu-item>
						<el-menu-item index="payablePayment">应还账款</el-menu-item>
						<el-menu-item index="requestLoan">申请贷款</el-menu-item>
					</el-submenu>

				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		methods:{
			test:function(){
				this.$http.get("/test").then(response => {
					console.log(response.body);
				});
			}
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
 