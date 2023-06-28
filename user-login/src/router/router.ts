import { createRouter, createWebHistory } from 'vue-router'
import Logins from './basic/router-login'

const router = createRouter({
  history: createWebHistory(),
  routes: [...Logins],
})

router.afterEach((to, failure) => {
  if (failure) {
    // console.error(failure)
  }
  const title = useTitle()
  title.value = to.meta.pageTitle as string
})

export default router
