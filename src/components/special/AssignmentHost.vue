<!--<template>-->
<!--  <div-->
<!--    v-for="n in host?.amount"-->
<!--    :key="n"-->
<!--    class="m-2 bg-base-200 hover:bg-base-300"-->
<!--  >-->
<!--    <div-->
<!--      @drop="onDrop($event, host, n - 1)"-->
<!--      @dragenter.prevent-->
<!--      @dragover.prevent-->
<!--    >-->
<!--      <div class="flex flex-row space-x-5 bg-accent hover:bg-accent-focus">-->
<!--        <div>{{ host?.name }}_{{ n }}</div>-->
<!--        <div class="flex flex-row space-x-1">-->
<!--          <i class="bi bi-cpu"></i>-->
<!--          <progress-->
<!--            class="progress mt-2"-->
<!--            :value="-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.cpu,-->
<!--                vm_resource_types.vcpu,-->
<!--                data.sdt_selected-->
<!--              )-->
<!--            "-->
<!--            max="100"-->
<!--          ></progress>-->
<!--          <div>-->
<!--            {{-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.cpu,-->
<!--                vm_resource_types.vcpu,-->
<!--                data.sdt_selected-->
<!--              ).toFixed(0)-->
<!--            }}%-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex flex-row space-x-1">-->
<!--          <i class="bi bi-memory"></i>-->
<!--          <progress-->
<!--            class="progress mt-2"-->
<!--            :value="-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.ram,-->
<!--                vm_resource_types.vcpu,-->
<!--                data.sdt_selected-->
<!--              )-->
<!--            "-->
<!--            max="100"-->
<!--          ></progress>-->
<!--          <div>-->
<!--            {{-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.ram,-->
<!--                vm_resource_types.vram,-->
<!--                data.sdt_selected-->
<!--              ).toFixed(0)-->
<!--            }}%-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex flex-row space-x-1">-->
<!--          <i class="bi bi-hdd"></i>-->
<!--          <progress-->
<!--            class="progress mt-2"-->
<!--            :value="-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.storage,-->
<!--                vm_resource_types.vstorage,-->
<!--                data.sdt_selected-->
<!--              )-->
<!--            "-->
<!--            max="100"-->
<!--          ></progress>-->
<!--          <div>-->
<!--            {{-->
<!--              calculate_cpu_used(-->
<!--                data,-->
<!--                host.uuid,-->
<!--                n - 1,-->
<!--                host_resource_types.storage,-->
<!--                vm_resource_types.vstorage,-->
<!--                data.sdt_selected-->
<!--              ).toFixed(0)-->
<!--            }}%-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div v-for="vm in vms" :key="vm">-->
<!--        <div-->
<!--          v-for="res in data.assignments.filter(-->
<!--            (a) =>-->
<!--              a.host_uuid === host.uuid &&-->
<!--              a.vm_uuid === vm.uuid &&-->
<!--              a.host_index === n - 1-->
<!--          ).length"-->
<!--          :key="res"-->
<!--        >-->
<!--          <AssignmentVMElement-->
<!--            :vm="vm"-->
<!--            :host_uuid="host.uuid"-->
<!--            @clk_remove_item="(host_uuid) => clk_remove(host_uuid, vm.uuid)"-->
<!--          ></AssignmentVMElement>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { defineProps, PropType } from 'vue'-->
<!--import { AppDataHosts, AppDataVms } from '../../js/types/data-types'-->
<!--import { useAppStorage } from '../../store/AppStorage'-->
<!--import AssignmentVMElement from '@/components/special/assignment_elements/AssignmentVMElement.vue'-->
<!--import { calculate_cpu_used } from '../../js/calculator'-->
<!--import {-->
<!--  host_resource_types,-->
<!--  vm_resource_types,-->
<!--  system_dimensioning_types,-->
<!--} from '../../js/types/enums'-->

<!--const data = useAppStorage()-->

<!--defineProps({-->
<!--  host: {-->
<!--    type: Object as PropType<AppDataHosts>,-->
<!--    default: undefined,-->
<!--  },-->
<!--  vms: {-->
<!--    type: [] as PropType<AppDataVms[]>,-->
<!--    default: undefined,-->
<!--  },-->
<!--})-->

<!--function onDrop(event: any, host: any, host_index: any) {-->
<!--  console.log(-->
<!--    'Host=' +-->
<!--      host.name +-->
<!--      ' , index=' +-->
<!--      host_index +-->
<!--      ' , vmID' +-->
<!--      event.dataTransfer.getData('vm_id')-->
<!--  )-->
<!--  data.assignmentsList.push({-->
<!--    host_uuid: host.uuid,-->
<!--    //host_index: host_index,-->
<!--    vm_uuid: event.dataTransfer.getData('vm_id'),-->
<!--  })-->
<!--}-->

<!--function clk_remove(host_uuid: string, vm_uuid: string) {-->
<!--  console.log('host_id: ' + host_uuid + ', vm_id:' + vm_uuid)-->
<!--  let item_to_remove = data.assignmentsList.find(-->
<!--    (assignment) =>-->
<!--      assignment.host_uuid === host_uuid &&-->
<!--      assignment.vm_uuid.some((uuid) => uuid === vm_uuid)-->
<!--  )-->
<!--  data.assignments = data.assignments.filter((assignment) => {-->
<!--    return assignment !== item_to_remove-->
<!--  })-->
<!--}-->
<!--</script>-->

<!--<style scoped></style>-->
