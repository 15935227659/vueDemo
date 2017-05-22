<template>
        <el-col :span="24" class="upload">
           
            <el-upload 
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <!--图片放大预览的容器-->
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-row>
                <el-button @click="submitUpload">提交 </el-button>
            </el-row>
        </el-col>


</template>

<script>
import { upload } from "@/service/getData"
export default {
    data() {
        return {
            dialogImageUrl:'',
            dialogVisible:false,
            image:{
                id:110,
                title:'图片',
                url:'http:12fs.com/img001'
            }
        }
    },
    methods: {
        //删除的回调
        handleRemove(file,fileList) {
            console.log(file,fileList)
        },
        //查看放大的回调
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
            console.log(this.dialogImageUrl)
        },
        handleSuccess(file){
            
        },
        submitUpload() {
            console.log(this.$refs.upload.uploadFiles)
        }
        
    }
}
</script>

<style>
  .upload{
      padding:20px 10px;
  }
</style>
