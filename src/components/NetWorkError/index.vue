<script setup lang="ts">
  import connection from '@/assets/image/connection.svg'
  const emits = defineEmits(['retrySuccess'])
  defineProps({
    retryFun: {
      required: false,
      type: Function,
    },
  })

  const retry = async (retryFun:Function) => {
    const response = await retryFun()
    if (response) {
      emits('retrySuccess', response)
    }
  }
</script>

<template>
  <v-empty-state
    v-if="retryFun"
    action-text="重新尝试"
    :image="connection"
    text="网络出现故障了，请稍后尝试......."
    title="网络错误"
    @click="retry(retryFun)"
  />
  <v-empty-state
    v-else
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
    text="网络出现故障了，请稍后尝试......."
    title="网络错误"
  />
</template>

<style scoped lang="sass">

</style>
