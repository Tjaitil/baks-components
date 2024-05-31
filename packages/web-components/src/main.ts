import { createApp } from 'vue';
import { register } from '../lib/main';
import App from './App.vue';
import {} from '../lib/main';

register();
const app = createApp(App);
app.mount('#app');
