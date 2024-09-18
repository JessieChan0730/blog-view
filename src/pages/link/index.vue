<script setup lang="ts">

</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title>
            小伙伴们
          </v-card-title>
        </v-card-item>
        <v-divider class="mb-2" />
        <v-card-item>
          <v-row>
            <v-col :cols="12" :lg="4" md="4" sm="6">
              <v-card color="indigo" hover>
                <v-card-item class="d-flex flex-row justify-center align-center">
                  <v-img height="80" rounded="circle" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" width="80" />
                </v-card-item>
                <v-card-item>
                  <div>
                    <div class="text-h6 text-center mb-1">
                      Headline
                    </div>
                    <div class="text-caption text-center text-ellipsis">Greyhound divisely hello coldly fonwderfully</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col :cols="12" :lg="4" md="4" sm="6">
              <v-card color="indigo" hover>
                <v-card-item class="d-flex flex-row justify-center align-center">
                  <v-img height="80" rounded="circle" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" width="80" />
                </v-card-item>
                <v-card-item>
                  <div>
                    <div class="text-h6 text-center mb-1">
                      Headline
                    </div>
                    <div class="text-caption text-center text-ellipsis">Greyhound divisely hello coldly fonwderfully</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col :cols="12" :lg="4" md="4" sm="6">
              <v-card color="indigo" hover>
                <v-card-item class="d-flex flex-row justify-center align-center">
                  <v-img height="80" rounded="circle" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" width="80" />
                </v-card-item>
                <v-card-item>
                  <div>
                    <div class="text-h6 text-center mb-1">
                      Headline
                    </div>
                    <div class="text-caption text-center text-ellipsis">Greyhound divisely hello coldly fonwderfully</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col :cols="12" :lg="4" md="4" sm="6">
              <v-card color="#000" hover>
                <v-card-item class="d-flex flex-row justify-center align-center">
                  <v-img height="80" rounded="circle" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" width="80" />
                </v-card-item>
                <v-card-item>
                  <div>
                    <div class="text-h6 text-center mb-1">
                      Headline
                    </div>
                    <div class="text-caption text-center text-ellipsis">Greyhound divisely hello coldly fonwderfully</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider class="mb-2" color="#00b5ad" opacity="100" :thickness="2" />
        <v-card-item>
          <div class="apply d-flex flex-row justify-end align-center text-cyan-lighten-1">
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" prepend-icon="$plus" variant="text">
                  加入友链
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Dialog">
                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close Dialog"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
          <div class="statement">
            <h1>
              哈哈哈
            </h1>
          </div>
        </v-card-item>
        <v-divider color="#00b5ad" opacity="100" :thickness="2" />
      </v-card>
    </template>
  </Container>
</template>

<style scoped lang="scss">
.rounded-circle {
  border-radius: 50%;
  overflow: hidden; /* 确保图片不会溢出圆形边界 */
  /* 可以根据需要添加更多样式，比如宽度、高度等 */
  width: 100px; /* 或者其他你需要的尺寸 */
  height: 100px; /* 保持宽高一致以形成完美的圆形 */
}

.text-ellipsis {
  width: 100%; /* 或者其他固定宽度，根据需要设置 */
  white-space: nowrap; /* 保持文本在一行显示 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
</style>
