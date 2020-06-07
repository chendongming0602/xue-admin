<template>
    <div >
        <div v-if="list.length!==0">
            <div class="look-list"  v-for="(t,i) of list" :key="i" v-if="t.show">
                <div class="look-title">成绩编号</div>
                <div>{{t.id}}</div>
                <div class="look-title">总分数</div>
                <div>{{t.minute}} 分</div>
                <div class="look-title">备注</div>
                <div>{{t.remark}}</div>
                <div class="look-title">成绩截图(点击放大)</div>
                <div class="look-img">
                    <el-image
                        class="look-img-item"
                        v-for="(tt,ii) of t.img"
                        :key="ii" 
                    
                        :src="require('@/'+tt)" 
                        :preview-src-list="[require('@/'+tt)]">
                    </el-image>
                </div>
                <el-button @click="delePOST(t.id,i)" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
        </div>
        <div v-if="list.length===0||!empty" class="look-empty">成绩记录为空~</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            empty:true
        }
    },
    methods:{
        async listGET(id){
            let res=await this.axios({
                path:"/user/selePer",
                data:{id}
            });
            res.forEach(t=>{
                t.img=this.$img(t.img);
                t.show=true;
            });
            console.log(res)
            this.list=res;
        },
        delePOST(id,index){
            this.$confirm("是否删除这条成绩记录", '删除', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios({
                path:"/user/delePer",
                method:"POST",
                data:{
                    id
                }
                }).then(()=>{
                    this.$message.success("删除成功");
                    this.list[index].show=false;
                    this.empty=this.list.some(t=>t.show);
                }).catch(err=>{this.$message.error(err.message)});
            });
        }
    },
    created(){
        let id=this.$route.query.id;
        this.listGET(id);
    }
}
</script>
<style scoped>
    .look-list{
        border-bottom: 2px dotted #409EFF;
        text-align: center;
        padding: 10px 0 20px;
        position: relative;
    }
    .look-list div{
        font-size: 14px;
        color: #666;
    }
    .look-list .look-title{
        font-size: 18px;
        color: #333;
        letter-spacing: 5px;
        /* font-weight: bold; */
        padding: 10px;
        color: #409EFF;
    }
    .look-img{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 10px;
        margin-top: -10px;
    }
    .look-img-item{
        min-width: 120px;
        min-height: 120px;
        width: 120px;
        height: 120px;
        border-radius: 3px;
        margin: 0 10px;
        margin-top: 20px;
        
    }
    .look-img-item:hover{
        border: 1px dashed #409EFF;
    }
    .el-button--small.is-circle{
        position: absolute;
        top: 10px;
        right: 0px;
    }
    .look-empty{
        padding: 50px 0;
        text-align: center;
        color: #999;
        font-size: 14px;
    }
</style>