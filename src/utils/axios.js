// 基于axios封装请求模块
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'// 请求的继承路径
})
// 请求拦截器
request.interceptors.request.use(
  // config是请求的相关配置信息对象，可以在此处修改
  function (config) {
    // 此处统一设置token
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 发送请求
    return config
    // 当return后请求才算发送出去，没有return则请求发送不出去
  },
  function (error) {
    return Promise.reject(error)
  })
// 导出请求方法
export default request
