import Mock from 'mockjs'

const LoginUsers = [
    {
        id:1,
        username:'admin',
        password:'123456',
        name:'碧海蓝天',
        userPhoto:Mock.mock(Mock.Random.image('50x50', '#FF6600','#fff','USER'))
        // userPhoto:Mock.mock(Mock.Random.dataImage('100x100', '头像'))
    }
]
const uploadImg = [
    {
        id:1,
        title:'admin',
        url:Mock.mock(Mock.Random.image('50x50', '#FF6600','#fff','USER'))
        // userPhoto:Mock.mock(Mock.Random.dataImage('100x100', '头像'))
    }
]
// 这个方式出来的列表似乎不是数组
// const Users = Mock.mock({    
//         'data|20':[{
//             'id|+1':1,
//             'name':'@cname',
//             'email':'@email',
//             'addr':Mock.mock('@county(true)'),
//             'age|18-58':1,
//             sex:Mock.Random.integer(0,1)
//         }]
//    })
const Users = []

for (let i = 0; i < 28; i++) {
  Users.push(Mock.mock({
    num: Mock.mock('@increment'),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
export { LoginUsers, Users ,uploadImg }