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
