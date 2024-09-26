<script setup lang="ts">
  import { Article, ArticleAPI } from '@/api/article'
  const router = useRouter()
  const loading = ref(false)
  const articles = ref<Article[]>([])

  onMounted(async () => {
    const response = await ArticleAPI.getRecommendArticle()
    if (response) {
      articles.value.push(...response)
    }
  })

  const viewArticle = (id: number) => {
    router.push(`/blog/${id}`)
  }
</script>

<template>
  <v-card
    class="mx-auto mb-6"
    :disabled="loading"
    :loading="loading"
    max-width="320"
  >
    <v-card-text>
      热门文章
    </v-card-text>
    <v-divider class="mb-2" color="#fbbd08" :thickness="2" />
    <div class="px-2">
      <v-card
        v-for="article in articles"
        :key="article.id"
        class="mx-auto mb-2"
        color="surface-variant"
        hover
        :image="article.cover_url"
      >
        <h1 class="title bg-color text-sm-body-2 px-1 py-1">
          {{ article.title }}
        </h1>
        <v-spacer class="mb-16" />
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="blue-lighten-1"
            text="点击查看详情"
            variant="outlined"
            @click="viewArticle(article.id)"
          />
        </template>
      </v-card>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.bg-color {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
