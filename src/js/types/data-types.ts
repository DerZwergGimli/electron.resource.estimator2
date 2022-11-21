export interface AppData {
  hosts: AppDataHosts[];
  vms: AppDataVms[];
  assignments: AppDataAssignments[];
}
export interface AppDataHostsCpu {
  sockets: number;
  cores: number;
}
export interface AppDataHostsRam {
  slots: number;
  size: number;
}
export interface AppDataHostsStorage {
  amount: number;
  size: number;
}
export interface AppDataHosts {
  id: number;
  uuid: string;
  name: string;
  manufacturer: string;
  amount: number;
  cpu: AppDataHostsCpu;
  ram: AppDataHostsRam;
  storage: AppDataHostsStorage;
}
export interface AppDataVmsVcpu {
  min: number;
  rec: number;
  max: number;
}
export interface AppDataVmsVram {
  min: number;
  rec: number;
  max: number;
}
export interface AppDataVmsVstorage {
  min: number;
  rec: number;
  max: number;
}
export interface AppDataVms {
  id: number;
  uuid: string;
  name: string;
  os: string;
  amount: number;
  vcpu: AppDataVmsVcpu;
  vram: AppDataVmsVram;
  vstorage: AppDataVmsVstorage;
}
export interface AppDataAssignments {
  host_uuid: string;
  host_index: number;
  vm_uuid: string;
}
