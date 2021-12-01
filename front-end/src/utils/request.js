//axios封装

import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import config from '../config'
const TOKEN_INVALID = 'Token认证失败，请重新登录！'
const NETWORK_ERROR = '网络请求异常，请稍后重试！'

const service = axios.create({
  baseURL: config.baseApi,
  timeout:8000,
})

service.interceptors.request.use((req)=>{
  //todo
  const headers = req.headers
  if(!headers.Authorization)
  headers.Authorization = "token"
    return req
})

service.interceptors.response.use((res)=>{
  const { code,data,msg } = res.data
  if(code === 200 ){
    return data
  }else if(code ===4001){
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1200);
    return Promise.reject(TOKEN_INVALID)
  }
  else{
    ElMessage.error(res.msg||NETWORK_ERROR)
  }
})

//请求的核心函数
function request(options) {
  options.method = options.method || 'get'
  if(options.method.toLowerCase() === 'get'){
    options.params = options.data  
  }
  if(config.env === 'prod'){
    service.defaults.baseURL = config.baseApi
  }else{
    service.defaults.baseURL = config.baseApi = config.mock?config.mockApi:config.baseApi
  }

  return service(options)
}

['get','post','put','delete','patch'].forEach(item=>{
  request[item] = (url,data,options)=>{
    return request({
      url,data,
      method:item,
      ...options
    })
  }
})

export default request