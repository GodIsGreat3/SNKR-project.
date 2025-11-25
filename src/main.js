import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import SweetAlertPlugin from './plugins/sweetalert';

import './assets/main.css'

const app = createApp(App)

app.use(SweetAlertPlugin); 
app.use(router) 
app.mount('#app')
