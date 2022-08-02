import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    URL: '/mp/v1_0/authorizations',
    data
  })
}

export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
      // Authorization: `Bearer ${user.token}`
      Authorization: 'Bearer 1111111'
    }
  })
}

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
