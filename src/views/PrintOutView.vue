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

const store = useAppStorage()
const doc = new jsPDF('p', 'mm', 'a4')
const pdf_width = doc.internal.pageSize.getWidth()
const pdf_height = doc.internal.pageSize.getHeight()
const pdfFile = ref()
const images_bars = [] as HTMLCanvasElement[]

const charts_to_image = ref(null)

onMounted(async () => {
  await generatePDF()
  pdfFile.value = doc.output('datauristring')
})

const host_table_elements = store.hostsList.map((host, index) => [
  index,
  host.name,
  host.cpu.sockets * host.cpu.cores + ' GB',
  host.ram.slots * host.ram.size + ' GB',
  host.storage.amount * host.storage.size + ' GB',
  host.uuids.length,
])

const vm_table_elements = store.vmsList.map((vm, index) => [
  index,
  vm.name,
  vm.vcpu.rec + ' GB',
  vm.vram.rec + ' GB',
  vm.vstorage.rec + ' GB',
  vm.uuids.length,
])

async function generatePDF() {
  draw_CoverSheet(doc)
  doc.addPage()

  draw_HostListPage(doc)
  doc.addPage()

  draw_VMListPage(doc)
  doc.addPage()

  draw_AssignmentPage(doc)
  doc.addPage()
}

function downloadPDF() {
  doc.save()
}
</script>

<template>
  <div class="flex flex-col base-content">
    <div class="base-headline">Export as PDF</div>
    <div class="divider"></div>

    <button class="btn-style m-3" @click="downloadPDF()">generate pdf</button>

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
