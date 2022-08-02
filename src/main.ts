import { createApp } from 'vue'
// import './samples/node-api'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './style/main.css'
import 'uno.css'

const app = createApp(App)
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})

