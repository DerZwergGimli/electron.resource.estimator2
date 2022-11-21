<script setup>
import { useThemeStore } from '~/store/ThemeStore'
import IconSun from '~/components/icons/IconSun.vue'
import IconMoon from '~/components/icons/IconMoon.vue'
</script>

<template>
  <div
    class="flex hover:op80 justify-center m2 op30 text-2xl"
    @click="useThemeStore().toggleDark()"
  >
    <icon-moon v-if="useThemeStore().is_dark" />
    <icon-sun v-else />
  </div>
</template>
