<template>
   <el-col :span="24" class="content" >
       <el-form ref="pubForm" :model="form" label-width="100px">
            <el-form-item label="表单名称">
                <el-input v-model="form.proname"></el-input>
            </el-form-item>
           <el-form-item label="选择分类">
                <el-select v-model="form.region" aria-placeholder="请选择">
                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="日期时间">
               <el-col :span="11">
                   <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width:100%"></el-date-picker>
               </el-col>
               <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
           </el-form-item>
           <el-form-item label="是否显示">
                <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
            </el-form-item>
             <el-form-item label="多选框">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="步步高" name="type"></el-checkbox>
                        <el-checkbox label="小天才" name="type"></el-checkbox>
                        <el-checkbox label="imoo" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="单选框">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="步步高"></el-radio>
                        <el-radio label="小天才"></el-radio>
                        <el-radio label="imoo"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文本框">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
        <div v-loading="imageLoading">
           <quill-editor 
               ref="myTextEditor" 
               v-model="content"
               style="height: 800px;margin-bottom:54px;" 
               :config="editorOption"
               @change="editorChange">
               
           </quill-editor>
          

        </div>
           <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </el-form>
  </el-col>
</template>

<script>

import  { quillEditor } from 'vue-quill-editor'

export default {
    data() {
        return {
            imageLoading:false,
            addImgRange:null,
            content:'<h2>Start a edit</h2>',
            uniqueId:'test',
            editorOption:{
                modules: {
                    toolbar: [
                      [{ 'size': ['small', false, 'large'] }],
                      ['bold', 'italic'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'image']
                    ],
                    history: {
                      delay: 1000,
                      maxStack: 50,
                      userOnly: false
                    },
                    imageImport: true
                    
                  }
            },
            form:{
                proname:'',
                region:'',
                date1:'',
                date2:'',
                delivery:true,
                type:['步步高'],
                resource:'小天才',
                desc:''
            }
        }
    },
    components: {
        quillEditor
    },
    mounted() {
        // var vm = this 
        // var imgHandler = async function (image) {

        //     vm.addImgRange = vm.$refs.myTextEditor.Quill.getSeletion()
        //     console.log(0)
        //     console.log(vm.addImgRange)
        //     console.log(1)
        //     if(image) {
        //         var fileInput = document.getElementById(vm.uniqueId)
        //         fileInput.click()
        //     }
        // }
        // vm.$refs.myTextEditor.Quill.getModule('toolbar').addHandler('image',imgHandler)
    },
    methods:{
        editorChange({ editor, html, text }) {
            this.content = html;
            console.log(text)
            console.log(editor)
        },
        submit(){
            console.log(this.content);
            // console.log('--------------------')
            console.log(this.form)
            // this.$message.success('提交成功！');
            alert('提交成功！')
        },
       //   uploadImg: async function(id) {
       //      alert(id)
       //   var vm = this
       //   vm.imageLoading = true
       //   var formData = new FormData($('#' + id)[0])
       //   try {
       //     const url = await vm.uploadImgReq(formData)// 自定义的图片上传函数
       //     if (url != null && url.length > 0) {
       //       var value = url
       //       vm.addImgRange = vm.$refs.newEditor.quill.getSelection()
       //       value = value.indexOf('http') != -1 ? value : 'http:' + value
       //       vm.$refs.newEditor.Quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', value, Quill.sources.USER)
       //     } else {
       //      alert('图片增加失败')
       //        vm.$message.warning("图片增加失败")
       //     }
       //     document.getElementById(vm.uniqueId).value=''
       //   } catch ({message: msg}) {
       //     document.getElementById(vm.uniqueId).value=''
       //     vm.$message.warning(msg)
       //   }
       //   vm.imageLoading = false
       // },
       // addImgRange(formData){
       //      console.log(formData)
       // }
    },
    computed: {
        editor () {
            return this.$refs.myTextEditor.quillEditor;
        }
    }

}
</script>

<style>
.content{    
    box-sizing: border-box;   
    padding:20px;
}

.el-col .editor-btn{
        margin-top: 20px;
    }
.content .ql-container { 
    min-height:200px;
}
    

</style>
