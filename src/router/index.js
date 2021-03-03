import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from "@/views/Home";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:text',
    name: 'Page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Page.vue'),
  },
];

const router = createRouter({
  // history: createWebHashHistory(), //hash mode
  history: createWebHistory(),
  routes
});

export default router;
