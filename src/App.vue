<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavigationComponent from './components/navigation/NavigationComponent.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
import { useAppStorage } from './store/AppStorage'
import { onMounted } from 'vue'

console.log('App stared!')

onMounted(async () => {
  console.log('Initializing store!')
  await useAppStorage().init()
})
</script>

<template>
  <div class="flex flex-col base-bg min-h-screen">
    <navigation-component />
    <router-view class="flex flex-grow" />
    <footer-component />
  </div>
</template>
