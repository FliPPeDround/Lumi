import { createApp } from 'vue'
// import './samples/node-api'
import router from './router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './style/main.css'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})

