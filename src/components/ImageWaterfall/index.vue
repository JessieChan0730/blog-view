<script setup lang="ts">
  import { useDisplay } from 'vuetify'

  interface Image {
    title: string,
    src: string
  }

  const props = defineProps({
    data: {
      type: Array<Image>,
      required: true,
    },
    lg: {
      type: Number,
      required: false,
      default: 3,
    },
    md: {
      type: Number,
      required: false,
      default: 2,
    },
    sm: {
      type: Number,
      required: false,
      default: 1,
    },
    maxWidth: {
      type: String,
      required: false,
      default: '1200px',
    },
    minWidth: {
      type: String,
      required: false,
      default: '800px',
    },
    width: {
      type: String,
      required: false,
      default: '1200px',
    },
    smWidth: {
      type: String,
      required: false,
      default: '700px',
    },
    mdWidth: {
      type: String,
      required: false,
      default: '1000px',
    },
  })

  const style = reactive<any>({
    maxWidth: '',
    width: '',
    minWidth: '',
    columnCount: 3,
    '-moz-column-count': 3,
    '-webkit-column-count': 3,
  })

  const {
    lg,
    md,
    sm,
  } = useDisplay()

  const setColumn = (cols: number) => {
    style.columnCount = cols
    style['-moz-column-count'] = cols
    style['-webkit-column-count'] = cols
  }

  const setWidth = (width: string) => {
    style.width = width
  }

  const init = () => {
    style.maxWidth = props.maxWidth
    style.minWidth = props.minWidth
    style.width = props.width
  }

  watch([() => lg.value, () => md.value, () => sm.value], () => {
    if (lg.value) {
      setColumn(props.lg)
      setWidth(props.width)
    } else if (md.value) {
      setColumn(props.md)
      setWidth(props.mdWidth)
    } else if (sm.value) {
      setColumn(props.sm)
      setWidth(props.smWidth)
    }
  })

  onMounted(() => {
    init()
  })

</script>

<template>
  <div class="waterfall-box" :style="style">
    <div v-for="image,index in data" :key="index" class="item">
      <v-card hover>
        <v-img
          alt="this is my photo"
          class="align-end"
          cover
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :src="image.src"
        >
          <v-card-title class="text-white" v-text="image.title" />
        </v-img>

        <v-card-actions>
          <v-spacer />

<!--          <v-btn-->
<!--            color="medium-emphasis"-->
<!--            icon="mdi-heart"-->
<!--            size="small"-->
<!--          />-->

<!--          <v-btn-->
<!--            color="medium-emphasis"-->
<!--            icon="mdi-bookmark"-->
<!--            size="small"-->
<!--          />-->

          <v-btn
            color="medium-emphasis"
            icon="mdi-share-variant"
            size="small"
          />
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.waterfall-box {
  margin: 1rem auto;
}

.item {
  margin-bottom: 1em;
  -webkit-column-break-inside: avoid;
  break-inside: avoid; /*防止断点*/
}
</style>
