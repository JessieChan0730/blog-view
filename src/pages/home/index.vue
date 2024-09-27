<script setup lang="ts">
  import { Article, ArticleAPI, ArticleParams } from '@/api/article'
  import { Pagination } from '@/api/pagination'
  import { useScroll } from '@/hooks/scroll'
  import { useFrontSettings } from '@/stores/modules/settings'

  const frontSetting = useFrontSettings()
  const router = useRouter()
  const page = ref<number>(1)
  const articles = reactive<Pagination<Article>>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })
  const loadData = async (params?: ArticleParams) => {
    const response = await ArticleAPI.getArticles(params)
    if (response) {
      Object.assign(articles, { ...response })
    }
  }
  onMounted(async () => {
    await frontSetting.get()
    await loadData({ page: 1 })
  })
  const greeting = computed(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12){
      return '早上好，愿您的每一天都像阳光般灿烂'
    }else if(hours < 16){
      return   '下午好，愿您有个美好的下午'
    }else {
      return  '晚上好，愿您有个美丽的梦乡'
    }
  })

  watch(() => page.value, async () => {
    await loadData({ page: page.value })
    useScroll(1014)
  })
  const length = computed(() => {
    return Math.ceil(articles.count / Number(frontSetting.frontSetting.blog.page_size.value))
  })

  const viewArticle = (id: number) => {
    router.push(`/blog/${id}`)
  }
</script>

<template>
  <v-parallax
    ref="parallax"
    class="mb-5"
    :src="frontSetting.frontSetting.website_cover.value"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        欢迎！
      </h1>
      <h4 class="subheading">
        {{ greeting }}
      </h4>
    </div>
  </v-parallax>
  <Container>
    <template #default>
      <v-hover
        v-for="article in articles.results"
        :key="article.id"
        v-slot="{ isHovering, props }"
        close-delay="100"
        open-delay="100"
      >
        <v-card
          border="sm"
          class="mx-auto mb-4 w-100"
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2"
          v-bind="props"
        >
          <v-img
            class="border-b-sm"
            cover
            height="360px"
            :src="article.cover_url"
          />

          <v-card-title>
            {{ article.title }}
          </v-card-title>

          <v-card-subtitle class="py-2">
            发布时间：{{ article.create_date }}
          </v-card-subtitle>
          <v-chip-group class="mb-2 px-3" column>
            <v-chip
              v-for="tag in article.tags"
              :key="tag.id"
              :color="tag.color"
              density="comfortable"
              label
            >
              <v-icon icon="mdi-label" start />
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
          <v-divider />
          <v-card-text>
            {{ article.intro }}
          </v-card-text>
          <v-card-actions class="flex-0-0 justify-end">

            <v-btn
              color="purple-darken-2"
              text="查看全文"
              @click="viewArticle(article.id)"
            />

          </v-card-actions>
        </v-card>
      </v-hover>
      <v-pagination
        v-model="page"
        class="mx-auto mt-5"
        :length="length"
        :total-visible="7"
      />
    </template>
  </Container>
</template>

<style scoped lang="sass">

</style>
