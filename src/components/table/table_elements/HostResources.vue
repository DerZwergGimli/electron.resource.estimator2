<template>
  <div class="space-y-1">
    <div class="input-g flex justify-center">
      <span class="w-14 flex justify-center">
        <icon-cpu v-if="type === 'cpu'" />
        <icon-ram v-if="type === 'ram'" />
        <icon-hdd v-if="type === 'storage'" />
      </span>
      <input
        class="input-text-field"
        :class="second_value == 0 ? ' input-error' : ''"
        type="number"
        :value="first_value"
        @input="(event: any) => $emit('changed_first', event.target.value)"
      />
      <span class="w-32 flex justify-center">
        {{ type === 'cpu' ? 'Sockets' : type === 'ram' ? 'Slots' : 'Slots' }}
      </span>
    </div>

    <div class="input-g">
      <span class="w-14 flex justify-center">
        <icon-cpu v-if="type === 'cpu'" />
        <icon-ram v-if="type === 'ram'" />
        <icon-hdd v-if="type === 'storage'" />
      </span>
      <input
        class="input-text-field"
        :class="second_value == 0 ? ' input-error' : ''"
        type="number"
        :value="second_value"
        @input="(event:any) => $emit('changed_second', event.target.value)"
      />
      <span class="w-32 flex justify-center">
        {{ type === 'cpu' ? 'Cores' : type === 'ram' ? 'GB' : 'GB' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import IconCpu from '../../icons/IconCpu.vue'
import IconRam from '../../icons/IconRam.vue'
import IconHdd from '../../icons/IconHdd.vue'

defineProps({
  type: {
    type: String,
    default: 'none',
  },
  first_value: {
    type: Number,
    default: 0,
  },
  second_value: {
    type: Number,
    default: 0,
  },
})
</script>
