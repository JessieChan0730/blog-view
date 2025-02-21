<script setup lang="ts">
  import { PhotoWall } from '@/api/photos'
  import { Toast } from '@/utils/toast'
  import { useDisplay } from 'vuetify'

  const props = defineProps({
    data: {
      type: Array<PhotoWall>,
      required: true,
    },
    lg: {
      type: Number,
      required: false,
      default: 3,
    },
    md: {
      type: Number,
      required: false,
      default: 3,
    },
    sm: {
      type: Number,
      required: false,
      default: 2,
    },
    mobile: {
      type: Number,
      required: false,
      default: 1,
    },
    lgWidth: {
      type: String,
      required: false,
      default: '1200px',
    },
    mbWidth: {
      type: String,
      required: false,
      default: '21rem',
    },
    smWidth: {
      type: String,
      required: false,
      default: '700px',
    },
    mdWidth: {
      type: String,
      required: false,
      default: '1000px',
    },
    maxPage: {
      type: Number,
      required: true,
    },
  })
  const staticUrl = import.meta.env.VITE_APP_STATIC_URL
  const emit = defineEmits(['load'])

  const currentPage = ref(1)

  const loading = ref(false)

  const haveMoreData = ref(true)

  const style = reactive<any>({
    width: '',
    maxWidth: '',
    columnCount: 3,
    '-moz-column-count': 3,
    '-webkit-column-count': 3,
  })

  const {
    lg,
    md,
    sm,
    mobile,
  } = useDisplay()

  const setColumn = (cols: number) => {
    style.columnCount = cols
    style['-moz-column-count'] = cols
    style['-webkit-column-count'] = cols
  }

  const setWidth = (width: string) => {
    style.width = width
    style.maxWidth = width
  }

  watch([() => lg.value, () => md.value, () => sm.value, () => mobile.value], () => {
    if (lg.value) {
      setColumn(props.lg)
      setWidth(props.lgWidth)
    } else if (md.value) {
      setColumn(props.md)
      setWidth(props.mdWidth)
    } else if (sm.value) {
      setColumn(props.sm)
      setWidth(props.smWidth)
    } else if (mobile.value) {
      setColumn(props.mobile)
      setWidth(props.mbWidth)
    }
  }, {
    immediate: true,
  })

  const load = () => {
    if (currentPage.value > props.maxPage - 1) {
      haveMoreData.value = false
      Toast.error('没有更多数据了')
      return
    }
    loading.value = true
    currentPage.value++
    emit('load', currentPage.value, loading)
  }

  const share = async (url: string) => {
    try {
      const hostname = window.location.hostname
      const protocol = window.location.protocol
      const port = window.location.port
      const staticPrefix = import.meta.env.VITE_APP_STATIC_URL
      await navigator.clipboard.writeText(`${protocol}//${hostname}:${port}${staticPrefix}/${url}`)
      Toast.success('复制图片链接成功')
    } catch (e) {
      // 如果现代API不可用，尝试使用老方法
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        Toast.success('复制图片链接成功')
      } catch (err) {
        console.error('复制失败', err)
        Toast.error('无法复制链接，请手动复制。')
      }
    }
  }
</script>

<template>
  <div v-show="data.length > 0" class="waterfall-box" :style="style">
    <div v-for="image,index in data" :key="index" class="item">
      <v-card hover>
        <v-img
          alt="error photo"
          class="align-end"
          cover
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :src="`${staticUrl}/${image.image}`"
        >
          <v-card-title class="text-white" v-text="image.description" />
        </v-img>

        <v-card-actions>
          <v-spacer />

          <!--          <v-btn-->
          <!--            color="medium-emphasis"-->
          <!--            icon="mdi-heart"-->
          <!--            size="small"-->
          <!--          />-->

          <!--          <v-btn-->
          <!--            color="medium-emphasis"-->
          <!--            icon="mdi-bookmark"-->
          <!--            size="small"-->
          <!--          />-->

          <v-btn
            color="medium-emphasis"
            icon="mdi-share-variant"
            size="small"
            @click="share(image.image)"
          />
        </v-card-actions>
      </v-card>
    </div>
  </div>
  <v-empty-state
    v-show="data.length === 0"
    class="empty"
    icon="mdi-magnify"
    text="博客作者还没有发布一张照片呢，请慢慢等待作者发布的他的第一张照片吧"
    title="暂时没有图片"
  />
  <div v-if="data.length > 0" class="d-flex mb-6 justify-center align-center">
    <v-btn
      v-show="haveMoreData"
      class="px-6"
      color="black"
      :loading="loading"
      size="default"
      variant="tonal"
      @click="load"
    >
      加载更多
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.empty {
  min-height: 700px;
}

.waterfall-box {
  min-height: 900px;
  margin: 1rem auto;
}

.item {
  margin-bottom: 1em;
  -webkit-column-break-inside: avoid;
  break-inside: avoid; /*防止断点*/
}
</style>
