import { AppData, AppDataHosts, AppDataVms } from '../js/types/data-types'
import {
  host_resource_types,
  system_dimensioning_types,
  vm_resource_types,
} from '../js/types/enums'

export function calculate_cpu_used(
  data: AppData,
  host_uuid: string,
  host_index: number,
  host_resource_type: host_resource_types,
  vm_resource_type: vm_resource_types,
  system_dimensioning: system_dimensioning_types
): number {
  // Mapping of Arrays
  const host = data.hosts.find((host) => host.uuid === host_uuid)

  const list_assigned = data.assignments.filter((assignment) => {
    return (
      assignment.host_uuid === host?.uuid &&
      assignment.host_index === host_index
    )
  })

  if (list_assigned.length != 0) {
    const list_assigned_uuids = list_assigned.map((assignment) => {
      return assignment.vm_uuid
    })

    const list_vms = list_assigned_uuids.map((auuid) => {
      return data.vms.filter((vm) => vm.uuid === auuid)
    })

    const list_vms_resources = list_vms.map((vm) => {
      return vm[0][vm_resource_type][system_dimensioning]
    })

    console.log(list_assigned_uuids)
    console.log(list_vms)
    console.log(list_vms_resources)

    //Calculations
    let total_resources_host = 0
    switch (host_resource_type) {
      case host_resource_types.cpu:
        total_resources_host = (host?.cpu.cores || 0) * (host?.cpu.sockets || 0)
        break
      case host_resource_types.ram:
        total_resources_host = (host?.ram.slots || 0) * (host?.ram.size || 0)
        break
      case host_resource_types.storage:
        total_resources_host =
          (host?.storage.amount || 0) * (host?.storage.size || 0)
        break
      default:
        total_resources_host = 0
        break
    }

    const total_resources_vms_sum = list_vms_resources.reduce((a, b) => {
      return a + b
    })
    console.log(
      'total_resources_host: ' +
        total_resources_host +
        ', total_resources_vms_sum:' +
        total_resources_vms_sum
    )

    console.log('Calculator')
    return (total_resources_vms_sum / total_resources_host) * 100
  }

  return 0
}

function calculate_used_percentage(
  total_amount: number,
  array_vm_amounts: number[],
  array_vm_resources: []
) {
  return 0
}

export function calculate_total_hosts(hosts: AppDataHosts[]): number {
  const total_hosts_list = hosts.map((host) => host.amount)
  return total_hosts_list.reduce((a, b) => {
    return a + b
  })
}

export function calculate_total_vms(vms: AppDataVms[]): number {
  const total_hosts_list = vms.map((vm) => vm.amount)
  return total_hosts_list.reduce((a, b) => {
    return a + b
  })
}
