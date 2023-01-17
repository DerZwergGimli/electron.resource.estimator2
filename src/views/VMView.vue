<template>
  <div class="host flex flex-col text-center">
    <VMTable
      class="m-3"
      :vms="store.vmsList"
      @clk_remove_item="(vm_uuids) => clk_removeVM(vm_uuids)"
    ></VMTable>
    <div>
      <button class="btn-style mb-3" @click="clk_addVM()">Add VM</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { calculate_total_hosts, calculate_total_vms } from '../js/calculator'
import VMTable from '../components/table/VMTable.vue'
import { uuid } from 'vue-uuid'
import { createToast } from 'mosha-vue-toastify'
import { defineComponent, unref, watch } from 'vue'
import ValueCard from '../components/special/ValueCard.vue'
import { TOAST_SUCCESS, TOAST_WARNING } from '../extra/toast-config'
import { useAppStorage } from '../store/AppStorage'
defineComponent({ VMTable })

const store = useAppStorage()

//watch(store.vmsList, store.check_amount_uuids_length(unref(store.vmsList)));

function clk_addVM() {
  store.vmsList.push({
    id: store.vmsList.length,
    preset: undefined,
    uuids: [uuid.v4()],
    name: 'new_vm',
    os: 'none',
    vcpu: {
      min: 0,
      rec: 0,
      max: 0,
    },
    vram: {
      min: 0,
      rec: 0,
      max: 0,
    },
    vstorage: {
      min: 0,
      rec: 0,
      max: 0,
    },
  })
  createToast('New VM added!', TOAST_SUCCESS)
}

function clk_removeVM(vm_uuids: string[]) {
  store.remove_vm(vm_uuids)
  createToast('VM removed!', TOAST_WARNING)
}
</script>
