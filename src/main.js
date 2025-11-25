import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SweetAlertPlugin from './plugins/sweetalert'
import { createPinia } from 'pinia'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(SweetAlertPlugin)
app.use(router)
app.mount('#app')
