import request from '@/utils/request'

export function tree(query) {
  return request({
    url: '/admin/group/tree',
    method: 'get',
    params: query
  })
}

export function groupListPage(query) {
  return request({
    url: '/admin/group/groupListPage',
    method: 'get',
    params: query
  })
}

export function groupAdd(data) {
  return request({
    url: '/admin/group',
    method: 'post',
    data: data
  })
}

export function groupUpdate(data) {
  return request({
    url: `/admin/group/${data.id}`,
    method: 'put',
    data: data
  })
}

export function groupDelete(id) {
  return request({
    url: `/admin/group/${id}`,
    method: 'delete'
  })
}

export function getMenuAuthority(groupId) {
  return request({
    url: `/admin/group/authority/menu`,
    method: 'get',
    params: {
      groupId: groupId
    }
  })
}

export function getElementAuthority(id) {
  return request({
    url: `/admin/group/${id}/authority/element`,
    method: 'get'
  })
}

export function modifyAuthorityElement(id, data) {
  return request({
    url: `/admin/group/${id}/authority/element`,
    method: 'put',
    data: data
  })
}

export function modifyAuthorityMenu(id, data) {
  return request({
    url: `/admin/group/${id}/authority/menu`,
    method: 'put',
    data: data
  })
}
