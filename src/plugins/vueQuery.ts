import type { App } from 'vue'
import { QueryClient, VueQueryPlugin } from 'vue-query'

export const queryClient = new QueryClient()

export default (app: App) => {
  app.use(VueQueryPlugin, {
    queryClient,
  })
}
