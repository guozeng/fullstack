import { createRouter, createWebHistory } from 'vue-router'
import { Login } from './basic/router-login'

export default createRouter({
  history: createWebHistory(),
  routes: [Login],
})
