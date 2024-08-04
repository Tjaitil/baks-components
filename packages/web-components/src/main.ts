import { createApp } from 'vue';
import { register } from '../lib';
import App from './App.vue';

register();
const app = createApp(App);
app.mount('#app');
