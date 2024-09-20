<script setup lang="ts">
  import AppBarItem from '@/layouts/components/AppBar/components/AppBarItem.vue'
  import { useRoutersStore } from '@/stores'
  import { isExternal } from '@/utils'
  import path from 'path-browserify'
  import { shallowRef } from 'vue'
  import { RouteRecordRaw } from 'vue-router'
  const drawer = shallowRef(false)

  const routersStore = useRoutersStore()
  const routes = ref<RouteRecordRaw[]>()
  onMounted(async () => {
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
      <v-app-bar-title class="w-25 font-weight-bold font-weight-black d-sm-none d-lg-block d-md-block">Jessie`Blog</v-app-bar-title>
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
      :counter="5"
      density="compact"
      hide-details
      label="搜索文章"
      max-width="300"
      prepend-inner-icon="fa:fas fa-search"
      required
      variant="solo-inverted"
    />

    <template #append>
      <v-btn
        class="ms-1 opacity-60"
        icon="mdi-bell-outline"
      />
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="top"
    temporary
    width="355"
  >
    <v-list class="py-0" slim>
      <v-list-item link prepend-icon="mdi-home-outline" title="Dashboard" />

      <v-list-group
        prepend-icon="mdi-account-multiple-outline"
        title="Customers"
      >
        <template #activator="{ props: activatorProps }">
          <v-list-item v-bind="activatorProps" />
        </template>

        <v-list-item
          link
          prepend-icon="mdi-account-plus-outline"
          title="Create New"
        />

        <v-list-group prepend-icon="mdi-magnify" title="Search">
          <template #activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" />
          </template>

          <v-list-item
            link
            prepend-icon="mdi-account-outline"
            title="By Name"
          />

          <v-list-item
            link
            prepend-icon="mdi-email-outline"
            title="By Email"
          />

          <v-list-item
            link
            prepend-icon="mdi-phone-outline"
            title="By Phone"
          />
        </v-list-group>
      </v-list-group>

      <v-list-item link prepend-icon="mdi-calendar" title="Calendar" />

      <v-list-item link prepend-icon="mdi-poll" title="Analytics" />

      <v-divider />

      <v-list-item link prepend-icon="mdi-inbox-outline" title="Inbox" />

      <v-list-item
        link
        prepend-icon="mdi-bell-outline"
        title="Notifications"
      />

      <v-divider />

      <v-list-item
        lines="two"
        link
        prepend-avatar="https://vuetifyjs.b-cdn.net/docs/images/avatars/planetary-subscriber.png"
        subtitle="Vuetify Engineer"
        title="John Leider"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
