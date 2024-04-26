import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import PrimeVue
import PrimeVue from 'primevue/config'
// Import PrimeVue Preset
import Lara from './presets/lara'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.mount('#app')
