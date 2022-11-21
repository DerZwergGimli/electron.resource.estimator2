<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavigationComponent from './components/navigation/NavigationComponent.vue'

import { useAppStorage } from './store/AppStorage'
import { onMounted } from 'vue'

console.log('App stared!')

onMounted(async () => {
  console.log('Initializing store!')
  await useAppStorage().init()
})
</script>

<template>
  <div class="flex flex-col h-screen base-content">
    <navigation-component />
    <router-view />
  </div>
</template>
