import { createFetch } from '@vueuse/core'
import { stringify } from 'qs'
const useMyFetch = createFetch({
  baseUrl: 'test/api',
  combination: 'overwrite',
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`
      return { options }
    },
    timeout: 10000,
  },
})
enum MethodTypes {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}
interface IAjaxConfig {
  data?: Record<string, any>
  method?: keyof typeof MethodTypes
}
async function ajax(
  url: string,
  config?: IAjaxConfig
) {
  config = config || {}
  config.method = config.method || 'GET'

  let params = undefined
  if (config.data && config.method !== 'POST') {
    url = `${url}&${stringify(config.data)}`
  } else {
    params = config.data
  }
  const method = config.method
  let val
  switch (method) {
    case 'GET':
      val = await useMyFetch(url).get().json()
      break;
    case 'POST':
      val = await useMyFetch(url).post(config.data || {}).json()
      break;
    case 'DELETE':
      val = await useMyFetch(url).delete().json()
      break;
    case 'PUT':
      val = await useMyFetch(url).put().json()
      break;
    default:
      val = await useMyFetch(url).get().json();
  }
  const { isFetching, error, data } = val
  if (error.value) {
    ElMessage.error('服务不可用')
  }
  return {
    isFetching,
    error,
    data,
  }
}

export { useMyFetch, ajax }
