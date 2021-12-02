/*
环境配置
*/
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev:{
    baseApi:'/',
    mockApi:'https://www.fastmock.site/mock/457de6ab62b48b914e5c767fcb117dbc/api'
  },
  test:{
    baseApi:'/test.baseAPi',
    mockApi:'https://www.fastmock.site/mock/457de6ab62b48b914e5c767fcb117dbc/api'
  },
  prod:{
    baseApi:'/baseapi',
    mockApi:'https://www.fastmock.site/mock/457de6ab62b48b914e5c767fcb117dbc/api'
  }
}

export default {
  env,
  mock:true,
  namespace:'manager',
  ...EnvConfig[env]
}