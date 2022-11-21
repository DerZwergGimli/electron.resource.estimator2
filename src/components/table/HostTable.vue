<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Manufacturer</th>
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

          <th>RAID</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- body -->
        <tr v-for="(host, index) in hosts" :key="index">
          <th scope="row">{{ index }}</th>
          <td>
            <input
              class="input-text-field"
              type="text"
              :value="host.name"
              @input="(event:any) => (host.name = event.target.value)"
            />
          </td>
          <td>
            <input
              class="input-text-field w-full max-w-xs"
              type="text"
              :value="host.manufacturer"
              @input="(event:any) => (host.manufacturer = event.target.value)"
            />
          </td>
          <td>
            <HostResources
              :first_value="host.cpu.sockets"
              :second_value="host.cpu.cores"
              type="cpu"
              @changed_first="(value) => (host.cpu.sockets = parseInt(value))"
              @changed_second="(value) => (host.cpu.cores = parseInt(value))"
            ></HostResources>
            <div class="flex flex-row space-x-2 items-center">
              <icon-calculator />
              <p class="text-sm pt-1">
                {{ host.cpu.sockets * host.cpu.cores * 2 }} vCores
              </p>
            </div>
          </td>
          <td>
            <HostResources
              :first_value="host.ram.slots"
              :second_value="host.ram.size"
              type="ram"
              @changed_first="(value) => (host.ram.slots = parseInt(value))"
              @changed_second="(value) => (host.ram.size = parseInt(value))"
            ></HostResources>
            <div class="flex flex-row space-x-2 items-center">
              <icon-calculator />
              <p class="text-sm pt-1">
                {{ host.ram.slots * host.ram.size }} vRAM [GB]
              </p>
            </div>
          </td>
          <td>
            <HostResources
              :first_value="host.storage.amount"
              :second_value="host.storage.size"
              type="storage"
              @changed_first="
                (value) => (host.storage.amount = parseInt(value))
              "
              @changed_second="(value) => (host.storage.size = parseInt(value))"
            ></HostResources>
            <div class="flex flex-row space-x-2 items-center">
              <icon-calculator />
              <p class="text-sm pt-1">
                Netto Storage =
                {{
                  calculate_storage_netto(
                    host.storage.amount,
                    host.storage.size,
                    2
                  )
                }}
                GB
              </p>
            </div>
          </td>
          <td>
            <div>
              <select v-model="host.storage.raid" class="input-select-box">
                <option
                  v-for="raid in Object.values(RAIDEnums)"
                  :key="raid"
                  :selected="host.storage.raid === raid"
                >
                  {{ raid }}
                </option>
              </select>

              <div class="flex flex-row space-x-1 items-center">
                <icon-calculator />
                <p class="text-sm pt-1">
                  {{
                    caluclate_raid(
                      host.storage.amount,
                      host.storage.size,
                      host.storage.raid,
                      1
                    )
                  }}
                  GB
                </p>
              </div>
            </div>
          </td>

          <td>
            <input
              class="input-text-field"
              type="number"
              :value="host.uuids.length"
              @input="
                (event: any) => {
                  store.check_uuid_length(
                    host.name,
                    parseInt(event.target.value)
                  )
                }
              "
            />
          </td>
          <td>
            <button
              class="btn btn-sm"
              @click="$emit('clk_remove_item', host.uuids)"
            >
              <icon-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Host } from '../../store/types/Host'
import { Icon } from '@iconify/vue'
import {
  calculate_storage_netto,
  caluclate_raid,
} from '../../extra/calculator_storage'
import { RAIDEnums } from '../../store/types/enums'
import HostResources from '../../components/table/table_elements/HostResources.vue'
import { useAppStorage } from '../../store/AppStorage'
import IconCpu from '../icons/IconCpu.vue'
import IconRam from '../icons/IconRam.vue'
import IconHdd from '../icons/IconHdd.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconCalculator from '../icons/IconCalculator.vue'
const store = useAppStorage()
store.init()

defineProps({
  hosts: {
    type: Array as PropType<Host[]>,
    default: null,
  },
})
</script>

<script lang="ts">
export default {
  name: 'HostTable',
}
</script>
