import request from '@/utils/request'

// 1.获得所有权限列表(列表或树状)
export const getAllRights = (type) => request({
  url: `/rights/${type}`
})

// 2.左侧菜单权限
export const getMenuRights = () => request({
  url: '/menus'
})

// 3.角色列表
export const getRoles = () => request({
  url: '/roles'
})

// 4.根据id查询角色
export const getRolesById = (id) => request({
  url: `/roles/${id}`
})

// 5.添加角色
export const addRole = (params) => request({
  url: '/roles',
  data: params,
  method: 'POST'
})

// 6.编辑角色
export const editRole = (id, params) => request({
  url: `roles/${id}`,
  data: params,
  method: 'PUT'
})

// 7.删除角色
export const delRole = (id) => request({
  url: `roles/${id}`,
  method: 'DELETE'
})

// 8.授权角色
export const authorizeRoles = (id, params) => request({
  url: `/roles/${id}/rights`,
  method: 'POST',
  data: params
})

// 9.删除角色指定权限
export const delRightsforRoles = (roleId, rightId) => request({
  url: `roles/${roleId}/rights/${rightId}`,
  method: 'DELETE'
})
