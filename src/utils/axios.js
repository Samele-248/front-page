// 基于axios封装请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的继承路径
  // 数据再处理--定义一个后端返回的原始数据的处理
  transformResponse: [function (data) {
  // // 参数data就是后端返回的原始数据（未经过JSON格式处理的数据）
    try { // 后端返回的数据不一定是一个JSON格式的字符串，如果不是，使用JSONbig.parse就会报错
      return JSONbig.parse(data)
      // console.log(JSONbig.parse(data))
    } catch (e) {
      // console.log('打印axios非json数据', e)
      return data
    }
  }]
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
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 一定要把响应结果return，否则后续拿不到数据
  return response
}, function (error) {
  const { status } = error.response
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem('user')
    router.push('/logiin')
    Message.error('登陆状态无效，请重新登陆')
  } else if (status === 400) {
    Message.error('请求参数错误')
  } else if (status === 403) {
    Message({
      type: 'waring',
      message: '没有操作权限'
    })
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})
// 导出请求方法
export default request
