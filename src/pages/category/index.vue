<script setup lang="ts">
  const router = useRoute()

  const categoryId = ref<number | string>()

  onMounted(() => {
    categoryId.value = parseId(router.fullPath)
  })

  watch([() => router.fullPath], () => {
    categoryId.value = parseId(router.fullPath)
  })

  watch(categoryId, () => {
    console.log(categoryId.value)
  })

  const parseId = (path:string) => {
    const pathParts = path.split('/')
    pathParts.shift()
    return pathParts.pop()
  }
</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100 mb-4">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title class="text-sm-h5">
            分类 {{ categoryId }} 下的文章
          </v-card-title>
        </v-card-item>
      </v-card>
      <v-hover
        v-slot="{ isHovering, props }"
        close-delay="100"
        open-delay="100"
      >
        <v-card
          border="sm"
          class="mx-auto mb-2 "
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2"
          v-bind="props"
        >
          <v-img
            cover
            height="400px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          />

          <v-card-title>
            文章标题
          </v-card-title>

          <v-card-subtitle class="py-2">
            发布时间：{{ new Date().getFullYear() }}/02/03
          </v-card-subtitle>
          <v-chip-group class="mb-2 px-3" column>
            <v-chip
              v-for="topic in topics"
              :key="topic"
              color="pink"
              density="comfortable"
              :text="topic"
              :value="topic"
            />
          </v-chip-group>
          <v-divider />
          <v-card-text>
            最近俄乌局势持续升级，刷推看到一些视频，俄军坦克冲撞并碾压在对向车道行驶中的乌民用车
            （又有消息说是乌军坦克，尚不知真假，但平民的确是乌克兰人）...一位乌克兰父亲含泪将妻儿送上前往安全地区的车（又证实是假消息，
            与文无关...这年头想看到真实的消息太难了，无论怎样，总归是值得思考的一件事吧）......唉，只能说珍惜当下的和平吧......
          </v-card-text>
          <v-card-actions class="flex-0-0 justify-end">

            <v-btn
              color="purple-darken-2"
              text="查看全文"
              @click="gotoDetail(1)"
            />

          </v-card-actions>
        </v-card>
      </v-hover>
      <v-hover
        v-slot="{ isHovering, props }"
        close-delay="100"
        open-delay="100"
      >
        <v-card
          border="sm"
          class="mx-auto mb-2 "
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2"
          v-bind="props"
        >
          <v-img
            cover
            height="400px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          />

          <v-card-title>
            文章标题
          </v-card-title>

          <v-card-subtitle class="py-2">
            发布时间：{{ new Date().getFullYear() }}/02/03
          </v-card-subtitle>
          <v-chip-group class="mb-2 px-3" column>
            <v-chip
              v-for="topic in topics"
              :key="topic"
              color="pink"
              density="comfortable"
              :text="topic"
              :value="topic"
            />
          </v-chip-group>
          <v-divider />
          <v-card-text>
            最近俄乌局势持续升级，刷推看到一些视频，俄军坦克冲撞并碾压在对向车道行驶中的乌民用车
            （又有消息说是乌军坦克，尚不知真假，但平民的确是乌克兰人）...一位乌克兰父亲含泪将妻儿送上前往安全地区的车（又证实是假消息，
            与文无关...这年头想看到真实的消息太难了，无论怎样，总归是值得思考的一件事吧）......唉，只能说珍惜当下的和平吧......
          </v-card-text>
          <v-card-actions class="flex-0-0 justify-end">

            <v-btn
              color="purple-darken-2"
              text="查看全文"
              @click="gotoDetail(1)"
            />

          </v-card-actions>
        </v-card>
      </v-hover>
      <v-pagination
        v-model="page"
        class="mx-auto mt-5"
        :length="15"
        :total-visible="7"
      />
    </template>
  </Container>
</template>

<style scoped lang="sass">

</style>
