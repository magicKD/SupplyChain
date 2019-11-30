<template>
    <div>
        <head-top></head-top>
        <visitor-pie :pieData="pieData"></visitor-pie>
		<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>流通资金</span>
			<el-button style="float: right; padding: 3px 0" type="text">好好挣钱</el-button>
		</div>
		<div class="text item">电子钱包: {{pieData.moneyBalance}} </div>
		<div class="text item">应收账款: {{pieData.paymentBalance}}</div>
		<div class="text item">其他资金: {{pieData.qita}}</div>
		</el-card>
		
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import visitorPie from '@/components/visitorPie'
    export default {
    	data(){
    		return {
    			pieData: {
					moneyBalance:100,
					paymentBalance:100,
					qita:100
				},
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		initData: async function(){
				this.$http.get("/finance/getMoneyBalance").then(
					response => {
						// console.log(response.body[0])
						this.pieData.moneyBalance = response.body[0];
						console.log(response.body)
					}
				)
    		},
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
	width: 480px;
	position: relative;
	top: 25%;
    left: 30%;
  }
</style>
