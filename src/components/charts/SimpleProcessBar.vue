<script setup lang="ts">
import { Progress } from 'flowbite-vue'
import { defineProps } from 'vue'

const props = defineProps(['value'])
</script>

<template>
  <Progress
    v-if="props.value < 100"
    class="w-full"
    :labelProgress="true"
    labelPosition="inside"
    size="lg"
    :progress="props.value"
    color="blue"
  ></Progress>
  <Progress
    v-if="props.value > 100"
    class="w-full"
    :labelProgress="true"
    labelPosition="inside"
    size="lg"
    :progress="100"
    color="red"
  ></Progress>
</template>
