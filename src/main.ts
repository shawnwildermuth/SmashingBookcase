import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createVuex } from 'vuex'

createApp(App)
  .use(createVuex())
  .use(router)
  .mount('#app')
