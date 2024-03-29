<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>OS</th>
          <th>Preset</th>
          <th>
            <div class="flex flex-row space-x-1 items-center">
              <p>CPU</p>
              <icon-cpu />
            </div>
          </th>
          <th>
            <div class="flex flex-row space-x-1 items-center">
              <p>RAM</p>
              <icon-ram />
            </div>
          </th>
          <th>
            <div class="flex flex-row space-x-1 items-center">
              <p>Storage</p>
              <icon-hdd />
            </div>
          </th>
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
              v-model="vm.preset"
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
            <UpDownElement
              :value="vm.uuids.length"
              @changed="
                (value) => {
                  store.check_uuid_length(vm.name, parseInt(value))
                }
              "
            ></UpDownElement>
          </th>
          <th>
            <button
              class="btn-style-del"
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
import IconCpu from '../icons/IconCpu.vue'
import IconRam from '../icons/IconRam.vue'
import IconHdd from '../icons/IconHdd.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconCalculator from '../icons/IconCalculator.vue'
import UpDownElement from './table_elements/UpDownElement.vue'

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
  store.vmsList.forEach((vm) => {
    if (vm.uuids == vm_uuids) {
      vm.preset = selected_preset?.name
    }
  })

  createToast('Preset updated!', TOAST_SUCCESS)
}
</script>
