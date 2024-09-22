<script setup lang="ts">
  defineProps({
    loading: {
      type: Boolean,
      required: true,
    },
    persistent: {
      type: Boolean,
      require: false,
      default: true,
    },
  })
</script>

<template>
  <v-overlay
    class="align-center justify-center"
    :model-value="loading"
    :persistent="persistent"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    />
  </v-overlay>
</template>

<style scoped lang="sass">

</style>
