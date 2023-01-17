<script setup lang="ts">
const app_version = process.env.npm_package_version
</script>

<template>
  <footer class="bg-white dark:bg-gray-900">
    <hr class="p-3 border-gray-200 dark:border-gray-700" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >© 2022 - All Rights Reserved.
    </span>

    <span
      class="p-2 block text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >Version {{ app_version }}
    </span>
  </footer>
</template>
