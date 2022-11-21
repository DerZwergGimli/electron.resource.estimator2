import { useAppStorage } from '../store/AppStorage'
import {
  VirtualHardwareEnums,
  SystemRecommendationEnums,
} from '../store/types/enums'
import { SystemRecommendations, VM } from '../store/types/VM'

export function get_used(
  host_uuid: string,
  hardware_type: VirtualHardwareEnums
) {
  const storage = useAppStorage()

  // Map all vm_uuids in assignments
  const assigned_vm_uuids = storage.assignmentsList
    .filter((assignment) => assignment.host_uuid === host_uuid)
    .flatMap((assignment) => assignment.vm_uuid)

  const resources_vms_array: number[] = []
  for (const assignment_vm_uuid of assigned_vm_uuids) {
    resources_vms_array.push(
      storage.vmsList.find((vm) =>
        vm.uuids.find((uuid) => uuid === assignment_vm_uuid)
      )?.[hardware_type].rec ?? 0
    )
  }

  return resources_vms_array.reduce((a, b) => {
    return a + b
  }, 0)
}

export function get_used_cpu(
  host_uuid: string,
  hardware_type: VirtualHardwareEnums,
  system_recommendation: SystemRecommendationEnums
) {
  const storage = useAppStorage()

  // Map all vm_uuids in assignments
  const assigned_vm_uuids = storage.assignmentsList
    .filter((assignment) => assignment.host_uuid === host_uuid)
    .flatMap((assignment) => assignment.vm_uuid)

  const resources_vms_array: number[] = []
  for (const assignment_vm_uuid of assigned_vm_uuids) {
    resources_vms_array.push(
      storage.vmsList.find((vm) =>
        vm.uuids.find((uuid) => uuid === assignment_vm_uuid)
      )?.[hardware_type][system_recommendation] ?? 0
    )
  }

  return resources_vms_array.reduce((a, b) => {
    return a + b
  }, 0)
}

export function get_used_resouce(
  host_uuid: string,
  hardware_type: VirtualHardwareEnums,
  system_recommendation: SystemRecommendationEnums
) {
  const storage = useAppStorage()

  // Map all vm_uuids in assignments
  const assigned_vm_uuids = storage.assignmentsList
    .filter((assignment) => assignment.host_uuid === host_uuid)
    .flatMap((assignment) => assignment.vm_uuid)

  const resources_vms_array: number[] = []
  for (const assignment_vm_uuid of assigned_vm_uuids) {
    resources_vms_array.push(
      storage.vmsList.find((vm) =>
        vm.uuids.find((uuid) => uuid === assignment_vm_uuid)
      )?.[hardware_type][system_recommendation] ?? 0
    )
  }

  return resources_vms_array.reduce((a, b) => {
    return a + b
  }, 0)
}
