import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param parentId
 */
export function filterAsyncRoutes(routes, parentId) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.parentId === parentId) {
      const children = filterAsyncRoutes(routes, tmp.id)

      const menu = {
        path: tmp.uri,
        name: tmp.code,
        component: tmp.parentId === -1 ? Layout : () => import(`@/views/${tmp.path}`),
        meta: { title: tmp.menu, icon: tmp.icon }
      }
      if (children.length > 0) {
        menu.children = children
      }

      if (tmp.type === 'dirt') {
        menu.redirect = tmp.path
        menu.alwaysShow = true
      }
      res.push(menu)
    }
  })
  res.push({ path: '*', redirect: '/404', hidden: true })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(menus, -1)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
