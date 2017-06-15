<template>
  <div>
      <el-row :gutter="20" >
        <el-col :span="18" :offset="3"  style="min-height:500px;">           
                 <u-editor v-bind:value="defaultMsg" :ids ='ids' v-bind:config="config" v-on:input="input" v-on:ready="ready"></u-editor>    
        </el-col>
      </el-row>
  </div>
</template>

<script>
 import uEditor from '../common/ueditor'
export default {
    data() {
        return {
            dialogImageUrl:'',
            dialogVisible:false,
            ids:'list',
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
            scaleEnabled: true,
           
         
            }
        }
    },
   components:{ uEditor },
   methods:{
     getUeditorContent:function() {
       console.log(this.editor.getContent())
     },
     input(){

     },
     ready() {

     }

   }
 }
</script>

 