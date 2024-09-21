<template>
  <v-footer
    app
    class="bg-grey-darken-3 text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      />
    </div>

    <div class="pt-0 w-75 my-2">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </div>

    <v-divider />
    <div class="text-sm-body-2 mb-2">Copyright © 2019 - 2024
      NACCL'S BLOG
      |
      本网站由
      又拍云
      提供云存储服务
      |
      闽ICP备20005222号</div>
    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  const icons = ref<string[]>([
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ])
</script>

<style scoped lang="sass">
</style>
