<script setup lang="ts">
  import { Article, ArticleAPI, ArticleParams } from '@/api/article'
  import { CategoryAPI } from '@/api/category'
  import { Pagination } from '@/api/pagination'
  import { useScroll } from '@/hooks/scroll'
  import { useFrontSettings } from '@/stores/modules/settings'
  import Bus from '@/utils/sub'
  const frontSetting = useFrontSettings()
  const route = useRoute()
  const router = useRouter()
  const page = ref(1)
  const categoryId = ref<number | string>()
  const categoryName = ref<string>('')
  const articles = reactive<Pagination<Article>>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })

  const loadArticleList = async (params?:ArticleParams) => {
    const resArticle = await ArticleAPI.getArticles(params)
    if (resArticle) {
      Object.assign(articles, { ...resArticle })
    }
  }

  const loadCategoryName = async (categoryId:number | string) => {
    const resCategory = await CategoryAPI.getCategoryDetail(categoryId as string | number)
    if (resCategory) {
      categoryName.value = resCategory.name
    }
  }

  onMounted(async () => {
    await frontSetting.get()
    categoryId.value = parseId(route.fullPath)
  })

  onBeforeUnmount(() => {
    Bus.$off('searchContent')
  })

  watch([() => route.fullPath], () => {
    categoryId.value = parseId(route.fullPath)
  })
  /**
   * 监听器：监听切换分类
   */
  watch(categoryId, async () => {
    await loadCategoryName(categoryId.value as string | number)
    await loadArticleList({ category: categoryId.value as number })
    page.value = 1
  })
  /**
   * 监听器：监听分页且切换
   */
  watch(() => page.value, async () => {
    await loadArticleList({ category: categoryId.value as number, page: page.value })
    useScroll(60)
  })
  /**
   * 订阅
   */
  Bus.$on('searchContent', async (searchContent:string) => {
    await loadArticleList({ category: categoryId.value as number, page: 1, search: searchContent })
    useScroll(60)
  })

  const parseId = (path:string) => {
    const pathParts = path.split('/')
    pathParts.shift()
    return pathParts.pop()
  }
  const length = computed(() => {
    return Math.ceil(articles.count / Number(frontSetting.frontSetting.blog.page_size.value))
  })
  const viewArticle = (id: number) => {
    router.push(`/blog/${id}`)
  }
</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100 mb-4">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title class="text-sm-h5">
            分类 {{ categoryName }} 下的文章
          </v-card-title>
        </v-card-item>
      </v-card>
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
        v-if="articles.results.length !== 0"
        v-model="page"
        class="mx-auto mt-5"
        :length="length"
        :total-visible="7"
      />
      <v-card v-else class="w-100" style="height: 562px">
        <v-empty-state

          icon="mdi-magnify"
          text="暂时还没有任何相关的博客，请静静等待作者发布博客吧"
          title="暂无博客"
        />
      </v-card>
    </template>
  </Container>
</template>

<style scoped lang="sass">

</style>
