<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="资产名称" prop="assetName">
						<el-input v-model="formData.assetName"></el-input>
					</el-form-item>
					<el-form-item label="所有者账号" prop="owner">
						<el-input v-model="formData.owner"></el-input>
					</el-form-item>
					<el-form-item label="价值" prop="value">
						<el-input v-model="formData.value">
						</el-input>
					</el-form-item>
					

					<el-form-item label="资产类型">
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
					assetName: '', //公司名称
					value: '', //地址
					amount: '',
					owner: '',
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
					assetName: [
						{ required: true, message: '请输入资产名称', trigger: 'blur' },
					],
					owner: [
						{ required: true, message: '请输入所有者账号', trigger: 'blur' },
					],
					value: [
						{ required: true, message: '请输入金额' },
						{ type: 'number', message: '金额必须是数字' }
					],
				},
				options: [{
		          	value: '土地资源',
		          	label: '土地资源'
		        }, {
		          	value: '器械实物',
		          	label: '器械实物'
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
					assetName: this.formData.assetName,
					value: this.formData.value,
					owner   : this.formData.owner
				};
				// console.log(obj);
				this.$http.post("/asset/registerAsset", {
					Asset : obj
				}).then(response => {
					this.$message({message:"入池质押成功", type:"success"});
				}, response => {
					this.$message.error("入池质押失败")
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
