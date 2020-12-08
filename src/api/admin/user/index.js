import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/jwt/token',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/user/front/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function page(query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function userAdd(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: data
  })
}

export function userUpdate(data) {
  return request({
    url: `/admin/user/${data.id}`,
    method: 'put',
    data: data
  })
}

export function userDelete(id) {
  return request({
    url: `/admin/user/${id}`,
    method: 'delete'
  })
}
