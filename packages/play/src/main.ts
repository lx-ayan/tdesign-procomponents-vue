import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/'
import ProComponent from 'tdesign-vue-procomponents';

createApp(App).use(TDesign).use(ProComponent).mount('#app')
