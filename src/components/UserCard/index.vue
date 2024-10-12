<script setup lang="ts">
  import { User } from '@/api/user'
  import { useUserStore } from '@/stores'
  const staticUrl = import.meta.env.VITE_APP_STATIC_URL
  const loading = ref(false)
  const userStore = useUserStore()
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

  onMounted(async () => {
    const userInfo = await userStore.get()
    Object.assign(user, userInfo)
  })

  const checkMedia = (link:string) => {
    window.location.href = link
  }
</script>

<template>
  <v-card
    class="mx-auto"
    :disabled="loading"
    :loading="loading"
    max-width="320"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      />
    </template>

    <v-img
      cover
      height="300"
      :src="`${staticUrl}/${user.avatar}`"
    />

    <v-card-item class="d-flex flex-column justify-center align-center">
      <v-card-title class="text-center">{{ user.nickname }}</v-card-title>
      <v-card-subtitle class="text-center">
        {{ user.signature }}
      </v-card-subtitle>
    </v-card-item>

    <v-divider class="mx-4 my-2" />

    <v-card-item>
      <v-row align="center" no-gutters>
        <v-col
          class="d-flex justify-center align-center px-0"
          :cols="12"
          :lg="3"
          :md="6"
          :sm="12"
        >
          <v-tooltip location="top" :text="user.more_info.media.csdn">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :block="false"
                class="text-caption"
                density="compact"
                rounded="circle"
                size="40"
                variant="tonal"
                @click="checkMedia(user.more_info.media.csdn)"
              >
                <i class="iconfont icon-csdn text-h6" />
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-col
          class="d-flex justify-center align-center px-0"
          :cols="12"
          :lg="3"
          :md="6"
          :sm="12"
        >
          <v-tooltip location="top" :text="user.more_info.media.tiktok">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :block="false"
                class="text-caption"
                density="compact"
                icon="mdi-github"
                rounded="circle"
                size="40"
                variant="tonal"
                @click="checkMedia(user.more_info.media.tiktok)"
              >
                <i class="iconfont icon-icon_TikTok-circle text-h5" />
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-col
          class="d-flex justify-center align-center px-0"
          :cols="12"
          :lg="3"
          :md="6"
          :sm="12"
        >
          <v-tooltip location="top" :text="user.more_info.media.bilibili">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :block="false"
                class="text-caption"
                density="compact"
                icon="mdi-github"
                rounded="circle"
                size="40"
                variant="tonal"
                @click="checkMedia(user.more_info.media.bilibili)"
              >
                <i class="iconfont icon-icon_bilibili-circle text-h5" />
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-col
          class="d-flex justify-center align-center px-0"
          :cols="12"
          :lg="3"
          :md="6"
          :sm="12"
        >
          <v-tooltip location="top" :text="user.more_info.media.github">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :block="false"
                class="text-caption"
                density="compact"
                rounded="circle"
                size="40"
                variant="tonal"
                @click="checkMedia(user.more_info.media.github)"
              >
                <i class="iconfont icon-github text-h6" />
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider class="mx-4 my-2" />
    <v-card-item>
      <v-list density="compact">
        <v-list-group v-for="hobby in user.more_info.hobby" :key="hobby.name" class="mb-1">
          <template #activator="{ props }">
            <v-list-item
              v-bind="{ ...props, title: hobby.name }"
              :title="hobby.name"
            />
          </template>
          <div class="px-4 py-2 text-grey-darken-1">
            {{ hobby.detail }}
          </div>
        </v-list-group>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<style scoped lang="sass">

</style>
