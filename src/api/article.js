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
// 新建文章
export const addArticle = (data, draft = false) => {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 修改文章
export const updataArticle = (articleId, data, draft = false) => {
  return axios({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
// 获取指定文章
export const getArticle = articleId => {
  return axios({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
