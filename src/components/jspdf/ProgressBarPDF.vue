<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Used Resources',
  },
  width: {
    type: Number,
    default: 50,
  },
})
</script>

<template>
  <div class="mx-5">
    <p class="text-center">{{ props.title }}</p>
    <div class="flex flex-row">
      <div class="flex flex-col w-full">
        <p class="pb-3">CPU</p>
        <div id="myBar" :style="'width: ' + props.width + '%'"></div>
      </div>
      <div class="flex flex-col w-full">
        <p class="pb-3">RAM</p>
        <div id="myBar" :style="'width: ' + props.width + '%'"></div>
      </div>
      <div class="flex flex-col w-full">
        <p class="pb-3">Storage</p>
        <div id="myBar" :style="'width: ' + props.width + '%'"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#myProgress {
  width: 100%;
  background-color: #ddd;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: #04aa6d;
}
</style>
