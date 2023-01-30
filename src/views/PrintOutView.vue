<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useAppStorage } from '../store/AppStorage'
import { jsPDF } from 'jspdf'
import { Tabs, Tab } from 'flowbite-vue'

import { generatePDF_FULL, generatePDF_SIMPLE } from '../jsPDF/generator'

const activeTab = ref('full')

const store = useAppStorage()
const doc_full = new jsPDF('p', 'mm', 'a4')
const doc_simple = new jsPDF('p', 'mm', 'a4')
const pdfFile_FULL = ref()
const pdfFile_SIMPLE = ref()

onMounted(async () => {
  await generatePDF_FULL(doc_full)
  await generatePDF_SIMPLE(doc_simple)

  pdfFile_FULL.value = doc_full.output('datauristring')
  pdfFile_SIMPLE.value = doc_simple.output('datauristring')
})

function downloadPDF(is_full: boolean) {
  if (is_full) {
    doc_full.save()
  } else {
    doc_simple.save()
  }
}
</script>

<template>
  <div class="flex flex-col base-content">
    <div class="flex w-full justify-center">
      <tabs variant="underline" v-model="activeTab">
        <tab class="flex justify-center" name="full" title="FULL"> </tab>
        <tab name="none" title="or" :disabled="true"></tab>
        <tab name="simple" title="SIMPLE"></tab>
      </tabs>
    </div>
    <button
      class="btn-style m-3"
      @click="activeTab === 'full' ? downloadPDF(true) : downloadPDF(false)"
    >
      Save pdf
    </button>
    <iframe
      class="p-3 flex flex-grow"
      width="100%"
      height="100%"
      :src="activeTab === 'full' ? pdfFile_FULL : pdfFile_SIMPLE"
    ></iframe>
  </div>
</template>
