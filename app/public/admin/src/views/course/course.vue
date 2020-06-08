<template>
    <div>
        <div class="cou-box">
            <table>
                <thead >
                    <tr>
                        <th colspan="2">
                            <div class="cou-out">
                                <div>星期</div>
                                <span>节数</span>
                                <div class="cou-dj"></div>
                            </div>
                        </th>
                        <!-- <th>第二</th> -->
                        <th>第三</th>
                        <th>第四</th>
                        <th>第五</th>
                        <th>第六</th>
                        <th>第七</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(t,i) in list" :key="i">
                        <td v-if="i==0||i==4" :rowspan="i==0?4:(i==4)?2:0">{{t.name}}</td>
                        <td >{{t.knob}}</td>
                        <td>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td rowspan="2">1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {
                name:"上午",
                knob:"第一节",
                },
                {
                name:1,
                knob:"第二节",
                },
                {
                name:1,
                knob:"第三节",
                },
                {
                name:1,
                knob:"第四节",
                },
                {
                name:"下午",
                knob:"第五节",
                },
                {
                name:1,
                knob:"第六节",
                },
            ],
            options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
        }
    },
    methods:{
       
    }
}
</script>
<style scoped>
    .cou-box{
        width: 800px;
        margin: 60px auto;
    }
    .cou-box table{
        width: 100%;
        border-collapse: collapse;
    }
    .cou-box th:nth-child(2),.cou-box th:nth-child(3),
    .cou-box th:nth-child(4),.cou-box th:nth-child(5),
    .cou-box th:nth-child(6)
    {
        width: 100px;
    }
    .cou-box td,.cou-box th{
        border: 2px solid #409EFF;
        text-align: center;
        vertical-align: middle;
        height: 60px;
        padding: 0 5px;
    }
    .cou-out{
        position: relative;
    }
    .cou-out div{
        position: absolute;
        top: -20px;
        right: 50px;
    }
    .cou-out span{
        position: absolute;
        top: 0;
        left: 50px;
    }
    .cou-out  .cou-dj{
        width: 100%;
        height: 0;
        border: 1px solid #409EFF;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -115px;
        transform: rotate(12deg);
    } 
  
</style>