import axios from 'axios'
const baseUrl = process.env.BASE_URL
export const getList = (page) => {
    
   return axios({
       method:'post',
       params:page,
       url:baseUrl+'/member/find'
      
   }).then((res) => {
       console.log(res)
        if(res.status){
            return res.data.content
        }
   }).catch((err) => {
       console.log(err)
   })

}
export const getCount = () => {
    
   return axios({
       method:'post',
       url:baseUrl+'/member/count'
      
   }).then((res) => {         
            return res.data
        
   }).catch((err) => {
       console.log(err)
   })

}
export const delUser = (userId) => {
    
   return axios({
       method:'post',
       params:{
            memberId:userId
       },
       url:baseUrl+'/member/del'
        
   }).then((res) => {
       
       console.log(res)
        if(res.status == 200){
            return true
        }
            return false          
   }).catch((err) => {
        
        if(err.response.status == 401){
            alert("权限不够。")
            
        }
   })

}