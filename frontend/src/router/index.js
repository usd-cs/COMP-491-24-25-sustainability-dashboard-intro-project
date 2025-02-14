import { createRouter, createWebHistory } from 'vue-router';
import Unauthorized from '@/pages/unauthorized/App.vue';
import Authorized from '@/pages/authorized/App.vue';
import Signup from '@/pages/unauthorized/SignUp.vue'; // Import Signup Page

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
  {
    path: '/signup',  // New route for Signup
    name: 'Signup',
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
