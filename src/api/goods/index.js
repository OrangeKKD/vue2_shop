import request from '@/utils/request'

// 获得所有分类列表
export const getCategoryList = (params) => request({
  url: '/categories',
  params
})

// 添加分类
export const addCategory = (params) => request({
  url: '/categories',
  method: 'POST',
  data: params

})

// 参数列表
export const getParamsList = (id, params) => request({
  url: `categories/${id}/attributes`,
  params
})

// 添加参数
export const addParams = (id, params) => request({
  url: `categories/${id}/attributes`,
  method: 'POST',
  data: params

})

// 编辑参数
export const editParams = (id, attrid, params) => request({
  url: `/categories/${id}/attributes/${attrid}`,
  method: 'PUT',
  data: params

})

// 删除参数
export const delParams = (id, attrid) => request({
  url: `/categories/${id}/attributes/${attrid}`,
  method: 'DELETE'
})
