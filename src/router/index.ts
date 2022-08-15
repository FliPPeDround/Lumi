import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/index.vue'),
      redirect: '/YoyoLumi',
      children: [
        {
          path: '/YoyoLumi',
          name: 'YoyoLumi',
          component: () => import('./../views/YoyoLumi/index.vue'),
        },
        {
          path: '/LumiVideo',
          name: 'LumiVideo',
          component: () => import('./../views/LumiVideo/index.vue'),
        },
      ],
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: () => import('./../views/Desktop/index.vue'),
    },
  ],
})

export default router
