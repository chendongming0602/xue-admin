<template>
    <div >
        <div class="add-title">添加学生成绩信息</div>
        <div class="add-input-box">
            <el-form ref="form" :model="list" label-width="80px" label-position="left" :rules="rules" :status-icon="true">
               <el-form-item label="学生名字" prop="sid">
                    <el-select v-model="list.sid" placeholder="请选择学生">
                        <el-option 
                            v-for="(t,i) in classList"
                            :key="i"
                            :label="t.name"
                            :value="t.id"
                        ></el-option>
                       
                    </el-select>
                </el-form-item>
                <el-form-item label="总分数" prop="minute">
                    <el-input v-model="list.minute" style="width:213px" placeholder="请输入学生总分数"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="list.remark" style="width:213px" placeholder="请输入此次备注"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <Album ref="album" title="请上传成绩图片 (可多张)" :count="0"></Album>
        <el-button type="primary" round class="add-submit" @click="submit">确认添加</el-button>
        <!-- <img :src="require('@/assets/imgs/'+ img)" alt=""> -->
    </div>
</template>
<script>
import Album from "@/components/album/album";
export default {
    data(){
        return{
            classList:[],
            list:{
                sid:"",
                minute:"",
                remark:""
            },
            rules:{
                sid:[
                    { required: true, message: '请选择学生名字', trigger: 'change' },
                ],
                minute:[
                    { required: true, message: '请输入学生总分数', trigger: 'blur' },
                ],
                remark:[
                    { required: true, message: '请输入此次备注', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        async studentGET(){
            let res=await this.axios({
                path:"/user/listStudent",
            });
            this.classList=res;
        },
        async submit(){
            this.$refs["form"].validate(async (valid)=>{
                if(!valid) return;
                let reg=/^\d*\.{0,1}\d{0,1}$/;
                if(!reg.test(this.list.minute)) return this.$message.error("请输入正确分数！")
                let res=this.$refs.album.parent();
                let {child,isEmpty,stop}=res;
                if(!isEmpty) return this.$message.error("请上传成绩图片！")
                let result=await child();
                stop();
                result=JSON.stringify(result);
                let {list}=this;
                this.axios({
                    path:"/user/addPer",
                    method:"POST",
                    data:{
                        sid:list.sid,
                        minute:list.minute,
                        remark:list.remark,
                        img:result
                    }
                }).then(()=>{
                    this.$message.success("添加成功！");
                    this.$refs["form"].resetFields();
                }).catch(err=>{this.$message.error(err.message)})
            });
           
        }
    },
    created(){
        this.studentGET();
    },
    components:{
        Album
    }
}
</script>
<style scoped>
    .add-title{
        text-align: center;
        padding: 20px 0 40px;
        font-size: 26px;
        color: #409EFF;
        font-weight: bold;
        letter-spacing: 5px;
    }
    .add-input-box{
        width: fit-content;
        margin: 0 auto;
    }
    .add-submit{
        width: 500px;
        display: block;
        margin: 20px auto;
    }
</style>
