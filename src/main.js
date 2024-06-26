import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
