import { createRouter, createWebHistory } from 'vue-router';
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue'; // 导入 Login 组件
import HomePage from '@/components/Home.vue'; // 导入 Home 组件

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login // 使用 defineComponent 定义 Login 组件
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage // 直接使用 Home 组件
    },
    // 其他路由配置...
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
