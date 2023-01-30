<script setup lang="ts">
import { Button } from 'flowbite-vue'
import IconArrowUp from '~/components/icons/IconArrowUp.vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="space-y-1">
    <div class="input-g flex justify-center">
      <Button
        color="alternative"
        class="flex justify-center"
        @click="
          () => {
            $emit('changed', props.value - 1)
          }
        "
      >
        <icon-arrow-up style="transform: rotate(180deg)"
      /></Button>
      <div class="flex basis-1/2 w-9 justify-center">{{ props.value }}</div>
      <Button
        color="alternative"
        class="flex justify-center"
        @click="
          () => {
            $emit('changed', props.value + 1)
          }
        "
      >
        <icon-arrow-up
      /></Button>
    </div>
  </div>
</template>
