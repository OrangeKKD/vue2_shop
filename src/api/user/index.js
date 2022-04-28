import request from '@/utils/request'

// 用户管理的所有接口

// 1.获取用户列表
export const userList = (params) => request({
  url: '/users',
  params
})

// 2.更改用户状态
export const changeStatus = (uid, type) => request({
  url: `/users/${uid}/state/${type}`,
  method: 'PUT'
})

// 3.添加用户
export const addUser = (params) => request({
  url: '/users',
  data: params,
  method: 'POST'
})

// 4.根据id查用户信息
export const queryUser = (id) => request({
  url: `/user/${id}`
})

// 5.删除单个用户
export const deleteUser = (id) => request({
  url: `/users/${id}`,
  method: 'DELETE'
})

// 6.编辑用户
export const editUser = (id, params) => request({
  url: `users/${id}`,
  method: 'PUT',
  data: params
})

// 分配角色
export const allotRole = (id, params) => request({
  url: `users/${id}/role`,
  data: params,
  method: 'PUT'
})
