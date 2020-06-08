<template>
    <div>
        <div class="add-title">修改账号信息</div>
        <div class="change-box">
            <el-form ref="form" :model="change" label-width="80px" label-position="center" :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model="change.name" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="change.pwd" placeholder="密码" type="password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <Album title="修改头像(一张)" :count="1" ref="album"></Album>
            <el-button type="danger" round style="width:100%;margin-top:20px" @click="submit">确认修改</el-button>
        </div>
    </div>
</template>
<script>
import Album from "@/components/album/album";
export default {
    data(){
        return{
            change:{
                name:"",
                pwd:""
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            user:{
                name:"",
                pwd:"",
                img:""
            }
        }
    },
    methods:{
        async submit(){
            this.$refs["form"].validate(async (valid)=>{
                if(!valid) return;
                try{
                    let reg=/^[a-zA-Z0-9]{6,12}$/;
                    let reg2=/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,6}$/;
                    if(!reg2.test(this.change.name)) return this.$message.error("用户名不能大于6位数");
                    if(!reg.test(this.change.pwd)) return this.$message.error("密码只能是6-12位的数字或字母！");
                    let res=this.$refs.album.parent(),
                    {child,isEmpty,stop}=res,
                    result=await child(),img=this.change.img;
                    if(result.length!==0) img=result[0];
                    stop();
                    await this.axios({
                        path:"/user/changeUser",
                        method:"POST",
                        data:{
                            name:this.change.name,
                            pwd:this.change.pwd,
                            img,
                            id:this.change.id
                        }
                    });
                    this.$message.success("修改成功！");
                    window.sessionStorage.removeItem('user');
                    this.$router.push("login");
                }catch(err){
                    this.$message.error("修改失败！");
                }
            })
        }
    },
    created(){
        let user=JSON.parse(window.sessionStorage.getItem("user"));
        this.change=user;
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
    .change-box{
        width: 350px;
        margin: 0 auto;
    }
    .change-box >>> .el-form-item--small .el-form-item__content{
        margin: 0 !important;
    }
    
</style>