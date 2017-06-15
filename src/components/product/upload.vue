<template>
        <el-col :span="24" class="upload">
           
            <el-upload 
                ref="upload"
                action="/upload"
                :multiple="true"
                :auto-upload="false"
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
               <el-button @click="Upload">提交</el-button>
            </el-row>

            <el-col :span="24" style="min-height:500px;">
                 <u-editor v-bind:value="defaultMsg" :ids="ids" v-bind:config="config" v-on:input="input" v-on:ready="ready"></u-editor>    
            </el-col>
        </el-col>
       

</template>

<script>
import axios from 'axios'
import { upload } from "@/service/getData"
import uEditor from '../common/ueditor'
export default {
    data() {
        return {
            dialogImageUrl:'',
            dialogVisible:false,
            ids:'upload',
            image:{
                id:110,
                title:'图片',
                url:'http:12fs.com/img001'
            },
            defaultMsg: '初始文本',  
            config: {
            initialFrameWidth: 1000,
            initialFrameHeight: 320,
            UEDITOR_HOME_URL: __dirname + 'static/ueditor/',
            emotionLocalization: true,
            scaleEnabled: true,//当内容超出规定高度，出现滚动条，默认不出现
            toolbars: [[
                'fullscreen','undo', 'redo','emotion','bold', 'italic', 'underline','forecolor', 'backcolor','insertimage','blockquote','justifyleft', 'justifycenter', 'justifyright','inserttable'
            ]]
         
            }
        }
    },
    components:{ uEditor },
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
            console.log(file)
        },
        Upload(){
           this.$refs.upload.submit();
        },
        input(val){//编辑内容变化
            // console.log(val)
        },
        ready(val){
            // console.log(val)
        }
       
        
    }
}
</script>

<style>
  .upload{
      padding:20px 10px;
  }
</style>
