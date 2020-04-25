import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import Layout from '@/views/Layout/Index';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },{
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import('@/views/Login')
  },{
    path: "/console",
    name: "Console",
    redirect: "/index",
    meta: {
      name: "控制台"
    },
    icon: 'console',
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        icon: "home",
        meta: {
          name: "首页"
        },
        component: ()=> import("@/views/Console/Index")
      },{
        path: "/icons",
        name: "Icons",
        icon: "icons",
        meta: {
          name: "图标"
        },
        component: ()=> import("@/views/Console/Icons")
      }
    ]
  },{
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理"
    },
    icon: 'list',
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "消息列表"
        },
        icon: 'info',
        component: ()=> import("@/views/Info/Index")
      },{
        path: "/category",
        name: "Category",
        meta: {
          name: "目录管理"
        },
        icon: 'category',
        component: ()=> import("@/views/Info/category")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
