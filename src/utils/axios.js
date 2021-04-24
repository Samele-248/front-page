// 基于axios封装请求模块
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'// 请求的继承路径
})
// 导出请求方法
export default request
