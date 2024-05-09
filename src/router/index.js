import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import { isUserLoggedIn } from "@/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    redirect: "/overview",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/overview",
        name: "Overview",
        component: () => import("@/components/Overview.vue"),
      },
      {
        path: "/inputData",
        name: "InputData",
        component: () => import("@/components/Input.vue"),
      },
      {
        path: "/charts",
        name: "Charts",
        component: () => import("@/components/Charts.vue"),
      },
      {
        path: "/allData",
        name: "Data",
        component: () => import("@/components/Data.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isUserLoggedIn()) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
