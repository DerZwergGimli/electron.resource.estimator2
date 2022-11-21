<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th v-for="header in props.headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="body in props.body" :key="body">
          <td v-for="b in body" :key="b">{{ b }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
// const props = defineProps({
//   headers: {
//     default: ['a', 'b', 'c'],
//   },
//   body: {
//     default: [
//       ['1', '2', '3'],
//       ['11', '22', '33'],
//     ],
//   },
// })

const props = defineProps(['headers', 'body'])
</script>

<style scoped>
h1 {
  @apply text-center text-2xl pb-2;
}

th {
}

h2 {
  text-align: center;
  color: #24650b;
}
</style>
