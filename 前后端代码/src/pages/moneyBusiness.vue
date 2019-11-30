<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="企业账号" prop="toAddress">
						<el-input v-model="formData.toAddress"></el-input>
					</el-form-item>
					<el-form-item label="金额" prop="value">
						<el-input v-model="formData.value">
						</el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input v-model="formData.remark"></el-input>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="deposit" @click="deposit">存款</el-button>
						<el-button type="withdraw" @click="withdraw">取款</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    // import {cityGuess, addcompany, searchplace, foodCategory} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					toAddress: '', //公司名称
					value: '', //地址
					amount: '',
					remark: '',
					promotion_info: '',
					float_delivery_fee: 5, //运费
					float_minimum_order_amount: 20, //起价
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					startTime: '',
       	 			endTime: '',
       	 			image_path: '',
       	 			business_license_image: '',
       	 			catering_service_license_image: '',

		        },
		        rules: {
					toAddress: [
						{ required: true, message: '请输入收款公司账号', trigger: 'blur' },
					],
					value: [
						{ required: true, message: '请输入金额' },
						{ type: 'number', message: '金额必须是数字' }
					],
				},
    		}
    	},
    	components: {
    		headTop,
		},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			deposit:function(){
				var obj = {
					toAddress: this.formData.toAddress,
					value: this.formData.value,
					remark   : this.formData.remark
				};
				// console.log(obj);
				this.$http.post("/bank/depositMoney", {
					tokenInfo : obj
				}).then(response => {
					this.$message({message:"存款成功", type:"success"});
				}, response => {
					this.$message.error("存款失败")
				});
			},

			withdraw:function(){
				var obj = {
					toAddress: this.formData.toAddress,
					value: this.formData.value,
					remark   : this.formData.remark
				};
				// console.log(obj);
				this.$http.post("/bank/withdrawMoney", {
					tokenInfo : obj
				}).then(response => {
					this.$message({message:"取款成功", type:"success"});
				}, response => {
					this.$message.error("取款失败")
				});
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
