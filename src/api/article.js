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
// 获取文章频道
export const getArticleChannels = () => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const deleteArticle = articleId => {
  return axios({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
