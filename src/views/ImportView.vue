<template>
  <div class="flex flex-col">
    <div class="base-content flex flex-col space-y-3">
      <div class="flex flex-col items-center bg-gray-700 m-2 p-2 rounded-md">
        <h2>Import Config-File</h2>
        <Button color="default">
          <input
            class="input-group"
            type="file"
            accept=".json"
            @change="evt_uploadFile"
        /></Button>
      </div>
      <div class="flex flex-col items-center bg-gray-700 m-2 p-2 rounded-md">
        <h2>Import Preset-File</h2>

        <Button color="default">
          <input
            class="input-group"
            type="file"
            accept=".json"
            @change="() => createToast('not implemented', TOAST_WARNING)"
        /></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue'
import { createToast } from 'mosha-vue-toastify'
import { useAppStorage } from '../store/AppStorage'
import {
  TOAST_ERROR,
  TOAST_SUCCESS,
  TOAST_WARNING,
} from '../extra/toast-config'

const storage = useAppStorage()

function evt_uploadFile(event: any) {
  console.info('Loading uploaded file...')

  const blob = new Blob([event.target.files[0]], { type: 'application/json' })

  let reader = new FileReader()

  reader.onloadend = function () {
    const data_string = reader.result?.toString()
    const data_json = JSON.parse(JSON.parse(JSON.stringify(data_string)))
    storage.import(data_json.hosts, data_json.vms, data_json.assignments)
    createToast('Data imported from File', TOAST_SUCCESS)
    // console.info("...Imported!");
  }

  reader.onerror = function () {
    createToast('Error loading file content (check console)', TOAST_ERROR)
    console.error(reader.error)
  }

  reader.readAsText(blob)
}
</script>
