<template>
    <div >
        <div class="add-title">添加学生信息</div>
        <div class="add-input-box">
            <el-form ref="form" :model="list" label-width="80px">
                <el-form-item label="学生名字" >
                    <el-input v-model="list.name" style="width:213px" placeholder="请输入学生名字"></el-input>
                </el-form-item>
               <el-form-item label="所属班级">
                    <el-select v-model="list.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="list.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <Album ref="album"></Album>
        <el-button @click="dianji">点击上传</el-button>
    </div>
</template>
<script>
import Album from "@/components/album/album"
export default {
    data(){
        return{
            list:{

            }
        }
    },
    methods:{
        dianji(){
            let res=this.$refs.album.parent();
            console.log(res)
        }
    },
    components:{
        Album
    }
}
</script>
<style scoped>
    .add-title{
        text-align: center;
        padding: 20px;
        font-size: 20px;
        color: #409EFF;
    }
    .add-input-box{
        width: fit-content;
        margin: 0 auto;
    }
</style>
