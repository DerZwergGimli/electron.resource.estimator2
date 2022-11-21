<template>
  <div class="collapse collapse-arrow rounded-xl shadow-lg">
    <input type="checkbox" class="peer" />
    <div class="collapse-title bg-base-200">
      <div class="underline text-2xl">
        {{
          storage.hostsList.find((host: any) =>
            host.uuids.includes(assignment?.host_uuid)
          )?.name
        }}
      </div>
      <div
        class="flex xl:flex-row flex-col xl:justify-evenly items-center text-black"
      >
        <GaugeChart
          class="w-64"
          name="CPU"
          :used="
            get_used_resouce(
              assignment?.host_uuid ?? 'none',
              VirtualHardwareEnums.vcpu,
              storage.system_recommendation
            )
          "
          :total="find_host_CPU_total(assignment?.host_uuid ?? 'none') * 2"
        ></GaugeChart>
        <GaugeChart
          class="w-64"
          name="RAM"
          :used="
            get_used_resouce(
              assignment?.host_uuid ?? 'none',
              VirtualHardwareEnums.vram,
              storage.system_recommendation
            )
          "
          :total="find_host_RAM_total(assignment?.host_uuid ?? 'none')"
        ></GaugeChart>
        <GaugeChart
          class="w-64"
          name="Storage"
          :used="
            get_used_resouce(
              assignment?.host_uuid ?? 'none',
              VirtualHardwareEnums.vstorage,
              storage.system_recommendation
            )
          "
          :total="find_host_Storage_total(assignment?.host_uuid ?? 'none')"
        ></GaugeChart>
      </div>
    </div>
    <div class="collapse-content pt-3 bg-base-300">
      <table class="table table-compact w-full text-primary">
        <thead>
          <tr>
            <th></th>
            <th>VM-Name</th>
            <th class="w-8 text-right">CPU</th>
            <th class="w-8 text-right">RAM</th>
            <th class="w-8 text-right">Storage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vm_uuid, index) in assignment?.vm_uuid" :key="vm_uuid">
            <th>{{ index }}</th>
            <td>
              {{
                storage.vmsList.find((vm) => vm.uuids.includes(vm_uuid))
                  ?.name ?? 'error'
              }}
            </td>
            <td class="text-right">
              {{
                storage.vmsList.find((vm) => vm.uuids.includes(vm_uuid))?.vcpu[
                  storage.system_recommendation ?? 'error'
                ]
              }}
              Cores
            </td>
            <td class="text-right">
              {{
                storage.vmsList.find((vm) => vm.uuids.includes(vm_uuid))?.vram[
                  storage.system_recommendation ?? 'error'
                ]
              }}
              GB
            </td>
            <td class="text-right">
              {{
                storage.vmsList.find((vm) => vm.uuids.includes(vm_uuid))
                  ?.vstorage[storage.system_recommendation] ?? 'error'
              }}
              GB
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Assignment } from '../../store/types/Assignment'
import { useAppStorage } from '../../store/AppStorage'
import GaugeChart from '../charts/GaugeChart.vue'
import {
  find_host_CPU_total,
  find_host_RAM_total,
  find_host_Storage_total,
} from '../../extra/finder'
import { get_used_resouce } from '../../extra/calculator'

import {
  VirtualHardwareEnums,
  SystemRecommendationEnums,
} from '../../store/types/enums'

const storage = useAppStorage()
storage.init()

defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    default: undefined,
  },
})
</script>

<script lang="ts">
export default {
  name: 'OverviewCard.vue',
}
</script>

<style scoped></style>
