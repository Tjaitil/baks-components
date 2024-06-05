import { createApp } from 'vue';
import { register } from '../lib';
import App from './App.vue';
import { resolveVariant } from '@baks-components/shared';

register();
const app = createApp(App);
app.mount('#app');
