<script setup lang="ts">
import { ref } from 'vue'
import { useAppStorage } from '../store/AppStorage'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { caluclate_raid } from '../extra/calculator_storage'
import { RAIDEnums } from '../store/types/enums'

const store = useAppStorage()
const doc = new jsPDF()

generatePDF()

const pdfFile = ref()
pdfFile.value = doc.output('datauristring')

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

function generatePDF() {
  doc.setFontSize(15)

  //Info PAGE
  doc.text(
    'Virtual Environment Estimator ',
    doc.internal.pageSize.getWidth() / 2,
    50,
    {
      align: 'center',
    }
  )

  doc.text('Report', doc.internal.pageSize.getWidth() / 2, 60, {
    align: 'center',
  })
  doc.setFontSize(10)
  doc.text(
    new Date().toLocaleDateString(),
    doc.internal.pageSize.getWidth() / 2,
    250,
    {
      align: 'center',
    }
  )
  doc.text(
    'Tool-Version ' + process.env.npm_package_version ?? 'error',
    doc.internal.pageSize.getWidth() / 2,
    255,
    {
      align: 'center',
    }
  )

  doc.setFontSize(15)

  //region Host PAGE
  doc.addPage()
  doc.text('List of all Hosts', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  let body_hosts = store.hostsList.map((host, index) => {
    return [
      index,
      host.name,
      host.cpu.cores * host.cpu.sockets + ' Cores',
      host.ram.size * host.ram.slots + ' GB',
      host.storage.size * host.storage.amount + ' GB',
      host.uuids.length,
    ]
  })

  body_hosts.push([
    'Sum',
    '',
    store.hostsList.reduce((a, b) => a + b.cpu.cores * b.cpu.sockets, 0) +
      ' Cores',
    store.hostsList.reduce((a, b) => a + b.ram.size * b.ram.slots, 0) + ' GB',
    store.hostsList.reduce((a, b) => a + b.storage.size * b.storage.amount, 0) +
      ' GB',
    store.hostsList.reduce((a, b) => a + b.uuids.length, 0),
  ])

  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_hosts,
    didParseCell: function (data) {
      var rows = data.table.body
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fillColor = '#8FE6FC'
      }
    },
  })
  //endregion

  //region VM PAGE
  doc.addPage()
  doc.text('List of all VMs ', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  let body_vms = store.vmsList.map((vm, index) => {
    return [
      index,
      vm.name,
      vm.vcpu.rec.toString() + ' Cores',
      vm.vram.rec.toString() + ' GB',
      vm.vstorage.rec.toString() + ' GB',
      vm.uuids.length,
    ]
  })

  body_vms.push([
    'Sum',
    '',
    store.vmsList.reduce((a, b) => a + b.vcpu.rec, 0) + ' Cores',
    store.vmsList.reduce((a, b) => a + b.vram.rec, 0) + ' GB',
    store.vmsList.reduce((a, b) => a + b.vstorage.rec, 0) + ' GB',
    store.vmsList.reduce((a, b) => a + b.uuids.length, 0),
  ])

  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_vms,
    didParseCell: function (data) {
      var rows = data.table.body
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fillColor = '#8FE6FC'
      }
    },
  })

  //Assignments PAGE
  doc.addPage()
  doc.text('Assignments-List', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  doc.addPage()

  store.assignmentsList.forEach((assignment, index) => {
    let current_host = store.hostsList.find((host) =>
      host.uuids.some((uuid) => uuid === assignment.host_uuid)
    )

    doc.text(
      current_host?.name ?? 'error',
      doc.internal.pageSize.getWidth() / 2,
      20,
      {
        align: 'center',
      }
    )
    doc.setFontSize(9)
    doc.text('UUID:', 15, 30)
    doc.text('Index:', 150, 30, { align: 'right' })
    doc.text(index.toString() ?? 'error', 160, 30, { align: 'left' })
    doc.text(assignment.host_uuid ?? 'error', 40, 30)
    doc.text('Manufacturer:', 15, 35)
    doc.text(
      store.hostsList.find((host) =>
        host.uuids.some((uuid) => uuid == assignment.host_uuid)
      )?.manufacturer ?? 'error',
      40,
      35
    )
    doc.setFontSize(15)

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
      startY: 40,
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

    let body_vms: any[] = []

    for (let i = 0; i < assignment.vm_uuid.length; i++) {
      store.vmsList.forEach((vm) => {
        vm.uuids.forEach((uuid) => {
          if (uuid === assignment.vm_uuid[i]) {
            console.log(uuid)
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
      'Total',
      body_vms.reduce((a, b) => a + parseInt(b[1].replace(' Cores', '')), 0) +
        ' Cores',
      body_vms.reduce((a, b) => a + parseInt(b[2].replace(' GB', '')), 0) +
        ' GB',
      body_vms.reduce((a, b) => a + parseInt(b[3].replace(' GB', '')), 0) +
        ' GB',
    ])

    autoTable(doc, {
      head: [['Name', 'CPU', 'RAM', 'Storage']],
      body: body_vms,
      didParseCell: function (data) {
        var rows = data.table.body
        if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = '#8FE6FC'
        }
      },
    })

    if (store.assignmentsList.length - 1 > index) {
      doc.addPage()
    }
  })
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
