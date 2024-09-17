<script setup lang="ts">
  const cards = ref([
    {
      title: 'Pre-fab homes',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    },
    {
      title: 'Favorite road trips',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    },
    {
      title: 'Best airlines',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    },
    {
      title: 'Best airlines',
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.TAhWzaPOrq-41L00kb-FfAHaHI&w=254&h=245&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
    },
    {
      title: 'Best airlines',
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
    },
    {
      title: 'Best airlines',
      src: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.7nyT9n1wOxyoAADJ8hbSRAHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    },
    {
      title: 'Best airlines',
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
    },
  ])
</script>

<template>
  <ImageWaterfall :data="cards" />

</template>

<style scoped lang="scss"></style>
