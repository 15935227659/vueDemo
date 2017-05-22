<template>
    <el-col :span="24">
        <!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <el-table :data="lists" highlight-current-row border stripe v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="num" label="编号" width="100" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="birth" label="生日" width="120" sortable>
            </el-table-column>
            <el-table-column prop="addr" label="地址" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev,pager,next" :page-size='4' :total="total" @current-change="handleCurrentChange">
            </el-pagination>
         </el-col>

         <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

    </el-col>
</template>

<script>
 
import util from '@/assets/util'
import { getList,removeUser,batchremove,editUser } from '@/service/getData'
export default {
    data() {
        return {
            filters: {
                name: ''
            },
            msg: '',
            listLoading: false,
            total: 0,
            lists: [],
            sels: [],//列表选中列
            pageSize: 3,
            page: 1,
            
            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            },

        }
    },
    computed: {},
    components:{ },
    async mounted() {
        this.getUsers()
    },
    methods: {
        //性别显示转换
        formatSex: function (row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        getUsers() {
            let pageData = {
                page: this.page,
                name: this.filters.name
            }
            this.listLoading = true
            getList(pageData).then((res) => {
               console.log(res)
                this.total = res.data.total
                this.lists = res.data.users
                // console.log(this.lists)
                this.listLoading = false
            })
        },
        async handleCurrentChange(val) {
            this.page = val
            this.getUsers()
        },
        async handleSizeChange(val) {
            this.pageSize = val
            this.getUsers()
        },
        async handleDel (index,row) {
        //   if( lvl<2 ){
        //     alert('您的级别不够不能删除数据')
        //     return false
        //   }
        this.$confirm('确认删除该记录吗？','提示',{
            type:'warning'
        }).then(() => {
            this.listLoding = true;
            let para = {num : row.num}
            removeUser(para).then((res) => {
                 this.listLoding = false;
                 this.$message({
                     message:'删除成功',
                     type:'success'
                 })
                 this.getUsers();
            })
        })
             
        },
        selsChange(sels) {
            this.sels = sels;
            console.log(sels)
        },
        batchRemove(){
            let ids = this.sels.map(item => item.num).toString()
            console.log(ids)
            this.$confirm('确认删除该记录吗？','提示',{
            type:'warning'
        }).then(() => {
            this.listLoding = true;
            let para = {ids : ids}
            batchremove(para).then((res) => {
                 this.listLoding = false;
                 this.$message({
                     message:'删除成功',
                     type:'success'
                 })
                 this.getUsers();
            })
        })
    },
    // 编辑框的显示隐藏
        handleEdit(index, row) {
            this.editFormVisible = true
            this.editForm = Object.assign({},row)       
        },
        // 编辑之后保存至数据库
        editSubmit(){
            this.$refs.editForm.validate((valid) => {
                if(valid) {
                    this.$confirm('确认要保存修改吗？','提示',{}).then(() => {
                        this.editLoding = true;
                        let para = Object.assign({},this.editForm);
                        para.birth = (!para.birth || para.birth == '')? '':util.formatDate.format(new Date(para.birth),'yyyy-MM-dd')
                        editUser(para).then((res) => {
                            this.editLoading = false
                            this.$message({
                                message:"保存成功",
                                type:'success'
                            })
                            this.$refs['editForm'].resetFields()
                            this.editFormVisible = false;
                            this.getUsers()
                        })
                    })
                }
            })
        },
        handleAdd () {
            this.$router.push('/user/add')
        }


        
        
    }
}
</script>

<style>
.toolbar{
    padding:10px 20px;

}
.toolbar .el-pagination{
    float: right;
}
</style>
