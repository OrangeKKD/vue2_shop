import request from '@/utils/request'

export const login = (params) => request({
  url: '/login',
  // post方式中参数放在data里
  data: params,
  method: 'POST'

})
