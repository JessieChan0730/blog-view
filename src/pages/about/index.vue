<script setup lang="ts">
  import { SiteInfo, SiteInfoAPI } from '@/api/siteinfo'

  const siteinfo = reactive<SiteInfo>({
    title: '关于本站',
    content: '',
  })
  const initData = async () => {
    const response = await SiteInfoAPI.getSiteInfo()
    if (response) {
      siteinfo.title = response.title
      siteinfo.content = response.content
    }
  }

  const trySuccess = (response:any) => {
    if (response) {
      siteinfo.title = response.title
      siteinfo.content = response.content
    }
  }

  onMounted(async () => {
    await initData()
  })
</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title>
            {{ siteinfo.title }}
          </v-card-title>
        </v-card-item>
        <v-divider class="mb-2" />
        <v-card-item>
          <!-- TODO 放置内容-->
          <div v-if="siteinfo.content" v-dompurify-html="siteinfo.content" v-highlight class="content px-2" />
          <NetWorkError v-else :retry-fun="SiteInfoAPI.getSiteInfo" @retry-success="trySuccess" />
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
