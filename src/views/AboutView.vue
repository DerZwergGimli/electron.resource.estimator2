<template>
  <div class="home flex flex-col text-center base-content">
    <button class="btn-style m-3" @click="clear_local_storage">
      Reset App-Data
    </button>

    <div class="flex flex-row justify-center space-x-2">
      <p class="basis-1/2">
        This tool is used for estimating hardware resources for virtual
        environments.
      </p>
    </div>
    <Markdown :source="markdown_text" />
  </div>
</template>

<script setup>
import Markdown from 'vue3-markdown-it'

import { ref } from 'vue'

let markdown_text = ref()
fetch('CHANGELOG.md')
  .then((response) => response.text())
  .then((text) => (markdown_text.value = text))
  .catch((err) => console.error(err))

function clear_local_storage() {
  localStorage.clear()
  console.log('Clear local Storage')
}
</script>
