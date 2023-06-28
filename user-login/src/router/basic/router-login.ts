import type { RouteRecordRaw } from 'vue-router'
const Root: RouteRecordRaw = {
  path: '/',
  redirect: '/home',
}
const Login: RouteRecordRaw = {
  path: '/login',
  component: () => import('@v/login/Login.vue'),
  meta: {
    pageTitle: '登录',
  },
}
const Reg: RouteRecordRaw = {
  path: '/reg',
  component: () => import('@v/login/Reg.vue'),
  meta: {
    pageTitle: '注册',
  },
}
const Home: RouteRecordRaw = {
  path: '/home',
  component: () => import('@v/home/Home.vue'),
  meta: {
    pageTitle: '首页',
  },
}
export default [Root, Login, Reg, Home]
