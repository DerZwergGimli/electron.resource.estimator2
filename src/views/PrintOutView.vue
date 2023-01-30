<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useAppStorage } from '../store/AppStorage'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'

import {
  draw_CoverSheet,
  draw_HostListPage,
  draw_VMListPage,
  draw_AssignmentPage,
} from '../jsPDF/drawPages'

import { draw_CodePage } from '../jsPDF/exportCode'
import { addPageNumbers } from '../jsPDF/helperJSPDF'
import { generatePDF_FULL } from '../jsPDF/generator'

const store = useAppStorage()
const doc = new jsPDF('p', 'mm', 'a4')
const pdf_width = doc.internal.pageSize.getWidth()
const pdf_height = doc.internal.pageSize.getHeight()
const pdfFile = ref()
const images_bars = [] as HTMLCanvasElement[]

const charts_to_image = ref(null)

onMounted(async () => {
  await generatePDF_FULL(doc)
  pdfFile.value = doc.output('datauristring')
})

function downloadPDF() {
  doc.save()
}
</script>

<template>
  <div class="flex flex-col base-content">
    <button class="btn-style m-3" @click="downloadPDF()">Save pdf</button>
    <iframe
      class="p-3 flex flex-grow"
      width="100%"
      height="100%"
      :src="pdfFile"
    ></iframe>
  </div>
</template>

<style scoped>
.a4 {
  size: 7in 9.25in;
  margin: 27mm 16mm 27mm 16mm;
}

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
