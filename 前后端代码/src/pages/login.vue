<template>
	
  	<div class="login_page fillcontain">
		  <!-- <el-button>hi</el-button> -->
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>SupplyChain管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item prop="email" v-show="isRegister">
						<el-input v-model="loginForm.email" placeholder="邮箱"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="phone" v-show="isRegister">
						<el-input v-model="loginForm.phone" placeholder="电话"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item v-show="isLogin">
				    	<el-button type="primary" @click="signin" class="submit_btn">登陆</el-button>
				  	</el-form-item>
					<el-form-item v-show="isLogin">
				    	<el-button type="primary" @click="turn" class="submit_btn">注册</el-button>
				  	</el-form-item>
					<el-form-item v-show="isRegister">
				    	<el-button type="primary" @click="signup" class="submit_btn">确定</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，请先注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	// import {login, getAdminInfo} from '@/api/getData'
	// import {mapActions, mapState} from 'vuex'

	export default {
		name: "login",
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
					email: '',
					phone: '',
				},
				isRegister : false,
				isLogin : true,
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
		},
		methods: {
			signin: function(){
				this.isLogin = true;
				this.isRegister = false;
				var obj = {
					username:this.loginForm.username,
					password:this.loginForm.password
				};
				console.log(obj);
				var _this = this;
				this.$http.post("/admin/signin", {
					userInfo: obj
				}).then(response => {
					this.$message({message:"登录成功", type:"success"});
					this.$router.push("manage");
				}, response => {
					this.$message.error("用户名或密码不正确")
				});
				// this.$http.get("/test").then(
				// 	response => {
				// 		this.$router.push("manage");
				// 	}
				// );
			},
			turn: function(){
				this.isRegister = true;
				this.isLogin = false;
			},
			signup: function(){
				//检查有没有问题
				var obj = {
					username:this.loginForm.username,
					password:this.loginForm.password,
					email:this.loginForm.email,
					phone:this.loginForm.phone
				};
				this.$http.post("/admin/register", {
					userInfo:obj
				}).then(response => {
					this.isLogin = true;
					this.isRegister = false;
				}, response => {
					this.$message.error("注册失败");
				});
			},
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
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		width: 320px;
		// .wh(320px, 210px);
		.ctph(320px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
