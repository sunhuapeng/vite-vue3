import { createApp } from 'vue'
import App from './App.tsx'

import '@/style/public.scss'
import router from "./router";

const app = createApp(App)
app.use(router);
app.mount('#app')
