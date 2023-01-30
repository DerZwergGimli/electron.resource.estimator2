<template>
  <div class="flex flex-col text-center">
    <div class="flex flex-row items-center justify-end pr-5 pb-3 border-b">
      <button class="btn-style m-3" @click="btn_clearAllAssignments()">
        Reset assignments
      </button>
      <toggle-button text="Grid/Row" @toggle="toggle_grid_row()" />
    </div>

    <div class="flex flex-col w-auto mx-4 lg:flex-row">
      <div
        class="flex basis-1/2flex-grow space-y-2 card rounded-box place-items-center"
      >
        <h3 class="w-full">Unassigned VMs</h3>
        <div
          class="grid w-full gap-4"
          :class="show_as_grid ? 'grid-cols-2' : 'grid-cols-1'"
        >
          <div
            v-for="vm_element_uuid in unassigned_vm_uuids_list"
            :key="vm_element_uuid"
          >
            <div
              draggable="true"
              @dragstart="on_dragStart($event, vm_element_uuid)"
            >
              <AssignmentVMElement
                id="dragComponent"
                :vm="
                  storage.vmsList.find((vm) =>
                    vm.uuids.find((uuid) => uuid === vm_element_uuid)
                  )
                "
                :system_recommendation="storage.system_recommendation"
              ></AssignmentVMElement>
            </div>
          </div>
        </div>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div
        class="flex basis-1/2 flex-auto card place-items-center h-screen overflow-x-auto"
      >
        <h3 class="w-full">Hosts (with assigned VMs)</h3>
        <Accordion always-open class="w-full pr-3">
          <accordion-panel
            v-for="host_uuid in host_uuids_list"
            :key="host_uuid"
            @drop="on_drop($event, host_uuid)"
            @dragover.prevent
            @dragenter.prevent
            class="drop-zone"
          >
            <accordion-header>
              <AssignmentHostElement
                :host_uuid="host_uuid"
                :host="
                  storage.hostsList.find((host) =>
                    host.uuids.find((uuid) => uuid === host_uuid)
                  )
                "
                :system_recommendation="storage.system_recommendation"
                :host_index="
                  storage.hostsList
                    .find((host) =>
                      host.uuids.some((uuid) => uuid === host_uuid)
                    )
                    .uuids.indexOf(host_uuid)
                "
              ></AssignmentHostElement>
            </accordion-header>
            <accordion-content>
              <div
                class="space-y-1"
                v-if="
                  storage.assignmentsList.find(
                    (assignment) => assignment.host_uuid === host_uuid
                  )
                "
              >
                <div
                  class="flex flex-row"
                  v-for="assigned_vm_uuid in storage.assignmentsList.find(
                    (assignment) => assignment.host_uuid === host_uuid
                  ).vm_uuid"
                  :key="assigned_vm_uuid"
                >
                  <AssignmentVMElement
                    :vm="
                      storage.vmsList.find((vm) =>
                        vm.uuids.find((vm_uuid) => vm_uuid === assigned_vm_uuid)
                      )
                    "
                    :system_recommendation="storage.system_recommendation"
                    :show_button="true"
                    @clk_remove="
                      btn_removeAssignment(host_uuid, assigned_vm_uuid)
                    "
                  ></AssignmentVMElement>
                </div>
              </div>
              <div v-else>
                <Badge type="indigo">-- no VM assigned --</Badge>
              </div>
            </accordion-content>
          </accordion-panel>
        </Accordion>
      </div>
    </div>
    <!--
  <div>{{ storage.assignmentsList }}</div>
  --></div>
</template>

<script setup lang="ts">
import AssignmentVMElement from '../components/assignmentElements/AssignmentVMElement.vue'
import AssignmentHostElement from '../components/assignmentElements/AssignmentHostElement.vue'
import { createToast } from 'mosha-vue-toastify'
import { TOAST_WARNING } from '~/extra/toast-config'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useAppStorage } from '~/store/AppStorage'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'flowbite-vue'
import ToggleButton from '../components/button/ToggleButton.vue'
import { Badge } from 'flowbite-vue'

defineComponent({
  AssignmentVMElement,
  AssignmentHostElement,
})

const storage = useAppStorage()

const show_as_grid = ref(true)

const unassigned_vm_uuids_list = computed(() => {
  let vm_uuid_unassigned = []
  let vm_uuid_list_full = storage.vmsList.flatMap((vm) => vm.uuids)
  vm_uuid_list_full.forEach((vm_uuid_full) => {
    if (
      !storage.assignmentsList.find((assignment) =>
        assignment.vm_uuid.find((vm_uuid) => vm_uuid === vm_uuid_full)
      )
    ) {
      vm_uuid_unassigned.push(vm_uuid_full as never)
    }
  })
  return vm_uuid_unassigned
})

const host_uuids_list = computed(() => {
  return storage.hostsList.flatMap((host) => host.uuids)
})

onMounted(async () => {
  await storage.init()
})

function toggle_grid_row() {
  show_as_grid.value = !show_as_grid.value
}

function on_dragStart(event, vm_uuid) {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('vm_uuid', vm_uuid)
  console.log(vm_uuid)
}

function on_drop(event, host_uuid) {
  const vm_uuid = event.dataTransfer.getData('vm_uuid')
  if (host_uuid && vm_uuid) {
    storage.make_assignment(host_uuid, vm_uuid)
  }
}

function btn_removeAssignment(host_uuid, vm_uuid) {
  storage.remove_assignment(host_uuid, vm_uuid)
}

function btn_clearAllAssignments() {
  storage.assignmentsList = []
  createToast('Assignments cleared!', TOAST_WARNING)
}
</script>

<style scoped>
#dragComponent {
  cursor: move;
}
</style>
