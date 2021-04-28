// 文章相关请求模块
import axios from '@/utils/axios'
// 获取文章信息
export const getArticles = params => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
