<script setup lang="ts">
import { useAppStorage } from '../store/AppStorage'
//import autoTable from 'jspdf-autotable'
//import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import SimpleTable from '../components/table/SimpleTable.vue'

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
  // fromHTML Method

  var element = document.querySelector('#generatePdf')
  html2pdf()
    .from(element)

    .save()
  // var doc = new jsPDF() //create jsPDF object
  // doc.html(
  //   document.getElementById('test') as HTMLElement // page element which you want to print as PDF
  // )

  //doc.save()

  // doc.html(elementHTML, {
  //   callback: function (doc) {
  //     // Save the PDF
  //     doc.save('document-html.pdf')
  //   },
  //   margin: [10, 10, 10, 10],
  //   autoPaging: 'text',
  //   x: 0,
  //   y: 0,
  //   width: 190, //target width in the PDF document
  //   //window width in CSS pixels
  // })
  //const doc = new jsPDF()
  // doc.html(document.getElementById('toPrint') as HTMLElement, {
  //   callback: function (doc) {
  //     doc.save()
  //   },
  //   x: 0,
  //   y: 0,
  // })
  // //Main PAGE
  // doc.text(
  //   'Virtual environment estimator ',
  //   doc.internal.pageSize.getWidth() / 2,
  //   10,
  //   {
  //     align: 'center',
  //   }
  // )
  //
  // //region Host PAGE
  // doc.addPage()
  // doc.text('Host-Table ', doc.internal.pageSize.getWidth() / 2, 10, {
  //   align: 'center',
  // })
  //
  // const body_hosts = store.hostsList.map((host, index) => {
  //   return [
  //     index,
  //     host.name,
  //     host.cpu.cores * host.cpu.sockets,
  //     host.ram.size * host.ram.slots,
  //     host.storage.size * host.storage.amount,
  //   ]
  // })
  //
  // autoTable(doc, {
  //   head: [['ID', 'Name', 'CPU', 'RAM', 'Storage']],
  //   body: body_hosts,
  // })
  // //endregion
  //
  // //region VM PAGE
  // doc.addPage()
  // doc.text('VM-Table ', doc.internal.pageSize.getWidth() / 2, 10, {
  //   align: 'center',
  // })
  //
  // const body_vms = store.vmsList.map((vm, index) => {
  //   return [
  //     index,
  //     vm.name,
  //     vm.vcpu.rec.toString() + ' Cores',
  //     vm.vram.rec.toString() + ' GB',
  //     vm.vstorage.rec.toString() + ' GB',
  //     vm.uuids.length,
  //   ]
  // })
  //
  // autoTable(doc, {
  //   head: [['ID', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']],
  //   body: body_vms,
  // })
  //
  // //Assignments PAGE
  // doc.addPage()
  //
  // store.assignmentsList.forEach((assignment) => {
  //   let current_host = store.hostsList.find((host) =>
  //     host.uuids.some((uuid) => uuid === assignment.host_uuid)
  //   )
  //   doc.text(
  //     current_host?.name ?? 'error',
  //     doc.internal.pageSize.getWidth() / 2,
  //     10,
  //     {
  //       align: 'center',
  //     }
  //   )
  //
  //   const body_assignments = [
  //     [
  //       current_host?.cpu.sockets.toString(),
  //       current_host?.cpu.cores.toString(),
  //       current_host?.ram.slots.toString(),
  //       current_host?.ram.size.toString(),
  //       current_host?.storage.amount.toString(),
  //       current_host?.storage.size.toString(),
  //     ],
  //   ]
  //
  //   autoTable(doc, {
  //     head: [['sockets', 'cores', 'slots', 'size', 'amount', 'size']],
  //     body: body_assignments,
  //   })
  //
  //   let body_vms: any[] = []
  //
  //   for (let i = 0; i < assignment.vm_uuid.length; i++) {
  //     store.vmsList.forEach((vm) => {
  //       vm.uuids.forEach((uuid) => {
  //         if (uuid === assignment.vm_uuid[i]) {
  //           console.log(uuid)
  //           let row = [
  //             vm.name,
  //             vm.vcpu.rec.toString() + ' Cores',
  //             vm.vram.rec.toString() + ' GB',
  //             vm.vstorage.rec.toString() + ' GB',
  //             vm.uuids.length.toString(),
  //           ]
  //           body_vms.push(row)
  //         }
  //       })
  //     })
  //   }
  //
  //   autoTable(doc, {
  //     head: [['Name', 'CPU', 'RAM', 'Storage', 'Amount']],
  //     body: body_vms,
  //   })
  //   doc.addPage()
  // })
}
</script>

<template>
  <div class="flex flex-col base-content">
    <div class="base-headline">Export as PDF</div>
    <div class="divider"></div>

    <button class="btn m-4 hover:bg-primary" @click="generatePDF()">
      generate pdf
    </button>

    <div class="container">
      <div id="generatePdf" class="a4">
        <h1>Hardware Resource Report</h1>

        <div class="grid grid-cols-2">
          <div class="text-center">Total Hosts</div>
          <div class="text-center">{{ store.hostsList.length }}</div>
          <div class="text-center">Total VMs</div>
          <div class="text-center">{{ store.vmsList.length }}</div>
        </div>

        <div class="html2pdf__page-break pb-20"></div>
        <h1 class="text-center text-2xl pb-2">Hosts</h1>
        <simple-table
          :headers="['', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']"
          :body="host_table_elements"
        />

        <div class="html2pdf__page-break pb-20"></div>
        <h1 class="text-center text-2xl pb-2">VMs</h1>
        <simple-table
          :headers="['', 'Name', 'CPU', 'RAM', 'Storage', 'Amount']"
          :body="vm_table_elements"
        />

        <div class="html2pdf__page-break"></div>
        <h1 class="text-center text-2xl pb-2">Assignments</h1>

        <div
          class="pt-20 space-y-8"
          v-for="(assignment, index) in store.assignmentsList"
          :key="index"
        >
          <h2 class="text-center text-2xl">
            {{
              store.hostsList.find((host) =>
                host.uuids.some((uuid) => uuid === assignment.host_uuid)
              )?.name +
              ' [' +
              index +
              ']'
            }}
          </h2>
          <div class="flex flex-col space-y-1">
            <div class="flex flex-row items-center space-x-2">
              <h3 class="w-20">CPU</h3>
              <div
                class="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-700"
              >
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  style="width: 45%"
                ></div>
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <h3 class="w-20">RAM</h3>
              <div
                class="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-700"
              >
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  style="width: 45%"
                ></div>
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <h3 class="w-20">Storage</h3>
              <div
                class="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-700"
              >
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  style="width: 45%"
                ></div>
              </div>
            </div>
          </div>

          <simple-table
            :headers="['', 'Name', 'CPU', 'RAM', 'Storage']"
            :body="
              assignment.vm_uuid.map((vm_uuid) => [
                '',
                store.vmsList.find((vm) =>
                  vm.uuids.some((uuid) => uuid === vm_uuid)
                )?.name ?? 'error',
                store.vmsList.find((vm) =>
                  vm.uuids.some((uuid) => uuid === vm_uuid)
                )?.vcpu.rec ?? '-1',
                store.vmsList.find((vm) =>
                  vm.uuids.some((uuid) => uuid === vm_uuid)
                )?.vram.rec ?? '-1',
                store.vmsList.find((vm) =>
                  vm.uuids.some((uuid) => uuid === vm_uuid)
                )?.vstorage.rec ?? '-1',
              ])
            "
          />
          <div class="html2pdf__page-break pb-20"></div>
        </div>
      </div>
    </div>
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
