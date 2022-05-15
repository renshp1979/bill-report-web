<template>
    <div class="home">
        <div class="home-head">
            <div>
                <el-date-picker
                        @change="dateChange"
                        size="mini"
                        v-model="reportMonth"
                        align="right"
                        value-format="yyyyMM"
                        type="month"
                        placeholder="选择年">
                </el-date-picker>
            </div>
            <span>总计：{{totalCost}}</span>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :name="String(index)" v-for="(item ,index) in tableList.departments">
                <template slot="title">
                    <div style="font-size: 18px;font-weight: bold">
                        分组 {{item.department}}：￥{{item.departmentCost}}
                    </div>
                </template>
                <el-collapse style="padding: 0 10px;" v-model="act">
                    <el-collapse-item :name="String(indexs)" v-for="(items ,indexs) in item.instances">
                        <template slot="title">
                            <div style="font-size: 16px;font-weight: bold">
                                实例 {{items.instance}}：￥{{items.instanceCost}}
                            </div>
                        </template>
                        <div v-for="last in items.items"
                             style="display: flex;flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 20px;"
                             class="flexbox">
                            <div>
                                {{last.usageType}}
                            </div>
                            <div>
                                {{last.usageAmount}}{{last.unit}}
                            </div>
                            <div>
                                {{last.lineItem}}
                            </div>
                            <div style="text-align: right">
                                {{last.cost.toFixed(2)}}
                            </div>
                        </div>
                    </el-collapse-item>

                </el-collapse>
            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
    // @ is an alias to /src
    import axios from 'axios';

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                reportMonth: '202204',
                totalCost: '',
                activeNames: 1,
                tableList: {}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            dateChange () {
                this.getData();
            },
            handleChange () {
                this.act = '';
            },
            getData() {
                axios({
                    url: 'https://7iri6vi6sb.execute-api.ap-northeast-1.amazonaws.com/test/bill?reportMonth=' + this.reportMonth,
                    method: 'get',
                    data: {
                        reportMonth: this.reportMonth
                    }
                })
                    .then((res) => {
                        if (res.data.statusCode === 200) {
                            this.tableList = res.data.body;
                            this.totalCost = res.data.body.totalCost;
                        } else {

                        }
                    })
            }
        }
    }
</script>
<style>
    .is-active{
        /*background: #f5f5f5;*/
    }

</style>
<style scoped>

    .home-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }

    .flexbox div {
        flex: 1;
        text-align: left;
    }
</style>
