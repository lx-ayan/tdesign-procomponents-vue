import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import ProComponent from 'procomponent-tdesign-vue';
import 'procomponent-tdesign-vue/lib/es/style/index.css';

createApp(App).use(TDesign).use(ProComponent).mount('#app')
