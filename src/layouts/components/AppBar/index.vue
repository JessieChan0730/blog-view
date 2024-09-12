<script setup lang="ts">
import { shallowRef } from 'vue'

const drawer = shallowRef(false)
const items = [
  {
    text: 'Dashboard',
  },
  {
    text: 'Users',
  },
  {
    text: 'Projects',
  },
  {
    text: 'Settings',
  },
  {
    text: 'Contact',
  },
]
</script>

<template>
  <v-app-bar class="px-md-4" flat>
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
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :active="i === 0"
        class="me-2 text-none"
        slim
        v-bind="item"
      />
    </template>
    <v-spacer />
    <v-text-field
      prepend-inner-icon="fa:fas fa-search"
      variant="solo-inverted"
      max-width="300"
      density="compact"
      :counter="5"
      label="搜索文章"
      hide-details
      required
    ></v-text-field>

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
