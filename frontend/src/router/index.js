import { createRouter, createWebHistory } from 'vue-router';
import Unauthorized from '@/pages/unauthorized/App.vue';
import Authorized from '@/pages/authorized/App.vue';

const routes = [
  {
    path: '/',
    name: 'Unauthorized',
    component: Unauthorized,
  },
  {
    path: '/authorized',
    name: 'Authorized',
    component: Authorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
