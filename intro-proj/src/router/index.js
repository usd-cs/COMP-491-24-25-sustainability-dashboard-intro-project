import { createRouter, createWebHistory } from 'vue-router';
import NewPage from '@/components/NewPage.vue';

const routes = [
    {
        path: '/loggedin',
        name: 'NewPage',
        component: NewPage,  
    },

];

const router = createRouter({
    history: createWebHistory(), // default path
    routes
});




export default router;
