import { createRouter, createWebHashHistory } from 'vue-router'
import Logins from './basic/router-login'

const router = createRouter({
  history: createWebHashHistory(),
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
