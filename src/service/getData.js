import axios from 'axios'
const baseUrl = process.env.BASE_URL
export const getList = (page) => {   
   return axios({
       method:'get',
       params:page,
       url:'/user/listpage'   
   })
}

export const removeUser = (para) => {   
   return axios({
       method:'get',
       params:para,
       url:'/user/remove'
        
   })
}
export const batchremove = (para) => {   

   return axios({
       method:'get',
       params:para,
       url:'/user/batchremove'     
   })
}
export const editUser = (para) => {   

   return axios({
       method:'get',
       params:para,
       url:'/user/edit'     
   })
}
export const addUser = (para) => {   

   return axios({
       method:'get',
       params:para,
       url:'/user/add'     
   })
}
// export const upload = (para) => {   
//    return axios({
//        method:'get',
//        params:para,
//        url:'/upload'     
//    })
// }