<template>
    <div>
        <div class="cou-box">
            <el-form ref="form" :model="all" :rules="rules">
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
                            <th>星期一</th>
                            <th>星期二</th>
                            <th>星期三</th>
                            <th>星期四</th>
                            <th>星期五</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="(t,i) in list" :key="i">
                            <td v-if="i==0||i==4" :rowspan="i==0?4:(i==4)?2:0">{{t.name}}</td>
                            <td >{{t.knob}}</td>
                            <td>
                                <el-form-item :prop="'one'+i">
                                    <el-select v-model="all['one'+i]" placeholder="课程选择">
                                        <el-option
                                        v-for="item in item"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item >
                            </td>
                            <td>
                               <el-form-item :prop="'two'+i">
                                    <el-select v-model="all['two'+i]" placeholder="课程选择">
                                        <el-option
                                        v-for="item in item"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item >
                            </td>
                            <td>
                                <el-form-item :prop="'three'+i">
                                    <el-select v-model="all['three'+i]" placeholder="课程选择">
                                        <el-option
                                        v-for="item in item"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item >
                            </td>
                            <td>
                                <el-form-item :prop="'four'+i">
                                    <el-select v-model="all['four'+i]" placeholder="课程选择">
                                        <el-option
                                        v-for="item in item"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item >
                            </td>
                            <td>
                               <el-form-item :prop="'five'+i">
                                    <el-select v-model="all['five'+i]" placeholder="课程选择">
                                        <el-option
                                        v-for="item in item"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-form>
            <div class="cou-jl">
                <div class="cou-jl-title">上次修改记录</div>
                <div class="cou-jl-box">
                    <div class="cou-jl-user">
                        <div>
                            操作者
                        </div>
                        <div>
                            <img :src="require('@/'+user.img)" alt="">
                           {{user.name}}
                        </div>
                    </div>
                    <div class="cou-ji-time">
                       <div>修改时间</div>
                       <div>{{user.time}}</div>
                    </div>
                </div>
            </div>
            <el-button @click="submit" type="primary" style="width:100%;margin-top:20px" plain>修改课程</el-button>
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
            item: [
                {
                    label: '数学'
                }, 
                {
                    label: '语文'
                }, 
                {
                    label: '英语'
                }, 
                {
                    label: '政治'
                }, 
                {
                    label: '地理'
                }, 
                {
                    label: '物理'
                }, 
                {
                    label: '化学'
                }, 
                {
                    label: '计算机'
                }, 
                {
                    label: '音乐'
                }, 
                {
                    label: '体育'
                }, 
                {
                    label: '实操'
                }, 
            ],
            rules: {
                
            },
            value: '',
            all:{},
            user:{},
            userid:0
        }
    },
    methods:{
       submit(){
            this.$refs["form"].validate(async (valid)=>{
                this.axios({
                    path:"/user/upCou",
                    data:{
                        id:1,
                        userid:this.userid,
                        content:this.all
                    }
                }).then(()=>{
                    this.$message.success("修改成功");
                    this.listGET();
                }).catch(err=>{this.$message.error(err.message)});
            });
       },
       forEvent(e){
           for(let i=0;i<=6;i++) this.rules[e+i]=[{ required: true, message: '请选择课程', trigger: 'change' }];
       },
       async listGET(){
           let res=await this.axios({
               path:"/user/seleCou"
           });
           this.all=res.arr.content;
           let user={name:res.name,img:this.$img([res.img])[0],time:new Date(Number(res.arr.time)).toLocaleString()}
           this.user=user;
       }
    },
    created(){
        this.listGET();
        this.forEvent("one");
        this.forEvent("two");
        this.forEvent("three");
        this.forEvent("four");
        this.forEvent("five");
        let user=JSON.parse(window.sessionStorage.getItem("user"));
        this.userid=user.id;
    }
}
</script>
<style scoped>
    .cou-box{
        width: 800px;
        margin: 20px auto;
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
    .cou-box th{
        color: #409EFF;
    }
    .cou-box td,.cou-box th{
        border: 2px solid #409EFF;
        text-align: center;
        vertical-align: middle;
        height: 60px;
        padding: 0 5px;
    }
    .cou-box td:hover,.cou-box th{
        background: rgba(64, 160, 255, 0.2);
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
    .cou-jl-title{
        text-align: center;
        padding-top: 20px;
        font-size: 18px;
        letter-spacing: 5px;
        color: #409EFF;
        font-weight: bold;
    }
    .cou-jl-box{
        display: flex;
        /* align-items: center; */
        justify-content: space-around;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(64, 160, 255, 0.5);
    }
    .cou-jl-box>div{
        width: 50%;
    }
    .cou-jl-user>div:nth-child(1),.cou-ji-time>div:nth-child(1){
        font-size: 16px;
        /* font-weight: bold; */
        text-align: center;
        letter-spacing: 3px;
    }
    .cou-jl-user>div:nth-child(2){
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        margin-top: 10px;
        justify-content: center;
    }
    .cou-jl-user img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #409EFF;
        margin-right: 10px;
    }
    .cou-ji-time{
        height: 100%;
    }
    .cou-ji-time>div:nth-child(2){
        font-size: 14px;
        color: #666;
        margin-top: 23px;
        text-align: center;
    }
</style>