import 'virtual:windi.css'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)
app.use(router)
app.mount('#app')
