<template>
  <div
    v-if="props.value < 100"
    class="w-full bg-gray-500 rounded-full dark:bg-gray-700"
  >
    <div
      class="bg-blue-600 text-xs font-medium text-white dark:text-blue-100 text-center p-0.5 leading-none rounded-full"
      :style="'width: ' + props.value + '%'"
    >
      {{ props.value }}%
    </div>
  </div>
  <div
    v-if="props.value > 100"
    class="w-full bg-gray-500 rounded-full dark:bg-gray-700"
  >
    <div
      class="bg-red-600 text-xs font-medium text-white dark:text-blue-100 text-center p-0.5 leading-none rounded-full"
      :style="'width: ' + 100 + '%'"
    >
      {{ props.value }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps(['value'])
</script>
