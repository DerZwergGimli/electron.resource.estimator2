<script setup lang="ts">
import { useAppStorage } from '../store/AppStorage'

//import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const store = useAppStorage()

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
  const doc = new jsPDF()
  doc.html(document.getElementById('toPrint') as HTMLElement, {
    callback: function (doc) {
      doc.save()
    },
    x: 0,
    y: 0,
  })
  //Main PAGE
  doc.text(
    'Virtual environment estimator ',
    doc.internal.pageSize.getWidth() / 2,
    10,
    {
      align: 'center',
    }
  )

  //region Host PAGE
  doc.addPage()
  doc.text('Host-Table ', doc.internal.pageSize.getWidth() / 2, 10, {
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
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_hosts,
  })
  //endregion

  //region VM PAGE
  doc.addPage()
  doc.text('VM-Table ', doc.internal.pageSize.getWidth() / 2, 10, {
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
    head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
    body: body_vms,
  })

  //Assignments PAGE
  doc.addPage()

  store.assignmentsList.forEach((assignment) => {
    let current_host = store.hostsList.find((host) =>
      host.uuids.some((uuid) => uuid === assignment.host_uuid)
    )
    doc.text(
      current_host?.name ?? 'error',
      doc.internal.pageSize.getWidth() / 2,
      10,
      {
        align: 'center',
      }
    )

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
    doc.addPage()
  })

  doc.save()
}
</script>

<template>
  <div class="flex flex-col base-content">
    <div class="base-headline">Export as PDF</div>
    <div class="divider"></div>

    <button class="btn m-4 hover:bg-primary" @click="generatePDF()">
      generate pdf
    </button>
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
