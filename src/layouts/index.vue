<template>
  <v-layout>
    <AppHeader />
    <AppMain />
    <AppFooter />
  </v-layout>
  <v-fade-transition>
    <v-fab
      v-show="showBackToTop"
      app
      icon="$collapse"
      location="bottom end"
      position="relative"
      size="large"
      style="bottom: 10px"
      @click="backToTop"
    />
  </v-fade-transition>
</template>

<script setup>
  import { useScroll } from '@/hooks/scroll'
  import AppHeader from './components/AppBar/index.vue'
  import AppFooter from './components/AppFooter/index.vue'
  import AppMain from './components/AppMain/index.vue'
  const showBackToTop = ref(false)
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  const handleScroll = () => {
    // 获取滚动高度
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    // 判断是否显示返回顶部按钮
    showBackToTop.value = scrollTop >= 1000
  }
  const backToTop = () => {
    useScroll(0)
  }
</script>
