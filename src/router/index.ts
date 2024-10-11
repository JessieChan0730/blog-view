/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { RouterStatusEnum } from '@/enums/RouterStatusEnum'
import { useRoutersStore } from '@/stores'
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
    meta: { title: '主页', icon: 'mdi-home-outline' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/category',
    component: Layout,
    name: 'Category',
    meta: {
      icon: 'mdi-shape-plus-outline',
      keepAlive: false,
      title: '分类',
      dynamic: true,
      api: 'api/front/category/',
      component: 'category',
      // childrenInfo: {
      //   titleField: 'name',
      //   nameField: 'name',
      //   pathField: 'id',
      //   component: 'category',
      // },
    },
    children: [],
  },
  {
    path: '/photo',
    component: Layout,
    redirect: '/photo/index',
    name: 'Photo',
    meta: { title: '照片墙', icon: 'mdi-camera' },
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
    redirect: '/link/index',
    name: 'Link',
    meta: { title: '友情链接', icon: 'mdi-link-variant' },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/link/index.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    name: 'About',
    meta: { title: '关于本站', icon: 'mdi-information-outline' },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/about/index.vue'),
      },
    ],
  },
  {
    path: '/blog',
    component: Layout,
    redirect: `/blog/1`,
    name: 'Blog',
    meta: { hidden: true },
    children: [
      {
        path: ':id',
        component: () => import('@/pages/article/detail.vue'),
      },
    ],
  },
  {
    path: '/author',
    component: Layout,
    redirect: '/author/index',
    name: 'Author',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/mobile/author/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

router.beforeEach(async (to, from, next) => {
  const routerStore = useRoutersStore()
  if (routerStore.getStatus() === RouterStatusEnum.INIT) {
    await routerStore.generateRoutes()
    next({
      ...to,
      replace: true,
    })
  } else if (to.matched.length === 0 && routerStore.getStatus() === RouterStatusEnum.FINISH) {
    next('/404')
  } else {
    // 路由加载完成，直接放行
    const name = to.name ?? to.matched[0].name ?? ''
    routerStore.setActiveName(name)
    next()
  }
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
