<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
                const option = {
                    title : {
                        text: '流通资金',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['电子钱包','应收账款','其他']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.pieData.moneyBalance, name:'电子钱包'},
                                {value:this.pieData.paymentBalance, name:'应收账款'},
                                {value:this.pieData.qita, name:'其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
				this.$http.get("/finance/getMoneyBalance").then(
					response => {
						// console.log(response.body[0])
						this.pieData.moneyBalance = response.body[0];
					}
                ).then(
                    this.$http.get("/finance/getPaymentBalance").then(
                        response => {
                            this.pieData.paymentBalance = response.body[0];
                            console.log(this.pieData)
                            this.myChart.setOption(option);
                    })
                )
                // this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .visitorpie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
