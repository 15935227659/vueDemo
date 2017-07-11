<template>
  <div>
      <div><img :src="src"></div>
       <vue-core-image-upload 
            :class="['el-button','pure-button-primary','js-btn-crop']"
            crop="local"
            text="上传图片"
            :url="url"
            :cropRatio="cropRatio"
            :inputOfFile="filename"
            extensions="png,gif,jpeg,jpg"
            @imageuploaded="imageuploaded"
            @errorhandle="handleError">
        </vue-core-image-upload>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
    data(){
        return {
            src:'',
        }
    },
    components:{
        VueCoreImageUpload
    },
    props:{
        url:{
            type:String,
            default:'/alert/upload'

        },
        filename:{
            type:String,
            default:'file'
        },
         cropRatio:{
            type:String,
            default:'1:1'
         }
    },
    methods:{
        imageuploaded(res) {
            console.log(res)
            this.src = res[0]
            this.$emit('getImg',this.src)
            
        },
        handleError(){
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        }
    }
}
</script>

<style>
  
</style>
