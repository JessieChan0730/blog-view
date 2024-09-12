/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { RouteRecordRaw } from 'vue-router'
// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

export const Layout = () => import("@/layouts/index.vue");

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue')
      }
    ]
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
