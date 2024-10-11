<script setup lang="ts">
  import { User, UserAPI } from '@/api/user'
  import AppBarItem from '@/layouts/components/AppBar/components/AppBarItem.vue'
  import AppBarItemMobile from '@/layouts/components/AppBar/components/AppBarItemMobile.vue'
  import { useRoutersStore } from '@/stores'
  import { useFrontSettings } from '@/stores/modules/settings'
  import { isExternal } from '@/utils'
  import path from 'path-browserify'
  import { shallowRef } from 'vue'
  import { RouteRecordRaw } from 'vue-router'
  import Bus from '@/utils/sub'
  const staticUrl = import.meta.env.VITE_APP_STATIC_URL
  const drawer = shallowRef(false)
  const router = useRouter()

  const routersStore = useRoutersStore()
  const searchContent = ref<string>('')
  const settings = useFrontSettings()

  const user = reactive<User>({
    nickname: '',
    signature: '',
    avatar: '',
    more_info: {
      hobby: [],
      media: {
        github: '',
        csdn: '',
        tiktok: '',
        bilibili: '',
      },
    },
  })

  const routes = ref<RouteRecordRaw[]>()
  onMounted(async () => {
    await settings.get()
    const response = await UserAPI.getUserInfo()
    if (response) {
      Object.assign(user, { ...response })
    }
    routes.value = routersStore.getRouters()
  })
  /**
   * 解析路径
   *
   * @param routePath 路由路径 /user
   */
  function resolvePath (basePath:string, routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }

    // 完整绝对路径 = 父级路径(/system) + 路由路径(/user)
    const fullPath = path.resolve(basePath, routePath)
    return fullPath
  }
  const search = () => {
    Bus.$emit('searchContent', searchContent.value)
  }

  const backToHome = () => {
    router.replace('/')
  }

</script>

<template>
  <v-app-bar class="px-md-8 border" flat>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />
    </template>

    <div class="d-flex flex-row justify-start align-center w-25">
      <v-img
        class="me-sm-8"
        max-width="40"
        src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
      />
      <v-app-bar-title v-if="$vuetify.display.mdAndUp" class="w-25 font-weight-bold font-weight-black d-sm-none d-lg-block d-md-block" style="cursor: pointer" @click="backToHome">{{ settings.frontSetting.website_title.value }}</v-app-bar-title>
    </div>

    <template v-if="$vuetify.display.mdAndUp">
      <AppBarItem
        v-for="route in routes"
        :key="route.path"
        :base-path="resolvePath('',route.path)"
        :item="route"
      />

    </template>
    <v-spacer />
    <v-text-field
      v-model="searchContent"
      :counter="5"
      :density="'compact'"
      hide-details
      label="搜索文章"
      max-width="300"
      prepend-inner-icon="mdi-magnify"
      required
      variant="solo-inverted"
      @keyup.enter="search"
    />

    <template #append>
      <v-btn
        class="ms-1 opacity-60"
        icon="mdi-bell-outline"
      />
    </template>
  </v-app-bar>
  <!--路由控制-->
  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="top"
    temporary
    width="355"
  >
    <v-list class="py-0" slim>
      <AppBarItemMobile
        v-for="route in routes"
        :key="route.path"
        :base-path="resolvePath('',route.path)"
        :item="route"
      />
      <v-divider />
      <v-list-item
        lines="two"
        link
        :prepend-avatar="`${staticUrl}/${user.avatar}`"
        subtitle="关于作者"
        :title="user.nickname"
        @click="()=> router.push('/author')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
