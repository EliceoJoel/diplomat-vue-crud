import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { createRouter, createWebHistory } from 'vue-router';
import List from './components/pages/List.vue';
import Create from './components/pages/Create.vue';
import Edit from './components/pages/Edit.vue';

  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: List },
    { path: '/create', component: Create },
    { path: '/edit/:id', component: Edit },
  ],
});
  
createApp(App).use(router).mount('#app');