import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1'

})

request.interceptors.request.use(config => {
// 通过axios请求拦截器添加token 确保获取数据的权限
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

export default request
