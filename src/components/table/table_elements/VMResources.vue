<template>
  <div class="space-y-1 form-control">
    <label class="input-group input-group-xs">
      <span class="w-14">Min</span>
      <input
        type="number"
        placeholder="Type here"
        :class="
          'input input-bordered input-xs' + (min == 0 ? ' input-error' : '')
        "
        :value="min"
        @input="(event:any) => $emit('changed_min', event.target.value)"
      />
      <span class="">
        {{ type === 'cpu' ? 'Cores' : 'GB' }}
      </span>
    </label>

    <label class="input-group input-group-xs">
      <span class="w-14">Rec</span>
      <input
        type="number"
        placeholder="Type here"
        :class="
          'input input-bordered input-xs' + (rec == 0 ? ' input-error' : '')
        "
        :value="rec"
        @input="(event: any) => $emit('changed_rec', event.target.value)"
      />
      <span>
        {{ type === 'cpu' ? 'Cores' : 'GB' }}
      </span>
    </label>

    <label class="input-group input-group-xs">
      <span class="w-14">Max</span>
      <input
        type="number"
        placeholder="Type here"
        :class="
          'input input-bordered input-xs' + (max == 0 ? ' input-error' : '')
        "
        :value="max"
        @input="(event: any) => $emit('changed_max', event.target.value)"
      />
      <span class="">
        {{ type === 'cpu' ? 'Cores' : 'GB' }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'none',
  },
  min: {
    type: Number,
    default: 0,
  },
  rec: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
})
</script>

<script lang="ts">
export default {
  name: 'VMResources',
}
</script>
