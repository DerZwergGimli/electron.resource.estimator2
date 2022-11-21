<template>
  <div class="flex flex-col text-center">
    <div class="base-headline">Import config file</div>
    <div class="divider"></div>
    <div class="base-contentr">
      <input class="pt-5" type="file" @change="evt_uploadFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { useAppStorage } from '../store/AppStorage'

const storage = useAppStorage()

function evt_uploadFile(event: any) {
  console.info('Loading uploaded file...')

  const blob = new Blob([event.target.files[0]], { type: 'application/json' })

  let reader = new FileReader()

  reader.onloadend = function () {
    const data_string = reader.result?.toString()
    const data_json = JSON.parse(JSON.parse(JSON.stringify(data_string)))
    storage.import(data_json.hosts, data_json.vms, data_json.assignments)
    createToast('Data imported from File', { type: 'success' })
    // console.info("...Imported!");
  }

  reader.onerror = function () {
    createToast('Error loading file content (check console)', {
      type: 'danger',
    })
    console.error(reader.error)
  }

  reader.readAsText(blob)
}
</script>
