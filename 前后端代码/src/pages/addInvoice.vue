<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="收款账号" prop="payeeAddr">
						<el-input v-model="formData.payeeAddr"></el-input>
					</el-form-item>
					<el-form-item label="付款账号" prop="payerAddr">
						<el-input v-model="formData.payerAddr">
						</el-input>
					</el-form-item>
					</el-form-item>
					<el-form-item label="金额" prop="amount">
						<el-input v-model.number="formData.amount" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input v-model="formData.remark"></el-input>
					</el-form-item>

					<el-form-item label="发票分类">
						<el-cascader
						  :options="options"
						  change-on-select
						></el-cascader>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="createInvoice">立即创建</el-button>
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
					payeeAddr: '', //公司名称
					payerAddr: '', //地址
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
					payeeAddr: [
						{ required: true, message: '请输入收款公司账号', trigger: 'blur' },
					],
					payerAddr: [
						{ required: true, message: '请输入付款公司账号', trigger: 'blur' }
					],
					amount: [
						{ required: true, message: '请输入金额' },
						{ type: 'number', message: '金额必须是数字' }
					],
				},
				options: [{
		          	value: '已完全付款',
		          	label: '已完全付款'
		        }, {
		          	value: '到期还款',
		          	label: '到期还款'
		        }, {
		          	value: '应收账款付款',
		          	label: '应收账款付款'
		        }, {
		          	value: '未付款',
		          	label: '未付款'
		        }],
    		}
    	},
    	components: {
    		headTop,
		},

    	mounted(){
    		// this.initData();
    	},
    	methods: {
			createInvoice:function(){
				var obj = {
					payeeAddr: this.formData.payeeAddr,
					payerAddr: this.formData.payerAddr,
					amount	 : this.formData.amount,
					remark   : this.formData.remark
				};
				// console.log(obj);
				this.$http.post("/data/createInvoice", {
					invoiceInfo : obj
				}).then(response => {
					this.$message({message:"发票登记成功", type:"success"});
				}, response => {
					this.$message.error("发票登记失败")
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
