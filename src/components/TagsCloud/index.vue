<script setup lang="ts">
  const loading = ref(false)
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
        class="ma-2"
        color="pink"
        label
        size="small"
      >
        <v-icon icon="mdi-label" start />
        Tags
      </v-chip>
    </div>
  </v-card>
</template>

<style scoped lang="sass">

</style>
