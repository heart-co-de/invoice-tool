import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'

import './assets/tailwind.css'

const app = createApp(App)

const plugins = import.meta.glob('./plugins/*.ts', {
  import: 'default',
  eager: true,
})

for (const path in plugins) {
  if (Object.prototype.hasOwnProperty.call(plugins, path)) {
    const initPlugin = plugins[path] as (app: VueApp) => void
    initPlugin(app)
  }
}

app.mount('#app')
