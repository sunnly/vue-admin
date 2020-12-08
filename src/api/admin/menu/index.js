import request from '@/utils/request'

export function list() {
  return request({
    url: '/admin/menu/list',
    method: 'get'
  })
}

export function tree(query) {
  return request({
    url: '/admin/menu/tree',
    method: 'get',
    params: query
  })
}

export function menuAdd(data) {
  return request({
    url: '/admin/menu',
    method: 'post',
    data: data
  })
}

export function menuUpdate(data) {
  return request({
    url: `/admin/menu/${data.id}`,
    method: 'put',
    data: data
  })
}

export function menuDelete(id) {
  return request({
    url: `/admin/menu/${id}`,
    method: 'delete'
  })
}
