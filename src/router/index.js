import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import { isUserLoggedIn } from '@/auth';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    redirect: '/overview',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: () => import('@/components/Overview.vue')
      },
      {
        path: '/inputData',
        name: 'InputData',
        component: () => import('@/components/Input.vue')
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/components/Charts.vue')
      },
      {
        path: '/allData',
        name: 'Data',
        component: () => import('@/components/Data.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isUserLoggedIn()) {
      //console.log('User is not logged in. Redirecting to Login.');
      next({ name: 'Login' });
    } else {
      //console.log('User is logged in. Proceeding to next route.');
      next();
    }
  } else {
    //console.log('No authentication required. Proceeding to next route.');
    next();
  }
});


export default router;
