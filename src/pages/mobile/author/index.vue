<script setup lang="ts">
  import { User, UserAPI } from '@/api/user'

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
  const trySuccess = (response:any) => {
    if (response) {
    }
  }
  onMounted(async () => {
    const response = await UserAPI.getUserInfo()
    if (response) {
      Object.assign(user, { ...response })
    }
  })

</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title>
            关于 {{ user.nickname }}
          </v-card-title>
        </v-card-item>
        <v-divider class="mb-2" />
        <v-card-item>
          <!-- TODO 放置内容-->
          <div v-if="user.more_info" class="content px-2">
            <h3>😁个性签名</h3>
            <span class="text-sm-body-2 text-grey-darken-1">{{ user.signature }}</span>
            <v-divider class="my-2" />
            <h3>🤗我的社交媒体</h3>
            <ol class="my-1">
              <li v-for="(value,key) in user.more_info.media" :key="key">{{ key }}：<br><a :href="value">{{ value }}</a></li>
            </ol>
            <v-divider class="my-2" />
            <h3 class="mt-4">😍我的爱好</h3>
            <ul>
              <li v-for="(hobby,index) in user.more_info.hobby" :key="index" class="my-2">
                {{ 1 + index }}.{{ hobby.name }}
                <div class="text-sm-body-2 text-grey-darken-1">{{ hobby.detail }}</div>
              </li>
            </ul>
          </div>
          <NetWorkError v-else :retry-fun="UserAPI.getUserInfo" @retry-success="trySuccess" />
        </v-card-item>
      </v-card>
    </template>
  </Container>
</template>

<style scoped lang="scss">
.content {
  line-height: 1.8rem;
}
</style>
