<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="公司名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="address">
						<el-autocomplete
						  v-model="formData.address"
						  placeholder="请输入地址"
						  style="width: 100%;"
						></el-autocomplete>
					</el-form-item>
					<el-form-item label="联系电话" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="公司简介" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>

					<el-form-item label="公司分类">
						<el-cascader
						  :options="options"
						  change-on-select
						></el-cascader>
					</el-form-item>
					<el-form-item label="公司特点" style="white-space: nowrap;">
						<span>品牌保证</span>
						<el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
						<span>银行认证</span>
						<el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
						<span>新开公司</span>
						<el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
					</el-form-item>
					<el-form-item style="white-space: nowrap;">
						<span>接受应收账款</span>
						<el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
						<span>只接受全额付款</span>
						<el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
						<span>接受分期收款</span>
						<el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
					</el-form-item>
					<el-form-item label="上班时间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							v-model="formData.startTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select>
						<el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="registerCompany">立即创建</el-button>
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
					name: '', //公司名称
					address: '', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					phone: '',
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
					name: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				},
				options: [{
		          	value: '金融机构',
		          	label: '金融机构'
		        }, {
		          	value: '上游企业',
		          	label: '上游企业'
		        }, {
		          	value: '中游企业',
		          	label: '中游企业'
		        }, {
		          	value: '下游企业',
		          	label: '下游企业'
		        }],
			    // baseUrl,
			    // baseImgPath,
			    // categoryOptions: ["金融机构", "上游企业", "中游企业", "下游企业"],
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			registerCompany:function(){
				var obj = {
					companyName: this.formData.name
				};
				this.$http.post("/data/registerCompany", {
					companyInfo : obj
				}).then(response => {
					this.$message({message:"注册成功", type:"success"});
					// this.$router.push("manage");
				}, response => {
					this.$message.error("注册失败")
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
