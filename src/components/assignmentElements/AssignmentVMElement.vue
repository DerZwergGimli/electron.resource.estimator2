<template>
  <div
    class="flex flex-row w-full space-x-4 bg-base-300 dark:bg-slate-600 rounded-2xl px-3 items-center"
    v-if="vm"
  >
    <p class="basis-2/5 text-lg w-full">{{ vm.name }}</p>
    <div class="basis-1/5 justify-end items-center flex flex-row space-x-1">
      <p>{{ vm.vcpu[system_recommendation] }}</p>
      <icon-cpu />
    </div>
    <div class="basis-1/5 justify-end items-center flex flex-row space-x-1">
      <p>{{ vm.vram[system_recommendation] }}</p>
      <icon-ram />
    </div>
    <div class="basis-1/5 justify-end items-center flex flex-row space-x-1">
      <p>{{ vm.vstorage[system_recommendation] }}</p>
      <icon-hdd />
    </div>
    <button
      v-if="show_button"
      @click="$emit('clk_remove')"
      class="btn-style-del btn-xs"
    >
      <icon-trash />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { VM } from '../../store/types/VM'
import { SystemRecommendationEnums } from '../../store/types/enums'
import IconTrash from '../icons/IconTrash.vue'
import IconCpu from '../icons/IconCpu.vue'
import IconRam from '../icons/IconRam.vue'
import IconHdd from '../icons/IconHdd.vue'

defineProps({
  show_button: {
    type: Boolean,
    default: false,
  },
  vm: {
    type: Object as PropType<VM>,
    default: undefined,
  },
  system_recommendation: {
    type: String as PropType<SystemRecommendationEnums>,
    default: 'rec',
  },
})
</script>

<script lang="ts">
export default {
  name: 'AssignmentVMElement',
}
</script>

<style scoped></style>
