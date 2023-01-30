import { PresetsVM } from './types/presets'
import { defineStore } from 'pinia'
import { Host } from '../store/types/Host'
import { VM } from '../store/types/VM'
import { Assignment } from '../store/types/Assignment'
import { SystemRecommendationEnums } from '../store/types/enums'
import { useStorage } from '@vueuse/core'
import { uuid } from 'vue-uuid'

export const useAppStorage = defineStore({
  id: 'app_storage',
  state: () => ({
    initialized: useStorage('initialized', false),
    hostsList: useStorage('hostsList', [] as Host[]),
    vmsList: useStorage('vmsList', [] as VM[]),
    assignmentsList: useStorage('assignmentsList', [] as Assignment[]),
    system_recommendation: 'rec' as SystemRecommendationEnums,
    presets_vm: useStorage('presets', [] as PresetsVM[]),
  }),

  actions: {
    async init() {
      if (!this.initialized) {
        console.info('Initializing AppStore!')
        //Fetch default_data.json
        await fetch('default/default_data.json')
          .then((response) => response.json())
          .then((data) => {
            this.hostsList =
              this.hostsList.length == data.hosts.length
                ? this.hostsList
                : data.hosts
            this.vmsList =
              this.vmsList.length == data.vms ? this.vmsList : data.vms
            this.assignmentsList =
              this.assignmentsList.length == data.assignments
                ? this.assignmentsList
                : data.assignments
          })
          .catch((error) => {
            console.error(error)
          })

        //Fetch preset.json
        await fetch('default/presets.json')
          .then((response) => response.json())
          .then((data) => {
            this.presets_vm = data.presets_vms
          })
          .catch((error) => {
            console.error(error)
          })
        this.initialized = true
      } else {
        console.info('Store is already initialized')
      }
    },
    make_assignment(host_uuid: string, vm_uuid: string) {
      console.info('Assigning -> host_uuid:' + host_uuid, ' vm_uuid:' + vm_uuid)
      if (
        this.assignmentsList.find(
          (assignment) => assignment.host_uuid === host_uuid
        )
      ) {
        this.assignmentsList
          .filter((assignment) => assignment.host_uuid === host_uuid)
          .map((element) => element.vm_uuid.push(vm_uuid))
      } else {
        this.assignmentsList.push({
          host_uuid: host_uuid,
          vm_uuid: [vm_uuid],
        })
      }
    },
    remove_assignment(host_uuid: string, vm_uuid: string) {
      console.info(
        'Removing Assigment -> host_uuid:' + host_uuid + ' vm_uuid:' + vm_uuid
      )
      //Find index to remove
      let index_to_remove = -2
      for (const assignment of this.assignmentsList) {
        index_to_remove = assignment.vm_uuid.findIndex(
          (uuid) => uuid === vm_uuid
        )
      }
      //Remove index from array
      if (index_to_remove != -2) {
        this.assignmentsList
          .find((assignment) => assignment.host_uuid === host_uuid)
          ?.vm_uuid.splice(index_to_remove, 1)
      }
    },
    remove_host(host_uuids: string[]) {
      console.info('Removing hosts form lists')
      this.hostsList = this.hostsList.filter((host) => {
        return host.uuids !== host_uuids
      })
      this.assignmentsList = this.assignmentsList.filter((assignment) => {
        return !host_uuids.includes(assignment.host_uuid)
      })
    },
    remove_vm(vm_uuids: string[]) {
      console.info('Removing hosts form lists')
      this.vmsList = this.vmsList.filter((vm) => {
        return vm.uuids !== vm_uuids
      })
      // this.assignmentsList = this.assignmentsList.filter((assignment) => {
      //   return !assignment.vm_uuid.some() vm_uuids.includes();
      // });
    },
    check_uuid_length(object_name: string, should: number) {
      console.info(
        'Checking UUIDs for ObjectName: ' + object_name + ' should: ' + should
      )
      this.vmsList.forEach((vm) => {
        if (vm.name === object_name) {
          if (should - vm.uuids.length > 0) {
            for (let i = 0; i < should - vm.uuids.length; i++) {
              vm.uuids.push(uuid.v4())
            }
          }
          if (vm.uuids.length - should > 0) {
            for (let i = 0; i < vm.uuids.length - should; i++) {
              vm.uuids.pop()
            }
          }
        }
      })

      this.hostsList.forEach((host) => {
        if (host.name === object_name) {
          if (should - host.uuids.length > 0) {
            for (let i = 0; i < should - host.uuids.length; i++) {
              host.uuids.push(uuid.v4())
            }
          }
          if (host.uuids.length - should > 0) {
            for (let i = 0; i < host.uuids.length - should; i++) {
              host.uuids.pop()
            }
          }
        }
      })
    },
    // add_uuid(object_name: string) {
    //   console.info("Adding new UUID to: " + object_name);

    //   this.vmsList.forEach((vm) =>
    //     vm.name === object_name ? vm.uuids.push(uuid.v4()) : false
    //   );
    // },
    // remove_uuid(object_name: string) {
    //   console.info("Remving last UUID of: " + object_name);

    //   this.vmsList.forEach((vm) =>
    //     vm.name === object_name ? vm.uuids.pop() : false
    //   );
    // },
    import(hosts: Host[], vms: VM[], assignments: Assignment[]) {
      console.log(hosts)
      this.hostsList = hosts
      this.vmsList = vms
      this.assignmentsList = assignments
    },
    export_config() {
      return {
        hosts: this.hostsList,
        vms: this.vmsList,
        assignments: this.assignmentsList,
      }
    },
    export_presets() {
      return {
        presets_vms: this.presets_vm,
      }
    },
  },
})
