import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/groupType/page',
    method: 'get',
    params: query
  })
}

export function all() {
  return request({
    url: '/admin/groupType/all',
    method: 'get'
  })
}

export function groupTypeAdd(data) {
  return request({
    url: '/admin/groupType',
    method: 'post',
    data: data
  })
}

export function groupTypeUpdate(data) {
  return request({
    url: `/admin/groupType/${data.id}`,
    method: 'put',
    data: data
  })
}

export function groupTypeDelete(id) {
  return request({
    url: `/admin/groupType/${id}`,
    method: 'delete'
  })
}
