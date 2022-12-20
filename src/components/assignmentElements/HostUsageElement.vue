<template>
  <div
    class="flex flex-col dark:bg-slate-500 bg-slate-300 bg px-2 rounded-lg w-40 items-center"
  >
    <div>{{ text_top }}</div>
    <SimpleProcessBar
      v-if="hw_conf === HardwareEnums.cpu"
      :value="
        calculate_percentage(
          host.cpu.sockets * host.cpu.cores * 2,
          get_used(host_uuid, VirtualHardwareEnums.vcpu)
        )
      "
    />
    <SimpleProcessBar
      v-if="hw_conf === HardwareEnums.ram"
      :value="
        calculate_percentage(
          host.ram.slots * host.ram.size,
          get_used(host_uuid, VirtualHardwareEnums.vram)
        )
      "
    />

    <SimpleProcessBar
      v-if="hw_conf === HardwareEnums.storage"
      :value="
        calculate_percentage(
          calculate_raid(
            host.storage.amount,
            host.storage.size,
            host.storage.raid,
            1
          ),
          get_used(host_uuid, VirtualHardwareEnums.vstorage)
        )
      "
    />

    <div class="flex flex-row items-center justify-center space-x-2">
      <icon-cpu v-if="virtual_hw_conf === VirtualHardwareEnums.vcpu"></icon-cpu>
      <icon-ram
        v-else-if="virtual_hw_conf === VirtualHardwareEnums.vram"
      ></icon-ram>
      <icon-hdd v-else></icon-hdd>

      <div class="flex flex-row">
        <p>
          {{ get_used(host_uuid, virtual_hw_conf) }}
        </p>
        /
        <p v-if="hw_conf === HardwareEnums.cpu">
          {{ host.cpu.sockets * host.cpu.cores * 2 }}
        </p>
        <p v-if="hw_conf === HardwareEnums.ram">
          {{ host.ram.slots * host.ram.size }}
        </p>
        <p v-if="hw_conf === HardwareEnums.storage">
          {{
            calculate_raid(
              host.storage.amount,
              host.storage.size,
              host.storage.raid,
              1
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, unref } from 'vue'
import { get_used } from '../../extra/calculator'
import { calculate_raid } from '../../extra/calculator_storage'
import { HardwareEnums, VirtualHardwareEnums } from '../../store/types/enums'
import { Host } from '../../store/types/Host'
import SimpleProcessBar from '../charts/SimpleProcessBar.vue'
import IconCpu from '../icons/IconCpu.vue'
import IconRam from '../icons/IconRam.vue'
import IconHdd from '../icons/IconHdd.vue'

defineProps({
  text_top: {
    type: String,
    default: 'none',
  },
  host_uuid: {
    type: String,
    default: 'none',
  },
  virtual_hw_conf: {
    type: Object as PropType<VirtualHardwareEnums>,
    default: VirtualHardwareEnums.vcpu,
  },
  hw_conf: {
    type: Object as PropType<HardwareEnums>,
    default: HardwareEnums.cpu,
  },
  host: {
    type: Object as PropType<Host>,
    default: null,
  },
})

function calculate_percentage(available: number, used: number) {
  console.log('used: ' + used + ' available: ' + available)
  return ((used / available) * 100).toFixed(0)
}
</script>

<script lang="ts">
export default {
  name: 'HostUsageElement',
}
</script>
