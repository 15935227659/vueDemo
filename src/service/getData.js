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
        if(res.status){
            return res.data
        }
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
        if(res.status){
            return true
        }
            return false
        
        
   }).catch((err) => {
       console.log(err)
   })

}