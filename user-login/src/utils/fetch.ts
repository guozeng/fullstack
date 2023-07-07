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
  method: MethodTypes
}
async function ajax(
  url: string,
  config: IAjaxConfig = {
    method: MethodTypes.GET,
  }
) {
  if (config.data && config.method !== MethodTypes.POST) {
    url = `${url}&${stringify(config.data)}`
  }
  const { isFetching, error, data } = await useMyFetch(url)[config.method]().json()
  if (error.value) {
    ElMessage.error('请求错误')
  }
  return {
    isFetching,
    data,
  }
}

export { useMyFetch, ajax }
