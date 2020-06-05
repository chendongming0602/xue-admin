<template>
    <div class="album-box">
        <div>{{title}}</div>
        <div>
            <el-upload
                action="https"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :multiple="true"
                :on-remove="handleRemove"
                drag
                :http-request="submitEvent"
                ref="album"
                :auto-upload="false"
            >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        //上传参数（目前不可用）
        value:{
            type:Object,
            default:()=>{}
        },
        title:{
            type:String,
            default:"上传图片"
        }
    },
    data(){
        return {
        dialogImageUrl: '',
        dialogVisible: false,
        formData:"",
        isEmpty:false
      };
    },
    methods: {
        parent(){
            this.$refs.album.submit();
            console.log(this.isEmpty)
            //没有选择图片
            if(!this.isEmpty) return  Promise.resolve(0)
            //this.value此参数无法传到后端（bug）
            this.formData.append("value",this.value);
            let child=()=>{
                return this.axios({
                path:"/user/img",
                data:this.formData,
                method:"POST"
                });
            };
            this.isEmpty=false;
            return  child
            // .then(res=>{
               
            // }).finally(()=>{
            //     this.formData = new FormData();
            //     this.$refs.album.clearFiles();
            // })
        },
        submitEvent(params){
            console.log(123)
            this.isEmpty=true;
            this.formData.append("file", params.file);
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    created(){
        this.formData = new FormData();
    }
}
</script>
<style>
   .album-box{
       text-align: center;
   }
   .album-box>div{
       padding: 5px;
       font-size: 14px;
       color: #666;
   }
    .el-upload-dragger{
        width: 146px !important;
        height: 146px !important;
    }
</style>
