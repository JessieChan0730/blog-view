<script setup lang="ts">
  import { Tags, TagsAPI } from '@/api/tags'

  const loading = ref(false)
  const tags = ref<Tags[]>([])
  onMounted(async () => {
    const response = await TagsAPI.getAllTags()
    if (response) {
      tags.value.push(...response)
    }
  })
</script>

<template>
  <v-card
    class="mx-auto mb-6"
    :disabled="loading"
    :loading="loading"
    max-width="320"
  >
    <v-card-text>
      标签云
    </v-card-text>
    <v-divider class="mb-2" color="#fbbd08" :thickness="2" />
    <div class="px-2">
      <v-chip
        v-for="tag in tags"
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
  </v-card>
</template>

<style scoped lang="sass">

</style>
