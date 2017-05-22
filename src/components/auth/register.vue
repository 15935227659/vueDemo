<<template>
        <div class="form_box">
             <img src="../../assets/logo.png">
             <el-form :model="user" :rules="rules2" ref="ruleForm" label-position="center" class="demo-ruleForm login-container" >
                    <el-form-item prop="username">
                        <el-input placeholder = "请输入您的手机号" auto-complete="on" v-model="user.username">
                            <template slot="prepend">                                <i class="el-icon-edit"> </i>
                            </template>    
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input placeholder = "请输入您的昵称" auto-complete="off"  v-model="user.name">
                            <template slot="prepend">
                                <i class="el-icon-edit">  </i>
                            </template>    
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" type="password" auto-complete="off" v-model="user.password">
                                <template slot="prepend">
                                <i class="el-icon-message"> </i>
                            </template>  
                        </el-input> 
                    </el-form-item> 
                    <el-form-item prop="confirmMemberpwd"> 
                        <el-input placeholder="请确认您的密码" type="password" auto-complete="off" v-model="user.confirmMemberpwd">
                            <template slot="prepend">
                                <i class="el-icon-message">  </i>
                            </template> 
                        </el-input> 
                    </el-form-item> 
                        <!--<template>
                            <el-radio class="radio" v-model="radio" label="1">一级</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">二级</el-radio>
                        </template>
                        -->
                        <!--验证码/v1/captchas-->
                        <!--<el-input placeholder="验证码" maxlength="4" v-model="codeNumber">
                            <template slot="append">
                                <img v-show="captchaCodeImg" :src="captchaCodeImg" />
                            </template>                    
                        </el-input>-->
                        <el-button type="primary" class="btn" @click="validate">注册</el-button>
                        <p>已注册那就去<router-link to="/login">登录</router-link>吧</p>
           </el-form>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        var validatePass2 = (rule,value,callback) => {
            if(value === '') {
                callback(new Error('请再次输入密码'))
            }else if(value !== this.user.password) {
                callback(new Error('两次输入的密码不一致'))
            }else{
                callback()
            }
        }
        return {
            // 注意:这里user是注入表单的数据，要和rules的名字对应
            user: {
                username: '',
                password: '',
                confirmMemberpwd:'',
                name:''
               
            },
            rules2: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                     
                ],
                name: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                      
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                     
                ],
                confirmMemberpwd: [
                    { validator: validatePass2, trigger: 'blur' },
                    
                ]
            },
            confirmMemberpwd: '',
            radio:'1'
        }
    },
    computed: {
        // 验证手机号
        rightPhoneNumber: function () {

            return /^1[34578]\d{9}$/gi.test(this.user.memberName)
        }
    },
    mounted() {
        // this.user.memberLvl = this.radio
    },
    methods: {
        validate() {
            
            this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                     this.$store.dispatch('registerUser', this.user).then((res) => {
                        if (!res) {
                            alert('用户名已注册')
                        } else {
                            this.$router.push('/user/userList')
                        }
                    })
                }else {
                    console.log('error submit !')
                    return false
                }
            })
            
           

        }

    }

}
</script>
<style>
.form_box {
    width: 300px;
    margin: 0 auto;
    padding: 50px 0;
}

.form_box .el-input {
    margin: 10px 0;
}

.form_box .btn {
    width: 300px;
    margin-top: 20px;
}
</style>
