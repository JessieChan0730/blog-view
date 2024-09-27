<script setup lang="ts">
  import { useFrontSettings } from '@/stores/modules/settings'
  import wechart from '@/assets/image/wechart.jpg'
  import { Toast } from '@/utils/toast'
  const settings = useFrontSettings()
  onMounted(async () => {
    await settings.get()
  })
  const intoGithub = () => {
    window.location.href = 'https://github.com/JessieChan0730/blog-view'
  }
  const copy = async (content:string, successMsg:string) => {
    try {
      await navigator.clipboard.writeText(content)
      Toast.success(successMsg)
    } catch (e) {
      // 如果现代API不可用，尝试使用老方法
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        Toast.success(successMsg)
      } catch (err) {
        console.error('复制失败', err)
        Toast.error('无法复制，请手动复制。')
      }
    }
  }
  const share = () => {
    const url = window.location.href
    copy(url, '复制网站链接成功')
  }
</script>

<template>
  <v-footer
    app
    class="bg-grey-darken-3 text-center d-flex flex-column"
  >
    <div>
      <v-dialog max-width="500">
        <template #activator="{ props: activatorProps }">
          <v-btn
            class="mx-4"
            v-bind="activatorProps"
            icon="mdi-wechat"
            variant="text"
          />
        </template>

        <template #default="{ isActive }">
          <v-card title="支持作者">
            <v-img height="400" :src="wechart" />
            <v-card-actions>
              <v-spacer />
              <v-btn
                text="关闭"
                @click="isActive.value = false"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-tooltip location="top" text="支持本项目">
        <template #activator="{ props }">
          <v-btn
            class="mx-4"
            v-bind="props"
            icon="mdi-github"
            variant="text"
            @click="intoGithub"
          />
        </template>
      </v-tooltip>
      <v-tooltip location="top" text="联系作者: 2403428097@qq.com">
        <template #activator="{ props }">
          <v-btn
            class="mx-4"
            v-bind="props"
            icon="mdi-email"
            variant="text"
            @click="copy('2403428097@qq.com','复制联系方式成功')"
          />
        </template>
      </v-tooltip>
      <v-tooltip location="top" text="分享本站">
        <template #activator="{ props }">
          <v-btn
            class="mx-4"
            v-bind="props"
            icon="mdi-share"
            variant="text"
            @click="share"
          />
        </template>
      </v-tooltip>
    </div>
    <v-row class="w-66 d-flex align-center ma-2 mb-3">
      <v-col lg="1" />
      <v-col class="pt-0 my-2" :lg="4">
        最新博客
        <ul
          class="d-flex flex-column justify-center align-center text-grey-lighten-1 text-sm-body-2 ma-1"
          style="list-style: none"
        >
          <li class="my-1 list-hover">关于我从俄乌局势联想到密码学这档事</li>
          <li class="my-1">关于我从俄乌局势联想到密码学这档事</li>
          <li class="my-1">2023 年度总结</li>
        </ul>
      </v-col>
      <v-col :lg="2">
        <v-divider length="140" :thickness="1" vertical />
      </v-col>
      <v-col class="pt-0  my-2 text-sm-body-2" :lg="4">
        <div class="mb-2 d-flex justify-start">
          青青园中葵，朝露待日晞。
          阳春布德泽，万物生光辉。
          常恐秋节至，焜黄华叶衰。
          百川东到海，何时复西归？
          少壮不努力，老大徒伤悲！
        </div>
        <div class="d-flex justify-end">——《长歌行》</div>
      </v-col>
      <v-col lg="1" />
    </v-row>
    <div class="text-sm-body-2 mb-2">
      {{ settings.frontSetting.copyright.value }}
      |
      本网站由
      阿里云
      提供云服务器
      |
      {{ settings.frontSetting.record_info.value }}
    </div>
    <div>
      {{ new Date().getFullYear() }} — <strong>Jessie</strong>
    </div>
  </v-footer>
</template>

<style scoped lang="scss">
.list-hover:hover {
  color: white;
}
</style>
