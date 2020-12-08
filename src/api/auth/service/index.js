import request from '@/utils/request'

export function servicePage(query) {
  return request({
    url: '/auth/service/page',
    method: 'get',
    params: query
  })
}

export function serviceAll() {
  return request({
    url: '/auth/service/all',
    method: 'get'
  })
}

export function serviceClient(serviceId) {
  return request({
    url: `/auth/service/${serviceId}/client`,
    method: 'get'
  })
}

export function allowClientList(serviceId, params) {
  return request({
    url: `/auth/service/${serviceId}/client`,
    method: 'put',
    params: params
  })
}
