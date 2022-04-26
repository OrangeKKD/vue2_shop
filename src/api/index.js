import { login } from './login/login'
import { menu } from './menu/menu'
import { userList, changeStatus, addUser, editUser, deleteUser } from './user'

export const loginAPI = login
export const menuAPI = menu
export const userListAPI = userList
export const changeStatusAPI = changeStatus
export const addUserAPI = addUser
export const editUserAPI = editUser
export const deleteUserAPI = deleteUser
