<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">注册用户</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                    <router-link to="login"><el-button type="info" class="reg-but">登录</el-button></router-link>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        async submitForm() {
            this.$refs.login.validate(async valid => {
                if (valid) {
                    let reg=/^[a-zA-Z0-9]{6,12}$/;
                    let reg2=/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,6}$/;
                    if(!reg2.test(this.param.username)) return this.$message.error("用户名不能大于6位数");
                    if(!reg.test(this.param.password)) return this.$message.error("密码只能是6-12位的数字或字母！");
                    let res=await this.axios({
                        path:"/user/reg",
                        method:"POST",
                        data:{
                            name:this.param.username,
                            pwd:this.param.password,
                            img:"avatar.jpg"
                        }
                    });
                    if(res.check===0) return  this.$message.error('该用户名已被注册！');
                    this.$message.success('注册成功！');
                    this.$router.push('/login');
                } else {
                    this.$message.error('请输入用户名和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/reg-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 450px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.reg-but{
    margin: 0;
}
.ms-login >>> .el-input--small .el-input__inner{
    height: 40px;
}
</style>