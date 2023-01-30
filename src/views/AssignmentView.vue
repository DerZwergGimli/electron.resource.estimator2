<template>
  <div class="flex flex-col text-center">
    <div class="flex flex-row items-center justify-end pr-5 pb-3 border-b">
      <button class="btn-style m-3" @click="btn_clearAllAssignments()">
        Reset assignments
      </button>
      <toggle-button text="Grid/Row" @toggle="toggle_grid_row()" />
    </div>
    <div class="flex flex-col w-auto mx-4 lg:flex-row">
      <div class="flex flex-grow space-y-2 card rounded-box place-items-center">
        <h3 class="w-full">Unassigned VMs</h3>
        <div class="flex flex-col w-full" v-if="show_as_grid">
          <div
            class="flex flex-col w-full"
            v-for="vm_element in storage.vmsList"
            :key="vm_element"
          >
            <div
              v-for="vm_element_uuid in vm_element.uuids"
              :key="vm_element_uuid"
            >
              <div
                v-if="
                  !storage.assignmentsList.find((assignment) =>
                    assignment.vm_uuid.find(
                      (vm_uuid) => vm_uuid === vm_element_uuid
                    )
                  )
                "
                draggable="true"
                @dragstart="on_dragStart($event, vm_element_uuid)"
              >
                <AssignmentVMElement
                  class="mb-2"
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
        <div class="flex flex-col w-full" v-else>
          <div
            class="grid grid-cols-2 w-full"
            v-for="vm_element in storage.vmsList"
            :key="vm_element"
          >
            <div
              v-for="vm_element_uuid in vm_element.uuids"
              :key="vm_element_uuid"
            >
              <div
                v-if="
                  !storage.assignmentsList.find((assignment) =>
                    assignment.vm_uuid.find(
                      (vm_uuid) => vm_uuid === vm_element_uuid
                    )
                  )
                "
                draggable="true"
                @dragstart="on_dragStart($event, vm_element_uuid)"
              >
                <AssignmentVMElement
                  class="mb-2"
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
      </div>
      <div class="divider lg:divider-horizontal">OR</div>

      <div
        class="flex flex-auto card place-items-center h-screen overflow-x-auto"
      >
        <h3 class="w-full">Hosts (with assigned VMs)</h3>
        <Accordion
          always-open
          class="w-full pr-3"
          v-for="host_element in storage.hostsList"
          :key="host_element"
        >
          <accordion-panel
            class="drop-zone"
            @drop="on_drop($event, host_element_uuid)"
            @dragover.prevent
            @dragenter.prevent
            v-for="(host_element_uuid, host_index) in host_element.uuids"
            :key="host_element_uuid"
          >
            <accordion-header>
              <AssignmentHostElement
                :host_uuid="host_element_uuid"
                :host="
                  storage.hostsList.find((host) =>
                    host.uuids.find((uuid) => uuid === host_element_uuid)
                  )
                "
                :system_recommendation="storage.system_recommendation"
                :host_index="host_index"
              ></AssignmentHostElement>
            </accordion-header>
            <accordion-content>
              <div
                class="space-y-1"
                v-if="
                  storage.assignmentsList.find(
                    (assignment) => assignment.host_uuid === host_element_uuid
                  )
                "
              >
                <div
                  class="flex flex-row"
                  v-for="assigned_vm_uuid in storage.assignmentsList.find(
                    (assignment) => assignment.host_uuid === host_element_uuid
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
                      btn_removeAssignment(host_element_uuid, assigned_vm_uuid)
                    "
                  ></AssignmentVMElement>
                </div>
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

<script setup>
import AssignmentVMElement from '../components/assignmentElements/AssignmentVMElement.vue'
import AssignmentHostElement from '../components/assignmentElements/AssignmentHostElement.vue'
import { createToast } from 'mosha-vue-toastify'
import { TOAST_SUCCESS, TOAST_WARNING } from '~/extra/toast-config'
import { ref, defineComponent, onMounted } from 'vue'
import { useAppStorage } from '~/store/AppStorage'
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
} from 'flowbite-vue'
import ToggleButton from '../components/button/ToggleButton.vue'

defineComponent({
  AssignmentVMElement,
  AssignmentHostElement,
})

const storage = useAppStorage()

const show_as_grid = ref(true)

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
