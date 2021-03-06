// 用户相关的请求模块
import axios from '@/utils/axios'
// 用户登陆
export const loginUser = data => {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data // date后边跟的是发送请求的数据---传入数据
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
// 修改用户头像
export const updateUserPhoto = data => {
  return axios({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
// 修改用户信息
export const updateUserProfile = data => {
  return axios({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
