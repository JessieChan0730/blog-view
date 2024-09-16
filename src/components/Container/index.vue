<script setup lang="ts">

</script>

<template>
  <v-container :max-width="1420" :min-width="1000">
    <v-row>
      <v-col :cols="12" :lg="3">
        <UserCard />
        <slot name="left" />
      </v-col>
      <v-col :cols="12" :lg="6">
        <div class="d-flex flex-column justify-start align-center">
          <slot />
        </div>
      </v-col>
      <v-col :cols="12" :lg="3">
        <HotBlog />
        <TagsCloud />
        <slot name="right" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
</style>
