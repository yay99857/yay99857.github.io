import { createApp } from 'vue'
import router from './router'
import './assets/main.css'
import App from './App.vue'
import { OhVueIcon, registerIcons } from './icons'

registerIcons()

const app = createApp(App)

app.component('VIcon', OhVueIcon)
app.use(router)
app.mount('#app')
