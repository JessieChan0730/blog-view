<script setup lang="ts">
  import { Pagination } from '@/api/pagination'
  import { PhotosAPI, PhotoWall } from '@/api/photos'
  import { Ref } from 'vue'

  const photoWallPagination = reactive<Pagination<PhotoWall>>({
    count: 1,
    next: '',
    previous: '',
    results: [],
  })

  const photos = ref<PhotoWall[]>([])

  onMounted(async () => {
    const response = await PhotosAPI.getPhotos()
    if (response) {
      photoWallPagination.count = response.count
      photoWallPagination.next = response.next
      photoWallPagination.previous = response.previous
      photoWallPagination.results = response.results
      photos.value.push(...response.results)
    }
  })

  const maxPage = computed(() => {
    return Math.ceil(photoWallPagination.count / photoWallPagination.results.length)
  })

  const loadNextPage = async (nextPage:number, loading:Ref<boolean>) => {
    const response = await PhotosAPI.getPhotos(nextPage)
    if (response) {
      photos.value.push(...response.results)
      loading.value = false
    }
  }
</script>

<template>
  <ImageWaterfall :data="photos" :max-page="maxPage" @load="loadNextPage" />
</template>

<style scoped lang="scss"></style>
