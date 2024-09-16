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
      热门文章
    </v-card-text>
    <v-divider class="mb-2" color="#fbbd08" :thickness="2" />
    <div class="px-2">
      <v-card
        class="mx-auto mb-1"
        color="surface-variant"
        image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
        subtitle="Take a walk down the beach"
        title="Evening sunset"
      >
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="red-lighten-2"
            text="Book Activity"
            variant="outlined"
          />
        </template>
      </v-card>
      <v-card
        class="mx-auto mb-1"
        color="surface-variant"
        image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
        subtitle="Take a walk down the beach"
        title="Evening sunset"
      >
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="red-lighten-2"
            text="Book Activity"
            variant="outlined"
          />
        </template>
      </v-card>
      <v-card
        class="mx-auto mb-1"
        color="surface-variant"
        image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
        subtitle="Take a walk down the beach"
        title="Evening sunset"
      >
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="red-lighten-2"
            text="Book Activity"
            variant="outlined"
          />
        </template>
      </v-card>
      <v-card
        class="mx-auto mb-1"
        color="surface-variant"
        image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
        subtitle="Take a walk down the beach"
        title="Evening sunset"
      >
        <template #actions>
          <v-btn
            append-icon="mdi-chevron-right"
            block
            color="red-lighten-2"
            text="Book Activity"
            variant="outlined"
          />
        </template>
      </v-card>
    </div>
  </v-card>
</template>

<style scoped lang="sass">

</style>
