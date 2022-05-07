import { login } from './login/login'
import { menu } from './menu/menu'
import { userList, changeStatus, addUser, editUser, deleteUser, allotRole } from './user'
import { getAllRights, getMenuRights, getRoles, addRole, getRolesById, editRole, delRole, authorizeRoles, delRightsforRoles } from './rights'
import { getCategoryList, addCategory, getParamsList, addParams, editParams, delParams } from '@/api/goods'

export const loginAPI = login
export const menuAPI = menu
export const userListAPI = userList
export const changeStatusAPI = changeStatus
export const addUserAPI = addUser
export const editUserAPI = editUser
export const deleteUserAPI = deleteUser
export const allotRoleAPI = allotRole

// 权限管理
export const getAllRightsAPI = getAllRights
export const getMenuRightsAPI = getMenuRights
// 角色
export const getRolesAPI = getRoles
export const addRoleAPI = addRole
export const getRolesByIdAPI = getRolesById
export const editRoleAPI = editRole
export const delRoleAPI = delRole

// 授权
export const authorizeRolesAPI = authorizeRoles
// 删除指定角色的权限
export const delRightsforRolesAPI = delRightsforRoles

// 商品管理
export const getCategoryListAPI = getCategoryList
export const addCategoryAPI = addCategory
export const getParamsListAPI = getParamsList
export const addParamsAPI = addParams
export const editParamsAPI = editParams
export const delParamsAPI = delParams
