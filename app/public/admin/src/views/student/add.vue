<template>
    <div >
        <div class="add-title">添 加 学 生</div>
        <div class="add-input-box">
            <el-form ref="form" :model="list" label-width="80px" label-position="left" :rules="rules" :status-icon="true">
                <el-form-item label="学生名字" prop="name">
                    <el-input v-model="list.name" style="width:213px" placeholder="请输入学生名字"></el-input>
                </el-form-item>
               <el-form-item label="所在班级" prop="class">
                    <el-select v-model="list.class" placeholder="请选择所在班级">
                        <el-option 
                            v-for="(t,i) in classList"
                            :key="i"
                            :label="t"
                            :value="t"
                        ></el-option>
                       
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="list.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <Album ref="album" title="请选择学生照片 (最多1张)" :count="1"></Album>
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
                name:"",
                class:"",
                sex:""
            },
            rules:{
                name:[
                    { required: true, message: '请输入学生名字', trigger: 'blur' },
                ],
                class:[
                    { required: true, message: '请选择所在班级', trigger: 'change' },
                ],
                  sex:[
                    { required: true, message: '请选择学生性别', trigger: 'change' },
                ],
            }
        }
    },
    methods:{
        async submit(){
            this.$refs["form"].validate(async (valid)=>{
                if(!valid) return;
                let res=this.$refs.album.parent();
                let {child,isEmpty,stop}=res;
                if(!isEmpty) return this.$message.error("请选择学生照片")
                let result=await child();
                stop();
                let {list}=this;
                this.axios({
                    path:"/user/addStudent",
                    method:"POST",
                    data:{
                        name:list.name,
                        sex:list.sex,
                        class:list.class,
                        img:result[0]
                    }
                }).then(()=>{
                    this.$refs["form"].resetFields();
                    this.$confirm('是否跳转到《学生列表》?', '添加成功', {
                        confirmButtonText: '跳转',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        this.$router.push("studentList");
                    });
                }).catch(err=>{this.$message.error(err.message)})
            });
           
        }
    },
    created(){
        for(let i=1;i<=12;i++) this.classList.push(i+"班")
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
