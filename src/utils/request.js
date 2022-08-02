import axios from 'axios'
import router from '@/router'
// import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // transformResponse: [function (data) {
  // try {
  //   return JSONbig.parse(data)

  // } catch (error) {
  //   return data
  // }
  // }]
})

request.interceptors.request.use(
  function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem('user')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default request
