import type { RouteRecordRaw } from 'vue-router'
const Login: RouteRecordRaw = {
  path: '/login',
  component: () => import('@v/login/Login.vue'),
}
export { Login }
