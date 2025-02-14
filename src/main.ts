import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import i18n from './i18n';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import Material from '@primevue/themes/material';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      darkModeSelector: 'none',
    },
  },
});
app.use(ToastService);
app.use(i18n);
app.mount('#app');
