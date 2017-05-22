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
           <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
           <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </el-form>
  </el-col>
</template>

<script>
import  { quillEditor } from 'vue-quill-editor'
export default {
    data() {
        return {
            content:'<h2>Start a edit</h2>',
            editorOption:{},
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
    methods:{
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        submit(){
            console.log(this.content);
            console.log('--------------------')
            console.log(this.form)
            this.$message.success('提交成功！');
        }
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
