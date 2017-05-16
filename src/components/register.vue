<<template>
        <div class="form_box">
            
            <el-input placeholder = "请输入您的手机号" require  v-model="user.memberName">
                <template slot="prepend">
                    <i class="el-icon-edit">
                    </i>
                </template>    
            </el-input>
            <el-input placeholder="请输入密码" type="password"  v-model="user.memberPwd">
                    <template slot="prepend">
                    <i class="el-icon-message">
                    </i>
                </template>  
            </el-input>   
                <el-input placeholder="请确认您的密码" type="password"  v-model="confirmMemberpwd">
                    <template slot="prepend">
                    <i class="el-icon-message">
                    </i>
                </template>  
            </el-input> 
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
           
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            user: {
                memberName: '',
                memberPwd: ''
               
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
            if (this.user.memberName == '') {
                alert('手机号必填')
                return false
            } 
            // else if (!this.rightPhoneNumber) {
            //     alert('手机格式不正确')
            //     return false
            // }
             else if (this.user.memberPwd == '') {
                alert('密码必填')
                return false
            } else if (this.confirmMemberpwd == '') {
                alert('请确认密码')
                return false
            } else if (this.user.memberPwd != this.confirmMemberpwd) {
                alert('密码不一致')
                return false
            }
            // this.user.memberLvl = this.radio
            this.$store.dispatch('registerUser', this.user).then((res) => {
                if (!res) {
                    alert('用户名已注册')
                } else {
                    this.$router.push('./login')
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
    width: 280px;
    margin-top: 20px;
}
</style>
