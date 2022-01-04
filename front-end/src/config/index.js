/*
环境配置
*/
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development:{
    baseApi:'/api',
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
  mock:false,
  namespace:'manager',
  ...EnvConfig[env]
}