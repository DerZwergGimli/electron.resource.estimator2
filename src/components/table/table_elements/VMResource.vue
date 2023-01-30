<template>
  <div class="space-y-1">
    <label class="input-g flex justify-center">
      <span class="w-14 flex justify-center">
        <icon-cpu v-if="type === 'cpu'" />
        <icon-ram v-if="type === 'ram'" />
        <icon-hdd v-if="type === 'storage'" />
        <icon-calculator v-if="type === 'amount'" />
      </span>
      <input
        class="input-text-field"
        type="number"
        :class="value === 0 ? ' input-error' : ''"
        :value="value"
        @input="(event: any) => $emit('changed', event.target.value)"
      />
      <span class="w-32 flex justify-center">
        {{ type === 'cpu' ? 'Cores' : type === 'amount' ? '#' : 'GB' }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import IconCpu from '../../icons/IconCpu.vue'
import IconRam from '../../icons/IconRam.vue'
import IconHdd from '../../icons/IconHdd.vue'
import IconCalculator from '../../icons/IconCalculator.vue'

defineProps({
  type: {
    type: String,
    default: 'none',
  },
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<script lang="ts">
export default {
  name: 'VMResource',
}
</script>
