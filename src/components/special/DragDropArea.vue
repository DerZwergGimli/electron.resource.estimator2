<template>
  <div class="flex">
    <div
      class="flex flex-grow card bg-base-300 rounded-box place-items-center py-2"
    >
      <div v-for="vm in vms" :key="vm" class="flex flex-col space-y-1">
        <div
          v-for="n in vm.amount -
          data.assignments.filter((a) => a.vm_uuid === vm.uuid).length"
          :key="n"
        >
          <span
            class="badge"
            @dragstart="dragStart($event, vm.uuid)"
            draggable="true"
          >
            {{ vm.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="divider divider-horizontal text-center">
      drag<br />
      &<br />
      drop
    </div>
    <div class="grid flex-grow card bg-base-300 rounded-box">
      <SystemDimensioningTabs></SystemDimensioningTabs>
      <div v-for="host in hosts" :key="host">
        <AssignmentHost :host="host" :vms="data.vms"></AssignmentHost>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dataStore } from "@/store/DataStore";
import { storeToRefs } from "pinia/dist/pinia";
import AssignmentHost from "@/components/special/AssignmentHost";

import SystemDimensioningTabs from "@/components/special/SystemDimensioningTabs.vue";
const data = dataStore();
const { vms, hosts } = storeToRefs(data);

function dragStart(event, vm_uuid) {
  console.log(vm_uuid);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("vm_id", vm_uuid);
}
</script>

<style scoped></style>
