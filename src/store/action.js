import axios from 'axios'
const baseUrl = process.env.BASE_URL

export default {
     registerUser({ commit }, userInfo) {
        console.log(baseUrl)
         
        // axios.post('/regin',{memberName:"456",memberPwd:"123",memberLvl:2}).then((res) => {
         return axios({
                method:"post",
                params:userInfo,
                url:baseUrl+'/member/regin',
                withCredentials: true
                // auth:{
                //    username:'ghost',
                //    password:'ghost'
                // },
                // proxy: {
                //     host: '127.0.0.1',
                //     port: 8080,
                //     auth: {
                //     username: 'ghost',
                //     password: 'ghost'
                //     }
                // }
            }).then((res)=>{

        
            console.log(res)
            commit('REMEBER_USER', userInfo)
            return true
        }).catch(function (err) {

            console.log(err)
            return false

        })
    },
    checkUser({ commit }, userInfo) {
        
        return axios({
            method:'post',
            params:userInfo,
            url:baseUrl+'/member/login'
                 
        }).then((res) => {
          console.log(res)
           if(res.data.state == "success"){
               
                commit('REMEBER_USER', userInfo)
                return true
            }else{
                 alert(res.data.message)
                 return false
            }
          
        }).catch((err) => {
            alert(err)
            return false
        })
    }
   
}