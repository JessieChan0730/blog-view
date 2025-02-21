<script setup lang="ts">
  import { useRoutersStore } from '@/stores'
  import { isExternal } from '@/utils'
  import path from 'path-browserify'
  import { RouteRecordRaw } from 'vue-router'

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  })

  const routersStore = useRoutersStore()
  const onlyOneChild = ref()
  const router = useRouter()

  /**
   * 判断当前路由是否只有一个显示的子路由
   *
   * @param children 子路由数组
   * @param parent 父级路由对象
   * @returns 布尔值，表示是否只有一个显示的子路由
   */
  function hasOneShowingChild (
    children: RouteRecordRaw[] = [],
    parent: RouteRecordRaw
  ) {
    // 筛选出需要显示的子路由
    const showingChildren = children.filter((route: RouteRecordRaw) => {
      if (!route.meta || route.meta?.hidden) {
        return false
      } else {
        route.meta!.hidden = false
        onlyOneChild.value = route
        return true
      }
    })

    // 如果只有一个或没有显示的子路由
    if (showingChildren.length === 1) {
      return true
    }

    // 如果没有子路由，显示父级路由
    if (showingChildren.length === 0) {
      onlyOneChild.value = {
        ...parent,
        path: '',
        noShowingChildren: true,
      }
      return true
    }
    return false
  }

  /**
   * 解析路由路径，将相对路径转换为绝对路径
   *
   * @param routePath 路由路径
   * @returns 绝对路径
   */
  function resolvePath (routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }

    // 完整路径(/system/user) = 父级路径(/system) + 路由路径(user)
    const fullPath = path.resolve(props.basePath, routePath)
    return fullPath
  }

  const checkPage = (path: string, name: string) => {
    if (isExternal(path)) {
      return
    }
    router.push(path)
  }

  const isActive = (name: string) => {
    return routersStore.getActiveName() === name
  }

</script>

<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <v-list-item
      v-if="hasOneShowingChild(item.children, item as RouteRecordRaw) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.meta?.alwaysShow && !item.meta.detail"
      :active="isActive(onlyOneChild.name)"
      link
      :prepend-icon="item.meta.icon"
      :title="item.meta.title"
      @click="checkPage(resolvePath(item.path),onlyOneChild.name)"
    />

    <v-list-group
      v-else
      :prepend-icon="item.meta.icon"
      :title="item.meta.title"
    >
      <template #activator="{ props: activatorProps }">
        <v-list-item v-bind="activatorProps" />
      </template>

      <v-list-item
        v-for="child in item.children"
        :key="child.path"
        :active="isActive(child.name)"
        link
        :value="child.path"
      >
        <v-list-item-title @click="checkPage(resolvePath(child.path),child.name)">{{ child.meta.title }}</v-list-item-title>
      </v-list-item>
    </v-list-group>
  </div>
</template>

<style scoped lang="scss">

</style>
