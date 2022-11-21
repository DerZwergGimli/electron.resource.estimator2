<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>OS</th>
          <th>Preset</th>
          <th>CPU <i class="bi bi-cpu"></i></th>
          <th>RAM <i class="bi bi-memory"></i></th>
          <th>Storage <i class="bi bi-device-hdd"></i></th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- body -->
        <tr v-for="(vm, index) in vms" :key="index">
          <th>{{ index }}</th>
          <th>
            <input
              class="input-text-field"
              type="text"
              :value="vm.name"
              @input="(event: any) => (vm.name = event.target.value )"
            />
          </th>
          <th>
            <input
              class="input-text-field"
              type="text"
              :value="vm.os"
              @input="(event: any) => (vm.os = event.target.value)"
            />
          </th>
          <th>
            <select
              class="input-select-box"
              @change="evt_change_preset($event, vm.uuids)"
            >
              <option
                v-for="preset in store.presets_vm"
                :key="preset.id"
                :value="preset.name"
              >
                {{ preset.name }}
              </option>
            </select>
          </th>
          <th>
            <VMResouce
              :value="vm.vcpu.rec"
              @changed="(value) => (vm.vcpu.rec = parseInt(value))"
              type="cpu"
            ></VMResouce>
          </th>
          <th>
            <VMResouce
              :value="vm.vram.rec"
              @changed="(value) => (vm.vram.rec = parseInt(value))"
              type="ram"
            ></VMResouce>
          </th>
          <th>
            <VMResouce
              :value="vm.vstorage.rec"
              @changed="(value) => (vm.vstorage.rec = parseInt(value))"
              type="storage"
            ></VMResouce>
          </th>
          <th>
            <VMResouce
              :value="vm.uuids.length"
              @changed="
                (value) => {
                  store.check_uuid_length(vm.name, parseInt(value))
                }
              "
              type="amount"
            ></VMResouce>
          </th>
          <th>
            <button
              class="btn btn-sm"
              @click="$emit('clk_remove_item', vm.uuids)"
            >
              <icon-trash />
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { TOAST_SUCCESS } from '../../extra/toast-config'
import { defineProps, PropType } from 'vue'
import VMResouce from './table_elements/VMResource.vue'
import { VM } from '../../store/types/VM'
import { useAppStorage } from '../../store/AppStorage'
import IconTrash from '../icons/IconTrash.vue'

const store = useAppStorage()
store.init()

defineProps({
  vms: {
    type: Array as PropType<VM[]>,
    default: null,
  },
})

function evt_change_preset(event: any, vm_uuids: string[]) {
  let preset_name: string = event.target.value
  let selected_preset = store.presets_vm.find(
    (preset) => preset.name == preset_name
  )

  store.vmsList.map((vm) => {
    if (vm.uuids == vm_uuids) {
      vm.os = selected_preset?.os ?? 'error'
      vm.vcpu.rec = selected_preset?.cpu ?? 0
      vm.vram.rec = selected_preset?.ram ?? 0
      vm.vstorage.rec = selected_preset?.storage ?? 0
    }
  })
  createToast('Preset updated!', TOAST_SUCCESS)
}
</script>

<script lang="ts">
export default {
  name: 'VMTable',
}
</script>
