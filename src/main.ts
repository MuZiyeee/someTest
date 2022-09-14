import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log(process.env.NODE_ENV)

createApp(App).use(router).mount('#app')
