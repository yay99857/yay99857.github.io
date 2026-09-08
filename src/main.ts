import { createApp } from 'vue'
import router from './router'
import './assets/main.css'
import App from './App.vue'

// oh-vue-icons
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdChevronleft,
  MdOpeninnew,
  MdImagenotsupported,
  MdEmail,
  MdAccountcircle,
  MdHome,
  MdDownload,
  BiGithub,
  BiLinkedin,
  BiImage,
  BiImages,
  BiCodeSlash
} from 'oh-vue-icons/icons'

addIcons(
  MdChevronleft,
  MdOpeninnew,
  MdImagenotsupported,
  MdEmail,
  MdAccountcircle,
  MdHome,
  MdDownload,
  BiGithub,
  BiLinkedin,
  BiImage,
  BiImages,
  BiCodeSlash
)

const app = createApp(App)

app.component('VIcon', OhVueIcon)
app.use(router)
app.mount('#app')
