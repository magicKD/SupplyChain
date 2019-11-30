<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="收款账号" prop="address">
						<el-input v-model="formData.address"></el-input>
					</el-form-item>
					<el-form-item label="付款时间">
						  <div class="block">
							<el-date-picker
							v-model="value2"
							align="right"
							type="date"
							placeholder="选择日期"
							:picker-options="pickerOptions">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="具体时间" prop="dueTime">
						<el-input v-model="formData.dueTime">
						</el-input>
					</el-form-item>
					<el-form-item label="金额" prop="amount">
						<el-input v-model.number="formData.amount" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input v-model="formData.remark"></el-input>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="createPayment">立即创建</el-button>
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
					address: '', //公司名称
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
					dueTime: [
						{ required: true, message: '请输入付款时间', trigger: 'blur' }
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
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 3600 * 1000 * 24;
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
						picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24);
						picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', date);
						}
					}]
				},
				value1: '',
				value2: '',
    		}
    	},
    	components: {
    		headTop,
		},

    	mounted(){
    		// this.initData();
    	},
    	methods: {
			createPayment:function(){
				var obj = {
					address: this.formData.address,
					dueTime: this.formData.dueTime,
					amount	 : this.formData.amount,
				};
				// console.log(obj);
				this.$http.post("/finance/createPaymentSchedule", {
					paymentInfo : obj
				}).then(response => {
					this.$message({message:"创建成功", type:"success"});
				}, response => {
					this.$message.error("创建失败,额度不足")
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
