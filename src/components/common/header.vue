<template>
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                  User Management
            </el-col>
            <el-col :span="10">
                <div class="tools">
                    <i class="el-icon-menu "  @click="collapse"></i>
                    欢迎登录用户管理界面
                </div>
            </el-col>
            <el-col :span = "4" class="userinfo">
                <el-dropdown trigger = "hover">
                    <span class="el-dropdown-link">
                        <img :src="this.userPhoto!==''?this.userPhoto:'../../assets/logo.png'" />
                        【{{userName}}】
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

        </el-col>    
</template>

<script>
import { getStore, removeStore } from '@/config/storage'
export default {
    data() {
        return {
            userName:'zlc',
            userPhoto:'',
            collapsed:false,
        }
    },
    async mounted(){
            if (getStore('userInfo') == null || getStore('userInfo') == '') {
            this.$router.replace('/login')
            } else {
            this.userName = getStore('userInfo').name
            if(getStore('userInfo').userPhoto){
                this.userPhoto = getStore('userInfo').userPhoto
            }
            
            }

    },
    methods:{
        collapse() {
            this.collapsed = !this.collapsed
            this.$emit('changeCollapsed',this.collapsed)
        },
        logout() {
         var _this = this
         this.$confirm ('您确认要退出吗？','提示',{
            type:'warning'
         }).then(() => {
            removeStore('userInfo')
           _this.$router.push('/login')
         }).catch(() => {
             
         })
      
    },
    },
     
}
</script>

<style>
.header{
    width:100%;
    height:60px;
    color:white;
    background-color: #20a0ff;
    line-height: 60px;
}
.header .logo{
    width:230px;
    padding:0 10px;
    font-size:18px;
    font-weight: 600;
    border-right:1px solid #f0f0f0;
}
.header .logo-collapse-width{
    width:60px;
}
.header .userinfo{
    float: right;
    
}
.header .userinfo .el-dropdown-link{
    font-size:18px;
    color:white;
    cursor: pointer;
}
.header .userinfo .el-dropdown-link img{
    display: inline-block;
    border-radius: 50%;
    width:40px;
    height:40px;
    margin-top: 10px;
    float:right;
}
.tools{
    padding: 0 20px;
    text-align: left
}
.tools i{
    margin-right:20px;
}
</style>
