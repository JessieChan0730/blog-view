import { DynamicRouter } from '@/api/router'
import { RouterStatusEnum } from '@/enums/RouterStatusEnum'
import router, { constantRoutes } from '@/router'
import { Toast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../../pages/**/**.vue')

export const useRoutersStore = defineStore('routers', () => {
  /**
   * 应用中所有的路由列表，包括静态路由和动态路由
   */
  const routes = ref<RouteRecordRaw[]>([])

  /**
   * 路由状态
   */
  const isLoading = ref<RouterStatusEnum>(RouterStatusEnum.INIT)

  /**
   * 当前选中的路由
   */

  const activeName = ref<string>()

  async function generateRoutes () {
    try {
      for (const route of constantRoutes) {
        if (route.meta && route.meta.dynamic && route.meta.api) {
          const items = await DynamicRouter.getRouter(route.meta.api as string)
          items.forEach((item: any) => {
            const child = {
              path: '' + item.id,
              name: item.id + item.name,
              meta: {
                title: item.name,
              },
              component: modules[`../../pages/${route.meta!.component}/index.vue`] ||
                modules[`../../pages/${route.meta!.component}.vue`] ||
                modules[`../../pages/${route.meta!.component}/${route.meta!.component}.vue`] ||
                modules[`../../views/error-page/404.vue`],
            }
            if (route.children) {
              route.children.push(child)
            } else {
              route.children = [child]
            }
            router.addRoute(route.name as string, child)
          })
        }
      }
      routes.value = constantRoutes
      isLoading.value = RouterStatusEnum.FINISH
      // 如果需要，可以在这里返回 constantRoutes 或其他值
    } catch (error) {
      isLoading.value = RouterStatusEnum.ERROR
      // 处理错误，例如通过日志记录或显示错误消息
      Toast.error('动态路由请求失败')
      // 显示定义的静态路由
      const staticRouters = constantRoutes.filter(router => router.meta && !router.meta.dynamic)
      routes.value = staticRouters
      console.error('Failed to fetch dynamic routes:', error)
    }
    // return new Promise((resolve, reject) => {
    //   for (const route of constantRoutes) {
    //     if (route.meta && route.meta.dynamic && route.meta.api) {
    //       DynamicRouter.getRouter(route.meta.api as string)
    //         .then(items => {
    //           items.forEach((item:any) => {
    //             const child = {
    //               path: '' + item.id,
    //               name: item.id + item.name,
    //               meta: {
    //                 title: item.name,
    //               },
    //               component: modules[`../../pages/${route.meta!.component}/index.vue`] || modules[`../../pages/${route.meta!.component}.vue`] || modules[`../../pages/${route.meta!.component}/${route.meta!.component}.vue`] || modules[`../../views/error-page/404.vue`],
    //             }
    //             route.children?.push(child)
    //             router.addRoute(route.name as string, child)
    //           })
    //           routes.value = constantRoutes
    //           // 加载完成
    //           isLoading.value = RouterStatusEnum.FINISH
    //           resolve(constantRoutes)
    //         })
    //         .catch(error => {
    //           //   加载失败
    //           isLoading.value = RouterStatusEnum.ERROR
    //           reject(error)
    //         })
    //     }
    //   }
    //   if (isLoading.value === RouterStatusEnum.INIT && routes.value.length === 0) {
    //     routes.value = constantRoutes
    //     // 加载完成
    //     isLoading.value = RouterStatusEnum.FINISH
    //     resolve(constantRoutes)
    //   }
    // })
  }

  function getStatus () {
    return isLoading.value
  }

  function getRouters () {
    return routes.value
  }
  function setActiveName (name:string) {
    activeName.value = name
  }

  function getActiveName () {
    return activeName.value
  }

  return {
    generateRoutes,
    getStatus,
    getRouters,
    setActiveName,
    getActiveName,
  }
})
