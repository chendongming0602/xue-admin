<template>
    <div>
        <el-table
            :data="list"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <!-- <el-table-column  width="100" align="center"></el-table-column> -->
            <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column label="性别" align="center">
                <template slot-scope="scope" >{{scope.row.sex}}</template>
            </el-table-column>
            <el-table-column prop="class" label="所在班级" align="center"></el-table-column>
            <el-table-column label="头像(查看大图)" align="center" width="400">
                <template slot-scope="scope">
                    <el-image
                        class="table-td-thumb"
                        :src="require('@/'+scope.row.img)"
                        :preview-src-list="[require('@/'+scope.row.img)]"
                    ></el-image>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <router-link :to="{path:'perLook',query:{id:scope.row.id}}">
                        <el-button
                            type="text"
                            icon="el-icon-tickets"
                            class="per"
                        >成绩</el-button>
                    </router-link>
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.row.id,scope.$index)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹出框 -->
        <el-dialog title="修改资料" :visible.sync="editVisible" width="35%">
            <el-form ref="form" :model="form" label-width="70px" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="输入要修改的姓名" style="width:214px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="class">
                    <el-select v-model="form.class" placeholder="请选择所在班级">
                        <el-option 
                            v-for="(t,i) in classList"
                            :key="i"
                            :label="t"
                            :value="t"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            editVisible:false,
            form:{
                name:"",
                sex:"",
                class:""
            },
            classList:[],
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
            },
            id:0
        }
    },
    methods:{
        handleDelete(id,index){
            let str=`确定删除《${this.list[index].name}》同学信息吗？`
            this.$confirm(str, '删除', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.axios({
                    path:"/user/deleStudent",
                    method:"POST",
                    data:{
                        id
                    }
                }).then(()=>{
                    this.listGET();
                    this.$message.success("成功删除！");
                })
                .catch(err=>{this.$message.error(err.message)})
            });
        },
        handleEdit(index){
            this.form.name=this.list[index].name;
            this.form.sex=this.list[index].sex;
            this.form.class=this.list[index].class;
            this.editVisible=true;
            this.id=this.list[index].id;
        },
        async saveEdit(){
            this.$refs["form"].validate(async (valid)=>{
                if(!valid) return;
                this.axios({
                    path:"/user/changeStudent",
                    method:"POST",
                    data:{
                        name:this.form.name,
                        sex:this.form.sex,
                        class:this.form.class,
                        id:this.id
                    }
                }).then(()=>{
                    this.listGET();
                    this.editVisible=false;
                    this.$message.success("修改成功")})
                .catch(err=>{this.$message.error(err.message)});
            });
        },
        async listGET(){
            let res=await this.axios({
                path:"/user/listStudent"
            });
            res.forEach(t=>{
                t.img=this.$img([t.img])[0]
            });
            this.list=res;
        }
    },
    created(){
        this.listGET();
        for(let i=1;i<=12;i++) this.classList.push(i+"班");
    }
}
</script>
<style  scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .per{
        color: #67c23a;
    }
</style>