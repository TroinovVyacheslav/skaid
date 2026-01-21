import { createApp } from 'vue';
import './style/reset.css';
import './style/style.css';
import App from './App.vue';
import router from './router';
import tooltip from '@/directives/tooltip.ts';

createApp(App).use(router).directive('tooltip', tooltip).mount('#app');
