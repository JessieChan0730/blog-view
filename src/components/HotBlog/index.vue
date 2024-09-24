<script setup lang="ts">
  import { Article, ArticleAPI } from '@/api/article'

  const loading = ref(false)
  const articles = ref<Article[]>([])

  onMounted(async () => {
    const response = await ArticleAPI.getRecommendArticle()
    if (response) {
      articles.value.push(...response)
    }
  })

  const view = (id:number) => {
    console.log(id)
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
        class="mx-auto mb-1"
        color="surface-variant"
        :image="article.cover_url"
      >
        <div class="bg-color">
          <v-card-title>
            {{ article.title }}
          </v-card-title>
          <v-card-text>
            {{ article.intro }}
          </v-card-text>
        </div>
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="blue-lighten-1"
            text="点击查看详情"
            variant="outlined"
            @click="view(article.id)"
          />
        </template>
      </v-card>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.bg-color {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>
