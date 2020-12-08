import request from '@/utils/request'

export function elementPage(query) {
  return request({
    url: '/admin/element/list',
    method: 'get',
    params: query
  })
}

export function elementAdd(data) {
  return request({
    url: '/admin/element',
    method: 'post',
    data: data
  })
}

export function elementUpdate(data) {
  return request({
    url: `/admin/element/${data.id}`,
    method: 'put',
    data: data
  })
}

export function elementDelete(id) {
  return request({
    url: `/admin/element/${id}`,
    method: 'delete'
  })
}

export function listElementByType(menuId, type) {
  return request({
    url: `/admin/element/listElementByType`,
    method: 'get',
    params: {
      menuId: menuId,
      type: type
    }
  })
}

export function authorityElement() {
  return request({
    url: `/admin/element/user/menu`,
    method: 'get'
  })
}

