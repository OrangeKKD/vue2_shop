import request from '@/utils/request'

export const menu = () => request({
  url: '/menus'
})
