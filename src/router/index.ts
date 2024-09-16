/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { RouteRecordRaw } from 'vue-router'
// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

export const Layout = () => import('@/layouts/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '主页' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },

  {
    path: '/category',
    component: Layout,
    redirect: '/category/home',
    name: 'Category',
    meta: { title: '分类' },
    children: [
      {
        path: 'home',
        name: 'categoryOne',
        meta: { title: '分类1' },
        component: () => import('@/pages/home/index.vue'),
      },
      {
        path: 'c2',
        name: 'categoryTwo',
        meta: { title: '分类2' },
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
  {
    path: '/photo',
    component: Layout,
    redirect: '/photo/index',
    name: 'Photo',
    meta: { title: '照片墙' },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/photo/index.vue'),
      },
    ],
  },
  {
    path: '/link',
    component: Layout,
    redirect: '/link/home',
    name: 'Link',
    meta: { title: '友情链接' },
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    name: 'About',
    meta: { title: '关于本站' },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
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
