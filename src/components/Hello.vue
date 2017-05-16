<template>
  <div class="hello">
    <h3>【{{msg}}】欢迎登录用户管理界面 <el-button @click="outLogin" style="top:10px;right:10px;position:absolute;">退出</el-button></h3>
  <el-col class="table_con">
    <el-col :span="24" class="table_row">
       <el-col :span="8">编号</el-col>
       <el-col :span="5">用户名</el-col>
       <el-col :span="5">密码</el-col>
        
       <el-col :span="3">删除</el-col>
    </el-col>
    <el-col v-for="(list,index) in lists" :span="24" class="table_row" :key="list.memberId">
       <el-col :span="8">{{list.memberId}}</el-col>
      <el-col :span="5">{{list.memberName}}</el-col>
      <el-col :span="5">{{list.memberPwd}}</el-col>
      
       <el-col :span="3"><i class="el-icon-close del_btn" @click="delUser(list.memberId,index,list.memberLvl)"></i></el-col>
    </el-col>
   
  </el-col>
  <el-col :span="24">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[3, 4, 5]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="allSize">
    </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { getStore,removeStore } from '../config/storage'
import { getList,getCount,delUser } from '../service/getData'
export default {
   name: 'hello',
   data () {
    return {
      msg: '',
      lists: [],
      pageSize:3,
      page:1,
      allSize:1
    }
  },
  computed:{
      calPage: function(){
        return {
          pageSize:this.pageSize,
          page:this.page-1
        }
      }          
  },
  async mounted () {
     console.log(getStore('userInfo'))
     
      if(getStore('userInfo') == null || getStore('userInfo') == ''){
         this.$router.replace('/login')
      }else{
        this.msg = getStore('userInfo').memberName
      }
      
      this.lists = await getList(this.calPage)
      this.allSize = await getCount()
      console.log(this.allSize)
        
    },
    methods:{
     async handleCurrentChange(val) {
        this.page = val
         this.lists = await getList(this.calPage)
      },
      async handleSizeChange(val){
        this.pageSize = val
         this.lists = await getList(this.calPage)
      },
      async delUser (userId,index,lvl) {
        if( lvl<2 ){
          alert('您的级别不够不能删除数据')
          return false
        }
        
          let delStatus = await delUser(userId)
          if(delStatus == true){
             this.lists.splice(index,1)
          }
      },
      outLogin (){
      
          removeStore('userInfo')
           
          this.$router.push('/login')
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.del_btn{
  color: #20A0FF;
  cursor: pointer;
  font-size: 14px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.table_row{
  border: solid #666;
  border-width:1px 0 0 0 ;
  padding:10px 0;
}
.table_con{
  border: solid #666;
  border-width:0 1px 1px 1px;
}
.el-pagination{
  text-align: right;
  margin-top: 10px;
}
</style>
