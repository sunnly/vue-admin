import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/auth/ws/token/getToken',
    method: 'get'
  })
}

export function getBigdataToken() {
  return request({
    url: '/auth/ws/token/getBigdataToken',
    method: 'get'
  })
}
