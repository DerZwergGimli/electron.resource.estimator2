<template>
  <div class="bg-gradient-to-b from-primary to-secondary p-2 rounded-md">
    <h2 class="text-sm capitalize">Total {{ text }}'s</h2>
    <div class="flex justify-center space-x-2">
      <i
        :class="
          text === 'host'
            ? 'bi bi-server'
            : text === 'vm'
            ? 'bi bi-pc'
            : 'bi bi-gear-wide-connected'
        "
      ></i>
      <p class="text-md">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    default: "someTEXT",
  },
  value: {
    type: Number,
    default: 0,
  },
});
</script>
