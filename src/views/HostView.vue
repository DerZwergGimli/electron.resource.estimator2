<template>
  <div class="host flex flex-col text-center">
    <div class="base-headline">Host setup</div>
    <div class="divider"></div>
    <HostTable
      class="m-3"
      :hosts="store.hostsList"
      @clk_remove_item="(host_uuids) => clk_removeHost(host_uuids)"
    ></HostTable>
    <div>
      <button class="btn-style" @click="clk_addHost()">Add Host</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid'
import HostTable from '../components/table/HostTable.vue'
import { createToast } from 'mosha-vue-toastify'
import { useAppStorage } from '../store/AppStorage'
import { defineComponent } from 'vue'
import { RAIDEnums } from '../store/types/enums'
import { TOAST_SUCCESS, TOAST_WARNING } from '../extra/toast-config'

const store = useAppStorage()

defineComponent({ HostTable })

function clk_addHost() {
  store.hostsList.push({
    id: store.hostsList.length,
    uuids: [uuid.v4().toString()],
    name: 'new_host',
    manufacturer: 'no-name',

    cpu: { sockets: 0, cores: 0 },
    ram: { slots: 0, size: 0 },
    storage: {
      amount: 0,
      size: 0,
      raid: RAIDEnums.R0,
    },
  })
  createToast('New Host added!', TOAST_SUCCESS)
}

function clk_removeHost(host_uuids: string[]) {
  store.remove_host(host_uuids)
  createToast('Host removed!', TOAST_WARNING)
}
</script>
