// 素材管理
import axios from '@/utils/axios'
// 上传图片素材
export const uploadImage = data => {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data // 一般文件上传的接口都需要把请求头中的Content-type设置为multipart/form-data，但是我们使用axios上传文件不需要手动设置，但需要隔日data一个FormData()对象
  })
}
// 获取图片
export const getImage = params => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 收藏图片
export const collectImage = (imageId, collect) => {
  return axios({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
// 删除图片
export const deleteImage = imageId => {
  return axios({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
