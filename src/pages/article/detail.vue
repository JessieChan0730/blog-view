<script setup lang="ts">
  import { Article, ArticleAPI } from '@/api/article'
  import { UserAPI } from '@/api/user'

  const route = useRoute()
  const authorName = ref('')
  const article = reactive<Article>({
    id: 1,
    title: '',
    content: '',
    intro: '',
    cover_url: '',
    recommend: true,
    category: {
      id: 1,
      name: '',
      display: true,
    },
    tags: [],
    create_date: '',
    update_date: '',
  })

  onMounted(async () => {
    const response = await ArticleAPI.viewArticle(route.params.id)
    const resUserinfo = await UserAPI.getUserInfo()
    if (response) {
      Object.assign(article, { ...response })
    }
    if (resUserinfo) {
      authorName.value = resUserinfo.nickname
    }
  })

  watch([() => route.params.id], async () => {
    const response = await ArticleAPI.viewArticle(route.params.id)
    if (response) {
      Object.assign(article, { ...response })
    }
  })

  const contentLength = computed(() => {
    return article.content.replace(/<[^>]+>/g, '').length
  })

  const readingTime = computed(() => {
    const minutes = contentLength.value / 250
    if (minutes < 1) {
      return '<1'
    }
    return Math.round(minutes).toString()
  })
</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100">
        <div class="review-container">
          <h2 class="blog-title">{{ article.title }}</h2>
          <div :class="$vuetify.display.smAndDown ? 'blog-info-mobile' : 'blog-info'">
            <div class="create-data">发表时间: {{ article.create_date }}</div>
            <div class="words-num">字数: {{ contentLength }}字</div>
            <div class="words-times">阅读时长: {{ readingTime }}分钟</div>
          </div>

          <div
            v-if="true"
            id="content"
            v-dompurify-html="article.content"
            v-highlight
            class="blog-content editor-content-view"
          />
          <v-divider class="my-3" :thickness="1" />
          <div class="blog-tags">
            <div class="flex gap-2 mb-4">
              <v-chip
                v-for="tag in article.tags"
                :key="tag.id"
                class="ma-2"
                :color="tag.color"
                label
                size="small"
              >
                <v-icon icon="mdi-label" start />
                {{ tag.name }}
              </v-chip>
            </div>
          </div>
          <div class="author-info">
            <ul>
              <li>1 作者：{{ authorName }}</li>
              <li>2 发表时间：{{ article.create_date }}</li>
              <li>3 最后修改：{{ article.update_date }}</li>
              <li>
                4 本站点采用 署名 4.0 国际 (CC BY 4.0)
                创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。
              </li>
            </ul>
          </div>
        </div>
      </v-card>
    </template>
  </Container>
</template>

<style scoped lang="scss">
.review-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  padding: 15px;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
  border: 1px solid #ddd;
  border-radius: 4px;

  .blog-title {
    text-align: center;
}

  .blog-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    font-size: 0.9rem;
    color: gray;

    & > div {
      padding: 12px 8px;
  }
}

  .blog-info-mobile {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    font-size: 0.78rem;
    color: gray;

    & > div {
      padding: 10px 4px;
    }
  }

  .blog-content {
    margin-bottom: 12px;
}

  .author-info {
    padding: 10px;
    font-size: 14px;
    color: #2c662d;
    background-color: #fcfff5;
    border: 1px solid #00b5ad;
    border-bottom: 2px solid #00b5ad;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: start;
      list-style: none;

      li {
        margin-bottom: 4px;
    }
  }
}
}
</style>
