<<template>
        <div class="form_box">
           
                <el-input placeholder = "请输入用户名" v-model="user.memberName">
                    <template slot="prepend">
                       <i class="el-icon-edit"></i>
                    </template>    
                </el-input>
                <el-input placeholder="请输入密码" type="password" v-model="user.memberPwd">
                     <template slot="prepend">
                       <i class="el-icon-message"></i>
                    </template>  
                </el-input>    
                <el-col>
                    <el-button type="primary" class="btn" @click="check">登录</el-button>
                </el-col>
                <el-col>
                     <el-button :plain="true" type="primary" class="btn" @click="goRgister">注册</el-button>
                </el-col>
                 <el-col>
                     <el-button :plain="true" type="primary" class="btn" @click="goList">列表页面</el-button>
                </el-col>
                 <el-col>
                     <el-button :plain="true" type="primary" class="btn" @click="goChild"> 子路由 </el-button>
                </el-col>
                <transition name="router-slid" mode="out-in">
                    <router-view></router-view>
                </transition>
        </div>
</template>
<script>


    export default {
        data() {
            return {
                user:{
                    memberName:'',
                    memberPwd: ''                
                }
            }
        },
         computed: {
            // 验证手机号
            rightPhoneNumber: function () {
               
                    return /^1[34578]\d{9}$/gi.test(this.user.memberName) 
            }
        },
        mounted() {
            console.log(({}+{}).length)
        },
        methods: {
            goRgister () {
                this.$router.push('/')
            },
            goList () {
                this.$router.push('/Hello')
            },
            goChild () {
                 this.$router.push('/login/test')
            },
            check () {
               
                 if(this.user.memberName == ''){
                    alert("用户名必填")
                    return false
                }else if(!this.rightPhoneNumber){
                    alert('用户名是11位手机号码')
                     return false
                }else if(this.user.memberPwd == ''){
                    alert('密码必填')
                     return false
                }
                this.$store.dispatch('checkUser',this.user).then((res) => {
                    console.log(res)
                    if(!res){
                        return false
                    }else{
                        this.$router.push('./Hello')
                    }
                })

            }
        }
    }
</script>
<style>
    .form_box{
        width:300px;
        margin: 0 auto;
        padding: 50px 0;

    }
    .form_box .el-input{
        margin: 10px 0;
    }
    .form_box .btn{
        width:280px;
        margin-top:20px;
    }
     .el-button+.el-button{
        margin-left: 0 !important;
    }
     .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
