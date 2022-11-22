<script setup lang="ts">
import { ref } from 'vue'
import { useAppStorage } from '../store/AppStorage'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

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

  //Main PAGE
  doc.text(
    'Virtual Environment Estimator ',
    doc.internal.pageSize.getWidth() / 2,
    50,
    {
      align: 'center',
    }
  )

  //region Host PAGE
  doc.addPage()
  doc.text('List of all Hosts', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  const body_hosts = store.hostsList.map((host, index) => {
    return [
      index,
      host.name,
      host.cpu.cores * host.cpu.sockets + ' Cores',
      host.ram.size * host.ram.slots + ' GB',
      host.storage.size * host.storage.amount + ' GB',
      host.uuids.length,
    ]
  })

  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_hosts,
  })
  //endregion

  //region VM PAGE
  doc.addPage()
  doc.text('List of all VMs ', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center',
  })

  const body_vms = store.vmsList.map((vm, index) => {
    return [
      index,
      vm.name,
      vm.vcpu.rec.toString() + ' Cores',
      vm.vram.rec.toString() + ' GB',
      vm.vstorage.rec.toString() + ' GB',
      vm.uuids.length,
    ]
  })

  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_vms,
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
    doc.text(
      assignment.host_uuid ?? 'error',
      doc.internal.pageSize.getWidth() / 2,
      25,
      {
        align: 'center',
      }
    )
    doc.setFontSize(15)

    const body_assignments = [
      [
        current_host?.cpu.sockets.toString() ?? 'error',
        current_host?.cpu.cores.toString() ?? 'error',
        current_host?.ram.slots.toString() ?? 'error',
        current_host?.ram.size.toString() ?? 'error',
        current_host?.storage.amount.toString() ?? 'error',
        current_host?.storage.size.toString() ?? 'error',
      ],
    ]

    autoTable(doc, {
      theme: 'plain',
      startY: 30,
      head: [['sockets', 'cores', 'slots', 'size', 'amount', 'size']],
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
              vm.uuids.length.toString(),
            ]
            body_vms.push(row)
          }
        })
      })
    }

    autoTable(doc, {
      head: [['Name', 'CPU', 'RAM', 'Storage', 'Amount']],
      body: body_vms,
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
  <div class="flex flex-col base-content h-screen">
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
