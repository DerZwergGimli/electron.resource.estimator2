<template>
  <div class="flex flex-row space-x-2 justify-evenly">
    <p class="text-sm w-5">{{ vm?.name ?? 'error' }}</p>
    <div class="flex flex-row space-x-1 w-5">
      <i class="bi bi-cpu"></i>
      <p class="text-sm">{{ vm?.vcpu[system_dim] ?? '-1' }}</p>
    </div>
    <div class="flex flex-row space-x-1 w-5">
      <i class="bi bi-memory"></i>
      <p class="text-sm">{{ vm?.vram[system_dim] ?? '-1' }}</p>
    </div>
    <div class="flex flex-row space-x-1 w-5">
      <i class="bi bi-hdd"></i>
      <p class="text-sm">{{ vm?.vstorage[system_dim] ?? '-1' }}</p>
    </div>
    <div class="flex">
      <i
        @click="$emit('clk_remove_item', host_uuid)"
        class="bi bi-trash text-error absolute right-4"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { AppDataVms } from '../../../js/types/data-types'
import { system_dimensioning_types } from '../../../js/types/enums'

defineProps({
  system_dim: {
    type: Object as PropType<system_dimensioning_types>,
    default: system_dimensioning_types.rec,
  },
  host_uuid: {
    type: String,
    default: 'none',
  },
  vm: {
    type: Object as PropType<AppDataVms>,
    default: undefined,
  },
})
</script>

<style scoped></style>
