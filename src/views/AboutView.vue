<template>
  <div class="home flex flex-col text-center">
    <div class="flex flex-row justify-center space-x-2">
      <p class="basis-1/2">
        This tool is used for estimating hardware resources for virtual
        environments.
      </p>
    </div>

    <button class="btn-style m-3" @click="clear_local_storage">
      Reset App-Data
    </button>
  </div>
</template>

<script setup lang="ts">
function clear_local_storage() {
  localStorage.clear()
  console.log('Clear local Storage')
}
</script>
