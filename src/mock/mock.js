import axios from 'axios'
import mockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users,uploadImg } from './data/user'

let _LoginUsers = LoginUsers
let _Users = Users
let _uploadImgs = uploadImg
export default {
  bootstrap() {
    let mock = new mockAdapter(axios)

    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    mock.onGet('/error').reply(500, {
      msg: 'error'
    })

    // 注册用户
    mock.onPost('/register').reply(config => {
      let { username, name, password,userPhoto } = JSON.parse(config.data)
      let id = _LoginUsers.length + 1
      return new Promise((resolve, reject) => {
        let user = {
          id: id,
          username: username,
          name: name,
          password: password,
          userPhoto:userPhoto
        }
        setTimeout(() => {
          let hasUser = _LoginUsers.some(u => {
            if (u.username == username || u.name == name) {
              return false
            } else {
              _LoginUsers.push(user)
              return true
            }
          })
          if (hasUser) {
            resolve([200, { code: 200, msg: '注册成功', user }])
          } else {
            reject([200, { code: 200, msg: '账号已存在' }])
          }
        })
      })
    })

    // 登录
    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = _LoginUsers.some(u => {
            if (u.username == username && u.password == password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })
          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }])
          } else {
            resolve([200, { code: 200, msg: '账号密码错误' }])
          }
        }, 1000)
      })
    })

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let { name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 500);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 4 * page && index >= 4 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 500);
      });
    });
    
    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { num } = config.params;
      _Users = _Users.filter(u => u.num !== num);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      console.log(config.params)
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.num.toString()));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { num, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.num === num) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        num: _Users.length + 1,
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


  }

}