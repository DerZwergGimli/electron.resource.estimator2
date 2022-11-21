<template>
  <div class="home flex flex-col">
    <div class="grid m-4 h-20 card bg-base-300 rounded-box place-items-center">
      <h1>About</h1>
    </div>
    <div class="flex flex-row justify-center space-x-2">
      <p class="basis-1/2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Euismod elementum
        nisi quis eleifend quam. Cursus eget nunc scelerisque viverra mauris in
        aliquam. Aliquam faucibus purus in massa. Id donec ultrices tincidunt
        arcu non sodales neque. Sagittis id consectetur purus ut faucibus
        pulvinar elementum. Tincidunt eget nullam non nisi est. Et malesuada
        fames ac turpis egestas integer eget aliquet. Scelerisque eleifend donec
        pretium vulputate sapien nec. Neque viverra justo nec ultrices dui
        sapien eget mi. Lacinia at quis risus sed vulputate odio ut enim.
      </p>
    </div>
  </div>
  <button class="btn btn-primary" @click="clear_local_storage">
    Clear ALL
  </button>
</template>

<script setup lang="ts">
function clear_local_storage() {
  localStorage.clear()
  console.log('Clear local Storage')
}
</script>
