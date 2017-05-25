import axios from 'axios'
const baseUrl = process.env.BASE_URL

export default {
     registerUser({ commit }, userInfo) {
        console.log(baseUrl)
       
         return axios({
                method:"post",
                data:userInfo,
                url:'/register',
                withCredentials: true
            }).then((res)=>{
            if(res.data.msg == '账号已存在'){
                
                return false
            }
            //  console.log(res)
            commit('REMEBER_USER', userInfo)
            return true
        },(rej) => {
            alert(rej.data.mag)
        }).catch(function (err) {

            // console.log(err)
            return false

        })
    },
    checkUser({ commit }, userInfo) {
        
        return axios({
            method:'post',
            data:userInfo,
            url:'/login'
                 
        }).then((res) => {
           
          let { code,msg,user } = res.data
           if(code == 200 && msg == '请求成功'){
               console.log(user)            
                commit('REMEBER_USER', user)
                return true
            }else{
                 alert(msg)
                 return false
            }      
        }).catch((err) => {
            alert(err)
            return false
        })
    }
   
}