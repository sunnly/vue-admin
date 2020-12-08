import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/gateLog/page',
    method: 'get',
    params: query
  })
}
