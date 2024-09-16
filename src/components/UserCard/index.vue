<script setup lang="ts">
  const loading = ref(false)
  const open = ref(['User'])
</script>

<template>
  <v-card
    class="mx-auto"
    :disabled="loading"
    :loading="loading"
    max-width="320"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      />
    </template>

    <v-img
      cover
      height="300"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />

    <v-card-item class="d-flex flex-column justify-center align-center">
      <v-card-title>用户名</v-card-title>
      <v-card-subtitle>
        <span class="me-0">嘻嘻嘻嘻</span>
      </v-card-subtitle>
    </v-card-item>

    <v-divider class="mx-4 my-2" />

    <v-card-item>
      <v-row align="center" no-gutters>
        <v-col
          v-for="item in 4"
          class="d-flex justify-center align-center px-0"
          :cols="12"
          :lg="3"
          :md="6"
          :sm="12"
        >
          <v-btn
            :block="false"
            class="text-caption"
            density="compact"
            icon="$vuetify"
            size="40"
            variant="tonal"
          />
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider class="mx-4 my-2" />
    <v-card-item>
      <v-list v-model:opened="open" density="compact">
        <v-list-group class="mb-1" value="Users">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              title="我滴爱好"
            />
          </template>
          <div class="px-4 py-2 text-grey-darken-1">
            唱，跳，RAP，篮球,啊哈哈哈行哈哈哈哈哈啊啊哈哈爱好爱好
          </div>
        </v-list-group>
        <v-list-group class="mb-1" value="Avatar">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              title="我滴爱好"
            />
          </template>
          <div class="px-4 py-2 text-grey-darken-1">
            唱，跳，RAP，篮球,啊哈哈哈行哈哈哈哈哈啊啊哈哈爱好爱好
          </div>
        </v-list-group>
        <v-list-group class="mb-1" value="OK">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              title="我滴爱好"
            />
          </template>
          <div class="px-4 py-2 text-grey-darken-1">
            唱，跳，RAP，篮球,啊哈哈哈行哈哈哈哈哈啊啊哈哈爱好爱好
          </div>
        </v-list-group>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<style scoped lang="sass">

</style>
