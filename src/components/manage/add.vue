<template>
  <div class="addbox">
    <!--新增界面-->
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div class="add-footer">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		
  </div>
</template>

<script>
import util  from '@/assets/util'
import {addUser} from '@/service/getData.js'
export default {
  data(){
    return {
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }
    }
  },
  methods:{
    addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if(valid){
            this.$confirm('确定要新增该会员吗？','提示',{}).then(() => {
               this.addLoading = true
               let para = Object.assign({},this.addForm);
               para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
               addUser(para).then(() => {
                 this.addLoading = false;
                 this.$message({
                   message:'新增成功',
                   type:'success'
                 })
                 this.$refs['addForm'].resetFields()
                 this.$router.push('/user/userList')
               })
            })
          }
        })
    }
  }

}
</script>

<style>
.addbox{
  width:800px;
  padding:20px;
  margin-top: 50px;
}
.add-footer{
  text-align: center;
}
.add-footer .el-button{
  margin: 10px 20px;
}
</style>
