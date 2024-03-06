import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';


const routes = [
    {
        path: '/',
        name: 'Login',
        component: import('@/components/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
        redirect: '/overview',
        children: [
            {
                path: '/overview',
                name: 'Overview',
                component:()=> import('@/components/Overview.vue')
            },
            {
                path: '/inputdata',
                name: 'InputData',
                component:() =>import('@/components/Input.vue')
            },
            {
                path: '/charts/:chartType',
                name: 'Charts',
                component:()=> import('@/components/Charts.vue')
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
