<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useAppStorage } from '../store/AppStorage'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'

import { caluclate_raid } from '../extra/calculator_storage'
import { RAIDEnums } from '../store/types/enums'

import ProgressBarPDF from '../components/jspdf/ProgressBarPDF.vue'
import { addResources } from '../jsPDF/usedResources'
import { draw_CoverSheet, draw_HostListPage } from '../jsPDF/drawPages'

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

  //Assignments PAGE
  doc.addPage()
  doc.text('Assignments-List', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  doc.addPage()

  for (let i = 0; i < store.assignmentsList.length; i++) {
    var offsetY = 20

    let current_host = store.hostsList.find((host) =>
      host.uuids.some((uuid) => uuid === store.assignmentsList[i].host_uuid)
    )

    doc.text(
      current_host?.name ?? 'error',
      doc.internal.pageSize.getWidth() / 2,
      offsetY,
      {
        align: 'center',
      }
    )
    doc.setFontSize(9)
    doc.text('UUID:', 15, 30)
    doc.text('Index:', 150, 30, { align: 'right' })
    doc.text(i.toString() ?? 'error', 160, 30, { align: 'left' })
    doc.text(store.assignmentsList[i].host_uuid ?? 'error', 40, 30)
    doc.text('Manufacturer:', 15, 35)
    offsetY += 20
    doc.text(
      store.hostsList.find((host) =>
        host.uuids.some((uuid) => uuid == store.assignmentsList[i].host_uuid)
      )?.manufacturer ?? 'error',
      offsetY,
      35
    )

    let body_assignments = [
      [
        {
          content: current_host?.cpu.sockets.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.cpu.cores.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.ram.slots.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.ram.size.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.storage.amount.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.storage.size.toString() ?? 'error',
          colSpan: 1,
        },
        {
          content: current_host?.storage.raid.toString() ?? 'error',
          colSpan: 1,
        },
      ],
    ]

    body_assignments.push([
      {
        content:
          (
            (current_host?.cpu.sockets ?? 0) * (current_host?.cpu.cores ?? 0)
          ).toString() + ' Cores',
        colSpan: 2,
      },
      {
        content:
          (
            (current_host?.ram.slots ?? 0) * (current_host?.ram.size ?? 0)
          ).toString() + ' GB',
        colSpan: 2,
      },
      {
        content:
          caluclate_raid(
            current_host?.storage.amount ?? 0,
            current_host?.storage.size ?? 0,
            current_host?.storage.raid ?? RAIDEnums.R0,
            1
          ).toString() + ' GB',
        colSpan: 3,
      },
    ])

    autoTable(doc, {
      theme: 'grid',
      startY: offsetY,
      head: [
        [
          {
            content: 'CPU',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: 'RAM',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: 'Storage',
            colSpan: 3,
            styles: { halign: 'center' },
          },
        ],
        ['sockets', 'cores', 'slots', 'size', 'amount', 'size', 'RAID'],
      ],
      body: body_assignments,
    })

    offsetY += 35
    addResources(doc, offsetY, 'Used Resources', 10, 20, 70)
    offsetY += 20

    doc.setFontSize(15)

    let body_vms: any[] = []

    for (let i = 0; i < store.assignmentsList[i].vm_uuid.length; i++) {
      store.vmsList.forEach((vm) => {
        vm.uuids.forEach((uuid) => {
          if (uuid === store.assignmentsList[i].vm_uuid[i]) {
            let row = [
              vm.name,
              vm.vcpu.rec.toString() + ' Cores',
              vm.vram.rec.toString() + ' GB',
              vm.vstorage.rec.toString() + ' GB',
            ]
            body_vms.push(row)
          }
        })
      })
    }

    body_vms.push([
      'SUM',
      body_vms.reduce((a, b) => a + parseInt(b[1].replace(' Cores', '')), 0) +
        ' Cores',
      body_vms.reduce((a, b) => a + parseInt(b[2].replace(' GB', '')), 0) +
        ' GB',
      body_vms.reduce((a, b) => a + parseInt(b[3].replace(' GB', '')), 0) +
        ' GB',
    ])

    autoTable(doc, {
      head: [['Name', 'CPU', 'RAM', 'Storage']],
      startY: offsetY,
      body: body_vms,
      didParseCell: function (data) {
        var rows = data.table.body
        if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = '#8FE6FC'
        }
      },
    })

    if (store.assignmentsList.length - 1 > i) {
      doc.addPage()
    }
  }
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
    <div ref="html" style="width: 595.28px; color: black; background: white">
      <h3>PDF for Test</h3>
      <p>Here is some content for testing!!</p>
    </div>

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
